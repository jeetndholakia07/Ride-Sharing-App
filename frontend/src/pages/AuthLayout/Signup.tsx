import { useState } from "react";
import TextInput from "../../components/Form/TextInput";
import PasswordInput from "../../components/Form/PasswordInput";
import FileUpload from "../../components/Form/FileUpload";
import { Formik, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import axiosInstance from "../../hooks/axiosInstance";
import { api } from "../../hooks/api";
import LoadingButton from "../../components/Form/LoadingButton";
import { useToast } from "../../components/Toast/ToastContext";
import { roleTypes } from "../../i18n/keys/role.json";
import RadioButtonGroup from "../../components/Form/RadioButton";
import { passwordRegex, mobileRegex } from "../../utils/regex";

type FormValues = {
    username: string;
    mobile: string;
    password: string;
    collegeName: string;
    collegeID: File | null;
    role: string;
}

const SignupPage = () => {
    const initialValues: FormValues = {
        username: "",
        mobile: "",
        password: "",
        collegeName: "",
        collegeID: null,
        role: "passenger"
    };

    const { t } = useTranslation();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [role, setRole] = useState(initialValues.role);
    const [error, setError] = useState("");

    const validationSchema = Yup.object().shape({
        ...(role === "passenger" ? {
            mobile: Yup.string()
                .required(t("formMessages.mobileRequired"))
                .matches(mobileRegex, t("formMessages.mobileConstraint")),
            password: Yup.string()
                .required(t("formMessages.passwordRequired"))
                .matches(passwordRegex, t("formMessages.passwordConstraint")),
            username: Yup.string().required(t("formMessages.usernameRequired")),
            collegeName: Yup.string().required(t("formMessages.collegeNameRequired")),
            collegeID: Yup.mixed()
                .nullable()
                .required(t("formMessages.collegeIDRequired"))
        } : {
            mobile: Yup.string()
                .required(t("formMessages.mobileRequired"))
                .matches(mobileRegex, t("formMessages.mobileConstraint")),
            password: Yup.string()
                .required(t("formMessages.passwordRequired"))
                .matches(passwordRegex, t("formMessages.passwordConstraint")),
            username: Yup.string().required(t("formMessages.usernameRequired"))
        })
    });

    const handleRegister = async (payload: any) => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            Object.keys(payload).forEach(key => {
                if (key === "collegeID") {
                    formData.append(key, payload[key]);
                } else {
                    formData.append(key, payload[key]);
                }
            });
            // Make the request with formData
            await axiosInstance.post(api.auth.signup, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setError("");
            showToast("success", t("messages.registerSuccess"));
            navigate("/login");
        }
        catch (err) {
            console.error("Error registering user:", err);
            setError(t("error.register"));
        }
        finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        let payload;
        setSubmitting(false);
        if (values.role === "passenger") {
            payload = { ...values };
            await handleRegister(payload);
            return;
        }
        if (values.role === "driver") {
            const { collegeID, collegeName, ...formValues } = values;
            payload = formValues;
            await handleRegister(payload);
            return;
        }
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema} enableReinitialize>
            {({ values, handleChange, handleBlur, errors, touched, isValid, dirty, setFieldValue, handleSubmit, setFieldTouched }) => {
                const handleRoleChange = (e: any) => {
                    const newRole = e.target.checked ? e.target.value : '';
                    setRole(newRole);
                    setFieldValue("role", newRole);
                };
                return (
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-6">
                            <RadioButtonGroup name={t("role")} label={t("role")} options={roleTypes} value={values.role}
                                onChange={handleRoleChange} onBlur={handleBlur} required={true}
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            <TextInput name={"username"} label={t("username")} placeholder={t("username")} value={values.username}
                                required={true} onChange={handleChange} onBlur={handleBlur} error={touched?.username && errors.username}
                                icon="bi bi-person-fill" autocomplete="username" />
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            <TextInput name={"mobile"} label={t("mobile")} placeholder={t("mobile")} value={values.mobile}
                                required={true} onChange={handleChange} onBlur={handleBlur} error={touched?.mobile && errors.mobile}
                                icon="bi bi-telephone-fill" />
                        </div>
                        {values.role === "passenger" && (
                            <>
                                <div className="grid grid-cols-1 gap-6">
                                    <TextInput name={"collegeName"} label={t("collegeName")} placeholder={t("collegeName")} value={values.collegeName}
                                        required={true} onChange={handleChange} onBlur={handleBlur} error={touched?.collegeName && errors.collegeName}
                                        icon="bi bi-mortarboard-fill" />
                                </div>
                                <div className="grid grid-cols-1 gap-6">
                                    <FileUpload
                                        name={"collegeID"}
                                        label={t("uploadCollegeID")}
                                        value={values.collegeID}
                                        onChange={(file) => setFieldValue("collegeID", file)}
                                        required={true}
                                        error={touched.collegeID && errors.collegeID ? errors.collegeID : undefined}
                                        setFieldTouched={setFieldTouched}
                                    />
                                </div>
                            </>
                        )}
                        <div className="grid grid-cols-1 gap-6 mb-2">
                            <PasswordInput name={"password"} label={t("password")} placeholder={t("password")} value={values.password}
                                required={true} onChange={handleChange} onBlur={handleBlur} error={touched?.password && errors.password}
                                icon="bi bi-key-fill" />
                        </div>
                        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
                        <div className="grid grid-cols-1 gap-6 mb-4">
                            <span className="text-gray-800 font-medium">{t("already")}
                                <Link to="/login" className="text-blue-700 font-medium ml-1">{t("clickHere")}</Link> {t("toLogin")}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 gap-6 mb-4">
                            <LoadingButton name={t("signup")} handleApi={handleSubmit} isLoading={isLoading}
                                disabled={!isValid || !dirty}
                            />
                        </div>
                    </form>
                )
            }}
        </Formik>
    );
};

export default SignupPage;
