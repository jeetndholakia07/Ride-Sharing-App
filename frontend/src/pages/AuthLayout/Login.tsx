import TextInput from "../../components/Form/TextInput";
import PasswordInput from "../../components/Form/PasswordInput";
import { Formik, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import axiosInstance from "../../hooks/axiosInstance";
import { api } from "../../hooks/api";
import LoadingButton from "../../components/Form/LoadingButton";
import { useToast } from "../../components/Toast/ToastContext";
import { addToken } from "../../IndexedDB/tokens";
import { useRole } from "../../context/RoleContext";
import { passwordRegex } from "../../utils/regex";

type FormValues = {
    username: string;
    password: string;
};

const LoginPage = () => {
    const initialValues: FormValues = {
        username: "",
        password: "",
    };
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { showToast } = useToast();
    const { setRole } = useRole();
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        username: Yup.string().required(t("formMessages.usernameRequired")),
        password: Yup.string()
            .required(t("formMessages.passwordRequired"))
            .matches(passwordRegex, t("formMessages.passwordConstraint")),
    });

    const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        setSubmitting(false);
        const payload = { ...values };
        try {
            setIsLoading(true);
            const response = await axiosInstance.post(api.auth.login, payload);
            await addToken(response.data.token, response.data.userId, response.data.role, response.data.username);
            setRole(response.data.role);
            setError("");
            showToast("success", t("messages.loginSuccess"));
            navigate("/");
        }
        catch (err) {
            console.error("Error logging user:", err);
            setError(t("error.login"));
        }
        finally {
            setIsLoading(false);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >
            {({ values, handleChange, handleBlur, errors, touched, isValid, dirty, handleSubmit }) => {
                return (
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
                                icon="bi bi-person-fill"
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
                                icon="bi bi-key-fill"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                        <div className="grid grid-cols-1 gap-6 mb-4">
                            <span className="text-gray-800 font-medium"> {t("notRegistered")}
                                <Link to="/signup" className="text-blue-700 font-medium ml-1">{t("clickHere")} </Link>
                                {t("toSignup")}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 gap-6 mb-4">
                            <LoadingButton name={t("login")} handleApi={handleSubmit} isLoading={isLoading}
                                disabled={!isValid || !dirty} />
                        </div>
                    </form>
                )
            }}
        </Formik>
    );
};

export default LoginPage;
