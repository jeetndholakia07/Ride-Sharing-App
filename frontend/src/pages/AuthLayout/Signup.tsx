import { useState } from "react";
import TextInput from "../../components/Form/TextInput";
import PasswordInput from "../../components/Form/PasswordInput";
import FileUpload from "../../components/Form/FileUpload";
import { Formik, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

type FormValues = {
    username: string;
    mobile: string;
    password: string;
    collegeName: string;
    collegeID: File | null;
}

const SignupPage = () => {
    const [initialValues, setInitialValues] = useState<FormValues>({
        username: "",
        mobile: "",
        password: "",
        collegeName: "",
        collegeID: null,
    });

    const { t } = useTranslation();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#,$,%,&,*,@]).{6,14}$/;
    const mobileRegex = /^\d{10}$/

    const validationSchema = Yup.object().shape({
        mobile: Yup.string()
            .required(t("Mobile is required"))
            .matches(mobileRegex, t("Mobile must be 10 digits")),
        password: Yup.string()
            .matches(passwordRegex, "Password must be between 6-14 characters, include at least one uppercase letter, one lowercase letter, one digit, and one special character (#,$,%,&,*,@)")
            .required("Password is required"),
        username: Yup.string().required("Your Name is Required"),
        collegeName: Yup.string().required("College Name is Required"),
        collegeID: Yup.mixed()
            .required("Document is required")
            .test("fileSize", "File too large", value => {
                if (!value) return true; // allow empty if not required
                return (value as File).size <= 5 * 1024 * 1024; // max 5MB
            })
            .test("fileType", "Unsupported file format", value => {
                if (!value) return true;
                const allowedTypes = ["image/jpeg", "image/png"];
                return allowedTypes.includes((value as File).type);
            }),
    });

    const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        const payload = { ...values };
        setSubmitting(false);
        console.log(payload);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 bg-cover bg-center bg-opacity-70">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg backdrop-blur-lg bg-opacity-90">
                {/* Logo */}
                <div className="flex justify-center mb-0">
                    <span className="text-2xl font-bold text-blue-700">Peer</span>
                    <span className="text-2xl font-bold text-green-700">Ride</span>
                </div>
                <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                    {({ values, handleChange, handleBlur, errors, touched, isValid, dirty, setFieldValue, handleSubmit }) => {
                        return (
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 gap-6">
                                    <TextInput name={"username"} label={t("username")} placeholder={t("username")} value={values.username}
                                        required={true} onChange={handleChange} onBlur={handleBlur} error={touched?.username && errors.username} />
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
                                        name="collegeID"
                                        label="Upload College ID / Proof"
                                        value={values.collegeID}
                                        onChange={(file) => setFieldValue("collegeID", file)}
                                        required={true}
                                    />
                                </div>
                                <div className="grid grid-cols-1 gap-6 mb-2">
                                    <PasswordInput name={"password"} label={t("password")} placeholder={t("password")} value={values.password}
                                        required={true} onChange={handleChange} onBlur={handleBlur} error={touched?.password && errors.password} />
                                </div>
                                <div className="grid grid-cols-1 gap-6 mb-4">
                                    <span className="text-gray-800 font-medium">Already have an account?
                                        <Link to="/login" className="text-blue-700 font-medium ml-1">Click here</Link> to login.
                                    </span>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:cursor-pointer hover:bg-blue-700 transition duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed"
                                    disabled={!isValid || !dirty}
                                >
                                    Sign In
                                </button>
                            </form>
                        )
                    }}
                </Formik>
            </div>
        </div>
    );
};

export default SignupPage;
