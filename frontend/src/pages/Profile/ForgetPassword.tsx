import { Formik, type FormikHelpers } from "formik";
import TextInput from "../../components/Form/TextInput";
import PasswordInput from "../../components/Form/PasswordInput";
import * as Yup from "yup";
import { passwordRegex, mobileRegex } from "../../utils/regex";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import LoadingButton from "../../components/Form/LoadingButton";
import apiInterceptor from "../../hooks/apiInterceptor";
import { api } from "../../hooks/api";
import { useToast } from "../../components/Toast/ToastContext";
import { useNavigate } from "react-router";

type FormValues = {
    mobile: string;
    password: string;
}

const ForgotPassword = () => {
    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { t } = useTranslation();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const initialValues: FormValues = {
        mobile: "",
        password: ""
    };

    const validationSchema = Yup.object().shape({
        ...(isVerified ? {
            password: Yup.string()
                .required(t("formMessages.passwordRequired"))
                .matches(passwordRegex, t("formMessages.passwordConstraint"))
        } : {
            mobile: Yup.string()
                .required(t("formMessages.mobileRequired"))
                .matches(mobileRegex, t("formMessages.mobileConstraint"))
        })
    });

    const handleVerifyUser = async (payload: any) => {
        try {
            setIsLoading(true);
            await apiInterceptor.post(api.user.verifyUser, payload);
            setIsVerified(true);
            showToast("success", t("messages.verifySuccess"));
            setError("");
        }
        catch (err) {
            console.error("Error verifying user:", err);
            setError(t("error.notVerify"));
        }
        finally {
            setIsLoading(false);
        }
    };

    const handleUpdatePassword = async (payload: any) => {
        try {
            setIsLoading(true);
            await apiInterceptor.put(api.user.forgetPassword, payload);
            setError("");
            showToast("success", t("messages.updatePasswordSuccess"));
            navigate("/profile");
        }
        catch (err) {
            console.error("Error updating password:", err);
            setError(t("error.server"));
        }
        finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        setSubmitting(false);
        const { mobile, password } = values;
        if (!isVerified) {
            await handleVerifyUser({ mobile });
        }
        if (isVerified) {
            await handleUpdatePassword({ password });
        }
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
            {({ values, handleChange, handleBlur, errors, touched, isValid, handleSubmit }) => {
                return (
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-6 mb-2">
                            <h2 className="text-gray-800 font-bold mb-4">{t("forgetPassword")}</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            <TextInput name={"mobile"} label={t("mobile")} placeholder={t("mobile")} value={values.mobile}
                                required={true} onChange={handleChange} onBlur={handleBlur} error={touched?.mobile && errors?.mobile}
                                icon="bi bi-telephone-fill" />
                        </div>
                        {isVerified && <div className="grid grid-cols-1 gap-6 mb-2">
                            <PasswordInput name={"password"} label={t("password")} placeholder={t("password")} value={values.password}
                                required={true} onChange={handleChange} onBlur={handleBlur} error={touched?.password && errors?.password}
                                icon="bi bi-key-fill" />
                        </div>}
                        {error && <div className="grid grid-cols-1 gap-6 mb-2">
                            <p className="text-red-500 text-sm mb-2">{error}</p>
                        </div>}
                        <div className="flex items-center justify-start gap-4 mb-2">
                            {!isVerified && <LoadingButton name={t("verify")} handleApi={handleSubmit} isLoading={isLoading}
                                bgColor="bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                icon="bi bi-shield-lock" disabled={!isValid}
                            />}
                            {isVerified && <LoadingButton name={t("updatePassword")} handleApi={handleSubmit} isLoading={isLoading}
                                icon="bi bi-key-fill" disabled={!isValid || !isVerified}
                            />}
                        </div>
                    </form>
                )
            }}
        </Formik>
    );
};

export default ForgotPassword;