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
import {roleTypes} from "../../i18n/keys/role.json";
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
        role: ""
    };

    const { t } = useTranslation();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [role, setRole] = useState<"passenger" | "driver">("passenger");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const validationSchema = Yup.object().shape({
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
    });

    const handleRoleChange = (e: any) => {
        const newRole = e.target.checked ? e.target.value : '';
        console.log(newRole);
        setRole(newRole);
    }

    const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        const payload = { ...values, role: role };
        setSubmitting(false);
        try {
            setIsLoading(true);
            await axiosInstance.post(api.login, payload);
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
    }

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
            {({ values, handleChange, handleBlur, errors, touched, isValid, dirty, setFieldValue, handleSubmit, setFieldTouched }) => {
                return (
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-6">
                            <TextInput name={"username"} label={t("username")} placeholder={t("username")} value={values.username}
                                required={true} onChange={handleChange} onBlur={handleBlur} error={touched?.username && errors.username} />
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                           <RadioButtonGroup name={t("role")} label={t("role")} options={roleTypes} value={role} 
                           onChange={handleRoleChange} onBlur={handleBlur} required={true}
                           />
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            <TextInput name={"mobile"} label={t("mobile")} placeholder={t("mobile")} value={values.mobile}
                                required={true} onChange={handleChange} onBlur={handleBlur} error={touched?.mobile && errors.mobile} />
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            <TextInput name={"collegeName"} label={t("collegeName")} placeholder={t("collegeName")} value={values.collegeName}
                                required={true} onChange={handleChange} onBlur={handleBlur} error={touched?.collegeName && errors.collegeName} />
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            <FileUpload
                                name={t("collegeID")}
                                label={t("uploadCollegeID")}
                                value={values.collegeID}
                                onChange={(file) => setFieldValue("collegeID", file)}
                                required={true}
                                error={touched.collegeID && errors.collegeID ? errors.collegeID : undefined}
                                setFieldTouched={setFieldTouched}
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-6 mb-2">
                            <PasswordInput name={"password"} label={t("password")} placeholder={t("password")} value={values.password}
                                required={true} onChange={handleChange} onBlur={handleBlur} error={touched?.password && errors.password} />
                        </div>
                        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
                        <div className="grid grid-cols-1 gap-6 mb-4">
                            <span className="text-gray-800 font-medium">{t("already")}
                                <Link to="/login" className="text-blue-700 font-medium ml-1">{t("clickHere")}</Link> {t("toLogin")}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 gap-6 mb-4">
                            <LoadingButton name={t("buttons.signin")} handleApi={handleSubmit} isLoading={isLoading}
                                disabled={!isValid || !dirty} />
                        </div>
                    </form>
                )
            }}
        </Formik>
    );
};

export default SignupPage;
