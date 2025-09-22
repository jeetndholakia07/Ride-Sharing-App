import { useState } from "react";
import TextInput from "../../components/Form/TextInput";
import PasswordInput from "../../components/Form/PasswordInput";
import { Formik, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

type FormValues = {
    username: string;
    password: string;
};

const LoginPage = () => {
    const [initialValues, setInitialValues] = useState<FormValues>({
        username: "",
        password: "",
    });

    const { t } = useTranslation();

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Your Name is Required"),
        password: Yup.string()
            .required("Password is required"),
    });

    const handleSubmit = async (
        values: FormValues,
        { setSubmitting }: FormikHelpers<FormValues>
    ) => {
        const payload = { ...values };
        setSubmitting(false);
        console.log(payload);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 bg-cover bg-center bg-opacity-70">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg backdrop-blur-lg bg-opacity-90">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <span className="text-3xl font-bold text-blue-700">Peer</span>
                    <span className="text-3xl font-bold text-green-700">Ride</span>
                </div>

                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    {({
                        values,
                        handleChange,
                        handleBlur,
                        errors,
                        touched,
                        isValid,
                        dirty,
                        handleSubmit,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 gap-6">
                                <TextInput
                                    name={"username"}
                                    label={t("username")}
                                    placeholder={t("username")}
                                    value={values.username}
                                    required={true}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched?.username && errors.username}
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-6 mb-2">
                                <PasswordInput
                                    name={"password"}
                                    label={t("password")}
                                    placeholder={t("password")}
                                    value={values.password}
                                    required={true}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched?.password && errors.password}
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-6 mb-4">
                                <span className="text-gray-800 font-medium">Not registered yet ?
                                    <Link to="/signup" className="text-blue-700 font-medium ml-1">Click here</Link> to signup.
                                </span>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:cursor-pointer hover:bg-blue-700 transition duration-300 disabled:bg-blue-300 disabled:cursor-not-allowed"
                                disabled={!isValid || !dirty}
                            >
                                Sign In
                            </button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default LoginPage;
