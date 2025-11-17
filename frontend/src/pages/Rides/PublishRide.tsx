import TextInput from "../../components/Form/TextInput";
import DatePicker from "../../components/Form/DatePicker";
import TimePicker from "../../components/Form/TimePicker";
import { Formik, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useToast } from "../../components/Toast/ToastContext";
import { passenger as passengerJson } from "../../i18n/keys/passenger.json";
import { vehicleType } from "../../i18n/keys/vehicleType.json";
import RadioButtonGroup from "../../components/Form/RadioButton";
import TextArea from "../../components/Form/TextArea";
import LoadingButton from "../../components/Form/LoadingButton";
import apiInterceptor from "../../hooks/apiInterceptor";
import { api } from "../../hooks/api";
import { mergeDateTime } from "../../utils/dateFormat";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import NumberInput from "../../components/Form/NumberInput";
import SelectInput from "../../components/Form/SelectInput";
import Checkbox from "../../components/Form/Checkbox";
import Collapsible from "../../components/Form/Collapsible";
import PageLoader from "../../components/Loading/PageLoader";
import { fuelType } from "../../i18n/keys/fuelType.json";
import ComboBox from "../../components/Form/ComboBox";
import GetPriceBtn from "../../components/Buttons/GetPriceBtn";

type VehicleType = "two-wheeler" | "four-wheeler";
type FuelType = "petrol" | "diesel" | "cng";

type FormValues = {
    from: string;
    to: string;
    seats: number;
    date: Date | null;
    time: Date | null;
    vehicleType: VehicleType;
    vehicleName: string;
    vehicleNumber: string;
    fuelType: FuelType;
    comments: string;
    isAc: boolean;
};

const PublishRide = () => {
    const { t } = useTranslation();
    const { showToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [isRemember, setIsRemember] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isAc, setIsAc] = useState(false);
    const [isPriceFetched, setIsPriceFetched] = useState(false);
    const [isPriceLoading, setIsPriceLoading] = useState(false);
    const [priceMsg, setPriceMsg] = useState("");
    const [price, setPrice] = useState<any>();
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        from: Yup.object({
            address: Yup.string().required(t("formMessages.fromRequired")),
            lat: Yup.number().required(),
            lng: Yup.number().required(),
        }).required(t("formMessages.fromRequired")),
        to: Yup.object({
            address: Yup.string().required(t("formMessages.toRequired")),
            lat: Yup.number().required(),
            lng: Yup.number().required(),
        }).required(t("formMessages.toRequired")),
        date: Yup.date().required(t("formMessages.dateRequired")),
        time: Yup.date().required(t("formMessages.timeRequired")),
        vehicleName: Yup.string().required(t("formMessages.vehicleNameRequired")),
        vehicleNumber: Yup.string().required(t("formMessages.vehicleNumberRequired"))
    });

    useEffect(() => {
        const fetchVehicleDetails = async () => {
            try {
                setLoading(true);
                const response = await apiInterceptor.get(api.ride.getVehicle);
                const vehicle = response.data;
                if (vehicle) {
                    setInitialValues((prev) => ({
                        ...prev,
                        vehicleName: vehicle.vehicleDetails.vehicleName,
                        vehicleType: vehicle.vehicleDetails.vehicleType,
                        vehicleNumber: vehicle.vehicleDetails.vehicleNumber,
                        fuelType: vehicle.vehicleDetails.fuelType
                    }));
                    setIsAc(vehicle.vehicleDetails.isAc);
                }
            } catch (err) {
                console.error("Error fetching vehicle details:", err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchVehicleDetails();
    }, []);

    const handleCreateRide = async (payload: any) => {
        try {
            setIsLoading(true);
            await apiInterceptor.post(api.ride.createDrive, payload);
            showToast("success", t("messages.publishRideSuccess"));
            navigate("/profile/rides");
        } catch (err) {
            console.error("Error creating ride:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const saveVehicleDetails = async (payload: any) => {
        try {
            await apiInterceptor.put(api.ride.saveVehicle, payload);
        } catch (err) {
            console.error("Error saving vehicle details:", err);
        }
    };

    const [initialValues, setInitialValues] = useState<FormValues>({
        from: "",
        to: "",
        seats: 1,
        date: null,
        time: null,
        vehicleName: "",
        vehicleNumber: "",
        vehicleType: "four-wheeler",
        fuelType: "petrol",
        comments: "",
        isAc: isAc
    });

    const handleSubmit = async (
        values: FormValues,
        { setSubmitting }: FormikHelpers<FormValues>
    ) => {
        setSubmitting(false);
        const { seats, date, time, ...formValues } = values;
        const dateTime = mergeDateTime(date, time);
        const payload = {
            ...formValues,
            seats: Number(seats),
            departureTime: dateTime,
            isAc: isAc,
            price: parseInt(price.pricePerPerson),
            durationMin: parseInt(price.durationMin),
            distanceKm: parseInt(price.distanceKm)
        };
        if (isRemember) {
            const { vehicleName, vehicleNumber, vehicleType, fuelType } = values;
            const vehicleData = { vehicleName, vehicleType, vehicleNumber, fuelType, isAc: isAc };
            await saveVehicleDetails(vehicleData);
        }
        await handleCreateRide(payload);
    };

    const getRidePrice = async (payload: any) => {
        try {
            setIsPriceLoading(true);
            const response = await apiInterceptor.post(api.public.ridePrice, payload);
            const priceData = response.data;
            setPrice(priceData);
            setPriceMsg(
                `Distance: ${priceData.distanceKm} km, ₹${priceData.fuelCostPerKm} per km, Duration: ${priceData.durationMin} min`
            );
        } catch (err) {
            console.error("Error getting ride price:", err);
            setPrice(null);
            setPriceMsg("");
        }
        finally {
            setIsPriceLoading(false);
        }
    }

    const handleToggleRemember = () => {
        setIsRemember((prev) => !prev);
    };

    if (loading) {
        return <PageLoader />;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-xl border border-gray-200">
                {/* Header */}
                <div className="text-center mb-5">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
                        {t("publishRide")}
                    </h1>
                </div>

                <div className="animate-fade-in">
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                        validateOnMount
                    >
                        {({
                            values,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            errors,
                            touched,
                            isValid,
                            dirty,
                            setFieldValue,
                        }) => {
                            const passengerSeats =
                                passengerJson.seats as Record<VehicleType, number[]>;
                            const seatOptions = passengerSeats[values.vehicleType] || [];

                            const handleDateChange = (selectedDate: any) => {
                                setFieldValue("date", selectedDate);
                            };
                            const handleTimeChange = (selectedTime: any) => {
                                setFieldValue("time", selectedTime);
                            };
                            const handleSelectChange = (e: any) => {
                                setFieldValue("seats", parseInt(e.target.value));
                            };
                            const handleFuelType = (e: any) => {
                                setFieldValue("fuelType", e.target.value);
                            };
                            const handleAc = () => {
                                if (values.vehicleType === "four-wheeler") {
                                    setIsAc((prev) => !prev);
                                }
                            }
                            const handleVehicleChange = (
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                const newType = e.target.value as VehicleType;
                                setFieldValue("vehicleType", newType);

                                if (newType === "two-wheeler") {
                                    setIsAc(false);
                                    setFieldValue("isAc", false);
                                }

                                const validSeats = passengerSeats[newType];
                                if (!validSeats.includes(values.seats)) {
                                    setFieldValue("seats", 1);
                                }
                            };

                            const handlePrice = async () => {
                                const payload = {
                                    from: values.from,
                                    to: values.to,
                                    seats: values.seats,
                                    fuelType: values.fuelType,
                                    isAc: isAc,
                                    vehicleType: values.vehicleType
                                }
                                await getRidePrice(payload);
                                setIsPriceFetched(true);
                            };

                            return (
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-6 bg-white p-8 rounded-2xl shadow-md border border-gray-100"
                                >
                                    {/* FROM, TO, DATE, TIME */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                        <ComboBox
                                            label={t("from")}
                                            placeholder={t("startingLocation")}
                                            value={values.from}
                                            onChange={(val) => setFieldValue("from", val)}
                                            onSelect={(option) => setFieldValue("from", {
                                                address: option.address,
                                                lat: option.lat, lng: option.lng,
                                                state: option.state
                                            })}
                                            icon="bi bi-geo-alt-fill"
                                            required
                                        />
                                        <ComboBox
                                            label={t("to")}
                                            placeholder={t("destinationLocation")}
                                            value={values.to}
                                            onChange={(val) => setFieldValue("to", val)}
                                            onSelect={(option) => setFieldValue("to", {
                                                address: option.address,
                                                lat: option.lat, lng: option.lng,
                                                state: option.state
                                            })}
                                            icon="bi bi-geo-alt-fill"
                                            required
                                        />
                                        <DatePicker
                                            label={t("date")}
                                            name="date"
                                            required
                                            placeholder={t("date")}
                                            value={values.date}
                                            onChange={([selectedDate]: any) =>
                                                handleDateChange(selectedDate)
                                            }
                                            icon="bi bi-calendar-event"
                                            minDate={new Date()}
                                        />
                                        <TimePicker
                                            label={t("time")}
                                            name="time"
                                            required
                                            placeholder={t("time")}
                                            value={values.time}
                                            onChange={([selectedTime]: any) =>
                                                handleTimeChange(selectedTime)
                                            }
                                            icon="bi bi-clock"
                                        />
                                    </div>

                                    {/* VEHICLE DETAILS */}
                                    <Collapsible title={t("vehicleDetails")} defaultOpen>
                                        <div className="grid grid-cols-1 sm:grid-cols-1 items-center gap-4">
                                            <RadioButtonGroup
                                                label={t("vehicleType")}
                                                name="vehicleType"
                                                value={values.vehicleType}
                                                options={vehicleType}
                                                onChange={handleVehicleChange}
                                                onBlur={handleBlur}
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 gap-4 mb-4">
                                            <Checkbox
                                                value={isAc}
                                                handleChange={handleAc}
                                                label={t("ac")}
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <TextInput
                                                label={t("vehicleName")}
                                                name="vehicleName"
                                                placeholder={t("vehicleName")}
                                                value={values.vehicleName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                error={errors?.vehicleName && touched?.vehicleName}
                                            />
                                            <TextInput
                                                label={t("vehicleNumber")}
                                                name="vehicleNumber"
                                                placeholder={t("vehicleNumber")}
                                                value={values.vehicleNumber}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                error={errors?.vehicleNumber && touched?.vehicleNumber}
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <SelectInput
                                                label={t("seatsAvailable")}
                                                name="seats"
                                                value={values.seats}
                                                values={seatOptions}
                                                onChange={handleSelectChange}
                                                icon="bi bi-person-fill"
                                            />
                                            <SelectInput
                                                label={t("fuelType")}
                                                name="fuelType"
                                                value={values.fuelType}
                                                values={fuelType}
                                                onChange={handleFuelType}
                                                icon="bi bi-fuel-pump-fill"
                                            />
                                        </div>
                                    </Collapsible>
                                    <Checkbox
                                        value={isRemember}
                                        handleChange={handleToggleRemember}
                                        label={t("rememberVehicleDetails")}
                                    />

                                    {/* COMMENTS */}
                                    <div>
                                        <TextArea
                                            label={t("comments")}
                                            name="comments"
                                            placeholder={t("comments")}
                                            value={values.comments}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            rows={3}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 items-end gap-4">
                                        {isPriceFetched && <NumberInput
                                            label={t("price")}
                                            name="price"
                                            value={price.pricePerPerson}
                                            onChange={handleChange}
                                            placeholder="Enter price"
                                            disabled={!isPriceFetched}
                                            icon="bi bi-currency-rupee"
                                            msg={priceMsg}
                                        />
                                        }
                                    </div>

                                    {/* SUBMIT */}
                                    <div className="flex justify-end mt-4 gap-6">
                                        <GetPriceBtn
                                            isLoading={isPriceLoading}
                                            onClick={handlePrice}
                                            disabled={!isValid || isPriceLoading}
                                            label="Get Price"
                                        />
                                        <LoadingButton
                                            name={t("publishRide")}
                                            handleApi={handleSubmit}
                                            disabled={!isPriceFetched || !isValid || !dirty}
                                            isLoading={isLoading}
                                        />
                                    </div>
                                </form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    );
};
export default PublishRide;
