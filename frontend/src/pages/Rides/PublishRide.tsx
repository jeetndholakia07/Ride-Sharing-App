import TextInput from "../../components/Form/TextInput";
import DatePicker from "../../components/Form/DatePicker";
import TimePicker from "../../components/Form/TimePicker";
import { Formik, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useToast } from "../../components/Toast/ToastContext";
import SelectInput from '../../components/Form/SelectInput';
import { passenger as passengerJson } from "../../i18n/keys/passenger.json";
import { vehicleType } from "../../i18n/keys/vehicleType.json";
import RadioButtonGroup from "../../components/Form/RadioButton";
import TextArea from "../../components/Form/TextArea";
import LoadingButton from "../../components/Form/LoadingButton";
import apiInterceptor from "../../hooks/apiInterceptor";
import { api } from "../../hooks/api";
import { mergeDateTime } from "../../utils/dateFormat";
import { useState } from "react";
import { useNavigate } from "react-router";

type VehicleType = "two-wheeler" | "four-wheeler";


type FormValues = {
    from: string;
    to: string;
    seats: number;
    date: Date | null;
    time: Date | null;
    vehicleType: VehicleType;
    vehicleName: string;
    vehicleNumber: string;
    comments: string;
}

const PublishRide = () => {
    const { t } = useTranslation();
    const { showToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        from: Yup.string().required(t("formMessages.fromRequired")),
        to: Yup.string().required(t("formMessages.toRequired")),
        date: Yup.date().required(t("formMessages.dateRequired")),
        time: Yup.date().required(t("formMessages.timeRequired")),
        vehicleName: Yup.string().required(t("formMessages.vehicleNameRequired")),
        vehicleNumber: Yup.string().required(t("formMessages.vehicleNumberRequired"))
    });

    const handleCreateRide = async (payload: any) => {
        try {
            setIsLoading(true);
            await apiInterceptor.post(api.ride.createDrive, payload);
            showToast("success", t("messages.publishRideSuccess"));
            navigate("/profile/rides");
        }
        catch (err) {
            console.error("Error creating ride:", err);
        } finally {
            setIsLoading(false);
        }
    }

    const initialValues: FormValues = {
        from: "",
        to: "",
        seats: 1,
        date: null,
        time: null,
        vehicleName: "",
        vehicleNumber: "",
        vehicleType: "four-wheeler",
        comments: ""
    };

    const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        setSubmitting(false);
        const { seats, date, time, ...formValues } = values;
        const dateTime = mergeDateTime(date, time);
        const payload = { ...formValues, seats: Number(seats), departureTime: dateTime };
        await handleCreateRide(payload);
    };

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
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        {({ values, handleChange, handleBlur, handleSubmit, errors, touched, isValid, dirty, setFieldValue }) => {
                            const passengerSeats = passengerJson.seats as Record<VehicleType,number[]>;
                            
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

                            const handleVehicleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                                const newType = e.target.value as VehicleType;
                                setFieldValue("vehicleType", newType);
                              
                                const validSeats = passengerSeats[newType];
                              
                                // Reset seats to 1 if current seat value is invalid for the selected vehicle
                                if (!validSeats.includes(values.seats)) {
                                  setFieldValue("seats", 1);
                                }
                              };
                              
                            return (
                                <form onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-2">
                                        <TextInput
                                            label={t("from")}
                                            name="from"
                                            placeholder={t("startingLocation")}
                                            value={values.from}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required={true}
                                            error={touched?.from && errors.from}
                                            icon="bi bi-geo-alt-fill"
                                        />
                                        <TextInput
                                            label={t("to")}
                                            name="to"
                                            placeholder={t("destinationLocation")}
                                            value={values.to}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required={true}
                                            error={touched?.to && errors.to}
                                            icon="bi bi-geo-alt-fill"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-2">
                                        <DatePicker
                                            label={t("date")}
                                            name={"date"}
                                            required={true}
                                            placeholder={t("date")}
                                            value={values.date}
                                            onChange={([selectedDate]: any) => handleDateChange(selectedDate)}
                                            icon="bi bi-calendar-event"
                                        />
                                        <TimePicker
                                            label={t("time")}
                                            name={"time"}
                                            required={true}
                                            placeholder={t("time")}
                                            value={values.time}
                                            onChange={([selectedTime]: any) => handleTimeChange(selectedTime)}
                                            icon="bi bi-calendar-event"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-2">
                                        <TextInput
                                            name="vehicleName"
                                            label={t("vehicleName")}
                                            placeholder={t("vehicleName")}
                                            value={values.vehicleName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required={true}
                                        />
                                        <TextInput
                                            name="vehicleNumber"
                                            label={t("vehicleNumber")}
                                            placeholder={t("vehicleNumber")}
                                            value={values.vehicleNumber}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required={true}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-6 mb-2">
                                        <RadioButtonGroup label={t("vehicleType")} name="vehicleType"
                                            value={values.vehicleType} options={vehicleType} onChange={handleVehicleChange}
                                            onBlur={handleBlur} required={true}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-2">
                                        <SelectInput
                                            name={t("seats")}
                                            label={t("seatsAvailable")}
                                            value={values.seats}
                                            values={seatOptions}
                                            onChange={handleSelectChange}
                                            icon="bi bi-person-fill"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-6 mb-2">
                                        <TextArea name="comments"
                                            label={t("comments")}
                                            placeholder={t("comments")}
                                            value={values.comments}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            rows={2}
                                        />
                                    </div>
                                    <div className="flex justify-end items-center">
                                        <LoadingButton name={t("publishRide")}
                                            handleApi={handleSubmit}
                                            disabled={!isValid || !dirty} isLoading={isLoading} />
                                    </div>
                                </form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    )
}
export default PublishRide;