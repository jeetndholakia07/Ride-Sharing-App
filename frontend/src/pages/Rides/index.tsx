import RideSearch from './RideSearch';
import { useTranslation } from 'react-i18next';
import { Formik, type FormikHelpers } from 'formik';
import * as Yup from "yup";
import { useEffect, useState } from 'react';
import axiosInstance from '../../hooks/axiosInstance';
import { api } from '../../hooks/api';
import SearchButton from '../../components/Buttons/SearchButton';
import RideList from '../../components/Ride/RideList';
import { rideMap } from '../../utils/rideMapLocation';
import { getUtilContext } from '../../context/UtilsContext';

type FormValues = {
    from: string;
    to: string;
    seats: number;
    date: Date | null;
}

const Index = () => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [data, setData] = useState([]);
    const initialValues: FormValues = {
        from: "",
        to: "",
        seats: 1,
        date: null
    };
    const { setSeats, setTypeUsage } = getUtilContext();

    const validationSchema = Yup.object().shape({
        from: Yup.string().required(t("formMessages.fromRequired")),
        to: Yup.string().required(t("formMessages.toRequired"))
    });

    useEffect(() => {
        setTypeUsage("ride request");
    }, []);

    const handleSearchRides = async (payload: FormValues) => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.post(api.public.allRides, payload);
            setData(response.data.data);
            setIsSearch(true);
        }
        catch (err) {
            console.error("Error fetching rides by location:", err);
        }
        finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        setSubmitting(false);
        const { seats, ...formValues } = values;
        const payload = { ...formValues, seats: Number(seats) };
        await handleSearchRides(payload);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-xl border border-gray-200">
                {/* Header */}
                <div className="text-center mb-5">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
                        {t("findPerfectRide")}
                    </h1>
                    <p className="mt-3 text-md sm:text-lg text-gray-500">
                        {t("rideSearch")}
                    </p>
                </div>
                <div className="animate-fade-in">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        {({ values, handleChange, handleBlur, handleSubmit, errors, touched, isValid, dirty, setFieldValue }) => {

                            const handleSelectChange = (e: any) => {
                                setFieldValue("seats", e.target.value);
                                setSeats(e.target.value);
                            };
                            const handleDateChange = (selectedDate: any) => {
                                setFieldValue("date", selectedDate);
                            };

                            return (
                                <form onSubmit={handleSubmit}>
                                    <RideSearch values={values} onChange={handleChange} onBlur={handleBlur}
                                        errors={errors} touched={touched} setFieldValue={setFieldValue}
                                        handleDateChange={handleDateChange} handleSelectChange={handleSelectChange}
                                    />
                                    <div className="flex items-center justify-center mt-4">
                                        <SearchButton name={t("searchRide")} isLoading={isLoading}
                                            disabled={!isValid || !dirty}
                                        />
                                    </div>
                                </form>
                            )
                        }}
                    </Formik>
                </div>
                {isSearch && (
                    <div className="mt-6 border-t border-gray-200 pt-10 animate-fade-in">
                        <RideList rides={data} mapper={rideMap} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Index;