import TextInput from "../../components/Form/TextInput";
import apiInterceptor from "../../hooks/apiInterceptor";
import { api } from "../../hooks/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import WithSuspense from "../../components/Loading/WithSuspense";
import Skeleton from '@mui/material/Skeleton';
import { lazy, useState } from "react";
import { Formik, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { useToast } from "../../components/Toast/ToastContext";
import { useTranslation } from "react-i18next";
import LoadingOverlay from "../../components/Loading/LoadingOverlay";
import ProfileNotFound from "../../components/Profile/ProfileNotFound";
import PageLoader from "../../components/Loading/PageLoader";
import EditButton from "../../components/Buttons/EditButton";
import { mobileRegex } from "../../utils/regex";
import RadioButtonGroup from "../../components/Form/RadioButton";
const ImageUpload = lazy(() => import("../../components/Profile/ImageUpload"));
import { roleTypes } from "../../i18n/keys/role.json";
import LoadingButton from "../../components/Form/LoadingButton";

type FormValues = {
    username: string;
    mobile: string;
    role: string;
    collegeName?: string;
    fullName: string;
    email: string;
}

const UserProfile = () => {
    const { showToast } = useToast();
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const handleToggleEdit = () => {
        setIsEdit((prev) => !prev);
    };

    const getUserProfile = async () => {
        try {
            const response = await apiInterceptor.get(api.user.userProfile);
            return response.data;
        }
        catch (err) {
            console.error("Error getting user profile:", err);
            return null;
        }
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required(t("formMessages.usernameRequired")),
        mobile: Yup.string().required(t("formMessages.mobileRequired"))
            .matches(mobileRegex, t("formMessages.mobileConstraint")),
        role: Yup.string().notRequired(),
        collegeName: Yup.string().notRequired(),
        fullName: Yup.string().notRequired(),
        email: Yup.string().notRequired(),
    });

    const { data: userProfile, isLoading: isProfileLoading } = useQuery({
        queryKey: ["userProfile"],
        queryFn: getUserProfile,
        retry: false,
        refetchOnWindowFocus: false
    });

    const renderSkeleton = <><Skeleton variant="text" width={"100%"} />
        <Skeleton variant="rectangular" width={"100%"} height={"40"} /></>;

    if (!userProfile) {
        return <PageLoader />
    }

    const initialValues: FormValues = {
        username: userProfile.username || "",
        mobile: userProfile.mobile || "",
        collegeName: userProfile.collegeName || "",
        role: userProfile.role || "",
        fullName: userProfile.fullName || "",
        email: userProfile.email || "",
    };

    const handleImageChange = async (file: File) => {
        const formData = new FormData();
        formData.append("profileImg", file);
        try {
            setIsLoading(true);
            await apiInterceptor.put(api.user.updateProfileImg, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            showToast("success", t("messages.profileImageEditSuccess"));
            queryClient.invalidateQueries({ queryKey: ["userProfile"] });
            queryClient.invalidateQueries({ queryKey: ["profileImg"] });
        }
        catch (err) {
            console.error("Error editing profile image:", err);
        }
        finally {
            setIsLoading(false);
        }
    }

    const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        let payload;
        setSubmitting(false);
    };

    return (
        <>
            {isLoading && <LoadingOverlay />}
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema} enableReinitialize>
                {({ values, handleChange, handleBlur, handleSubmit, errors, touched, isValid,  setFieldValue }) => {
                    const handleRoleChange = (e: any) => {
                        const newRole = e.target.checked ? e.target.value : '';
                        setFieldValue("role", newRole);
                    };
                    return (
                        <WithSuspense
                            data={userProfile}
                            isLoading={isProfileLoading}
                            empty={<ProfileNotFound />}
                            fallback={renderSkeleton}
                        >
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                                    {userProfile && (
                                        <ImageUpload
                                            image={userProfile.profileImg}
                                            onImageChange={handleImageChange}
                                        />
                                    )}
                                </div>
                                <div className="border-t border-gray-200 mt-2 pt-4 animate-fade-in">
                                    <div className="flex items-end justify-between">
                                        <h2 className="text-gray-800 font-bold mb-4">{t("userProfile")}</h2>
                                        <EditButton isEditing={isEdit} onToggle={handleToggleEdit} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-1 gap-6 mb-2">
                                    <RadioButtonGroup name={t("role")} label={t("role")} options={roleTypes} value={values.role}
                                        onChange={handleRoleChange} onBlur={handleBlur} required={true} disabled={!isEdit}
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-2">
                                    <TextInput label={t("username")} name={"username"}
                                        placeholder={t("username")} value={values.username}
                                        onChange={handleChange} onBlur={handleBlur} disabled={!isEdit} required={true}
                                        error={touched?.username && errors.username}
                                    />
                                    <TextInput label={t("mobile")} name="mobile"
                                        placeholder={t("mobile")} value={values.mobile}
                                        onChange={handleChange} onBlur={handleBlur} disabled={!isEdit} required={true}
                                        error={touched?.mobile && errors.mobile}
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-2">
                                    {values.collegeName && <TextInput label={t("collegeName")} name={"collegeName"}
                                        placeholder={t("collegeName")} value={values.collegeName}
                                        onChange={handleChange} onBlur={handleBlur} disabled={!isEdit} required={true}
                                        error={touched?.collegeName && errors.collegeName}
                                    />}
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-2">
                                    <TextInput label={t("fullName")} name="fullName"
                                        placeholder={t("fullName")} value={values.fullName}
                                        onChange={handleChange} onBlur={handleBlur} disabled={!isEdit}
                                        error={touched?.fullName && errors.fullName}
                                    />
                                    <TextInput label={t("email")} name="email"
                                        placeholder={t("email")} value={values.email}
                                        onChange={handleChange} onBlur={handleBlur} disabled={!isEdit}
                                        error={touched?.email && errors.email}
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-1 gap-6 mb-2">
                                    {userProfile.collegeIDProof && <ImageUpload image={userProfile.collegeIDProof} onImageChange={handleImageChange}
                                        heading="College ID" alignment="left" />}
                                </div>
                                {isEdit && <div className="flex items-center justify-end">
                                    <LoadingButton name="Save Changes" handleApi={handleSubmit} isLoading={isLoading}
                                        disabled={!isValid} /></div>}

                            </form>
                        </WithSuspense>
                    )
                }}
            </Formik>
        </>
    );
};

export default UserProfile;
