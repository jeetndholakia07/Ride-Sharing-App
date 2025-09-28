import RideSearch from './RideSearch';
import { useTranslation } from 'react-i18next';
import { Formik, type FormikHelpers } from 'formik';
import * as Yup from "yup";
import { useState } from 'react';
import axiosInstance from '../../hooks/axiosInstance';
import { api } from '../../hooks/api';
import RideCard from '../../components/Ride/RideCard';
import {data} from "./data.json";
import RideDetails from '../../components/Ride/RideDetails';

type FormValues = {
    from: string;
    to: string;
}

const Index = () => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const initialValues: FormValues = {
        from: "",
        to: ""
    };

    const validationSchema = Yup.object().shape({
        from: Yup.string().required(t("formMessages.fromRequired")),
        to: Yup.string().required(t("formMessages.toRequired"))
    });

    const handleSearchRides = async (payload: FormValues) => {
        try {
            const response = await axiosInstance.post(api.public.allRides, payload);
            console.log(response.data);
        }
        catch (err) {
            console.error("Error fetching rides by location:", err);
        }
    }

    const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        setSubmitting(false);
        await handleSearchRides(values);
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
                        {({ values, handleChange, handleBlur, handleSubmit, errors, touched, isValid, dirty }) => {
                            return (
                                <form onSubmit={handleSubmit}>
                                    <RideSearch values={values} onChange={handleChange} onBlur={handleBlur}
                                        errors={errors} touched={touched}
                                    />
                                    <div className="flex items-center justify-center mt-4">
                                        <button
                                            type="submit"
                                            disabled={!isValid || !dirty}
                                            className={`text-white text-lg font-semibold py-3 px-8 rounded-lg transition duration-300 transform focus:outline-none focus:ring-2
                                             focus:ring-green-600 ${!isValid || !dirty ? 'bg-green-700 text-gray-100 cursor-not-allowed'
                                                    : 'bg-green-600 hover:bg-green-600 hover:scale-105 cursor-pointer'}`}
                                        >
                                            <i className="bi bi-search text-md mr-2"></i>{t("searchRide")}
                                        </button>
                                    </div>
                                </form>
                            )
                        }}
                    </Formik>
            <RideCard ride={data}/>
                </div>
            </div>
        </div>
    );
};

export default Index;