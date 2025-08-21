import { useState } from "react";
import TextInput from "../../components/Form/TextInput";
import PasswordInput from "../../components/Form/PasswordInput";
import FileUpload from "../../components/Form/FileUpload";
import { Formik, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

type FormValues = {
    name: string;
    email: string;
    password: string;
    collegeName: string;
    collegeID: File | null;
}

const SignupPage = () => {
    const [initialValues, setInitialValues] = useState<FormValues>({
        name: "",
        email: "",
        password: "",
        collegeName: "",
        collegeID: null,
    });

    const { t } = useTranslation();

    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Email is required"),
        password: Yup.string().required("Password is required"),
        name: Yup.string().required("Your Name is Required"),
        collegeName: Yup.string().required("College Name is Required"),
        collegeID: Yup.mixed()
            .required("Document is required")
            .test("fileSize", "File too large", value => {
                if (!value) return true; // allow empty if not required
                return (value as File).size <= 5 * 1024 * 1024; // max 5MB
            })
            .test("fileType", "Unsupported file format", value => {
                if (!value) return true;
                const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
                return allowedTypes.includes((value as File).type);
            }),
    });

    const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        const payload = { ...values };
        setSubmitting(false);
        console.log(payload);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg backdrop-blur-sm bg-opacity-60">
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
                                    <TextInput name={"name"} label={t("name")} placeholder={t("name")} value={values.name}
                                        required={true} onChange={handleChange} onBlur={handleBlur} error={touched?.name && errors.name} />
                                </div>
                                <div className="grid grid-cols-1 gap-6">
                                    <TextInput name={"email"} label={t("email")} placeholder={t("email")} value={values.email}
                                        required={true} onChange={handleChange} onBlur={handleBlur} error={touched?.email && errors.email} />
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
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:cursor-pointer hover:bg-blue-700 transition duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
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
