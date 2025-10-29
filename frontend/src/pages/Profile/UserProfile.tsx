import TextInput from "../../components/Form/TextInput";
import apiInterceptor from "../../hooks/apiInterceptor";
import { api } from "../../hooks/api";
import { useQuery } from "@tanstack/react-query";
import WithSuspense from "../../components/Loading/WithSuspense";
import Skeleton from '@mui/material/Skeleton';
import { lazy, useState, useMemo, useEffect } from "react";
import { Formik, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { useToast } from "../../components/Toast/ToastContext";
import { useTranslation } from "react-i18next";
import LoadingOverlay from "../../components/Loading/LoadingOverlay";
import ProfileNotFound from "../Error/NotFound";
import PageLoader from "../../components/Loading/PageLoader";
import EditButton from "../../components/Buttons/EditButton";
import { mobileRegex } from "../../utils/regex";
import RadioButtonGroup from "../../components/Form/RadioButton";
const ImageUpload = lazy(() => import("../../components/Profile/ImageUpload"));
import { roleTypes } from "../../i18n/keys/role.json";
import LoadingButton from "../../components/Form/LoadingButton";
import FileUpload from "../../components/Form/FileUpload";
import useInvalidateQuery from "../../hooks/useInvalidateQuery";
import { updateRole, updateUsername } from "../../IndexedDB/tokens";
import { useRole } from "../../context/RoleContext";

type FormValues = {
    username: string;
    mobile: string;
    role: string;
    collegeName: string;
    fullName: string;
    email: string;
}

const UserProfile = () => {
    const { showToast } = useToast();
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [role, setRole] = useState<any>("");
    const invalidateQuery = useInvalidateQuery();

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

    const { data: userProfile, isLoading: isProfileLoading } = useQuery({
        queryKey: ["userProfile"],
        queryFn: getUserProfile,
        retry: false,
        refetchOnWindowFocus: false
    });

    useEffect(() => {
        if (userProfile?.role) {
            setRole(userProfile.role);
        }
    }, [userProfile]);

    const validationSchema = useMemo(() => {
        return Yup.object().shape({
            ...((!userProfile?.collegeIDProof && role === "passenger") ? {
                username: Yup.string().required(t("formMessages.usernameRequired")),
                mobile: Yup.string().required(t("formMessages.mobileRequired"))
                    .matches(mobileRegex, t("formMessages.mobileConstraint")),
                role: Yup.string().notRequired(),
                collegeName: Yup.string().required(t("formMessages.collegeNameRequired")),
                collegeID: Yup.mixed()
                    .nullable()
                    .required(t("formMessages.collegeIDRequired")),
                fullName: Yup.string().notRequired(),
                email: Yup.string().notRequired(),
            } : {
                username: Yup.string().required(t("formMessages.usernameRequired")),
                mobile: Yup.string().required(t("formMessages.mobileRequired"))
                    .matches(mobileRegex, t("formMessages.mobileConstraint")),
                role: Yup.string().notRequired(),
                collegeName: Yup.string().notRequired(),
                fullName: Yup.string().notRequired(),
                email: Yup.string().notRequired(),
            })
        });
    }, [role]);

    if (!userProfile) {
        return <PageLoader />
    };

    const initialValues = {
        username: userProfile.username || "",
        mobile: userProfile.mobile || "",
        collegeName: userProfile.collegeName || "",
        role: userProfile.role || "",
        fullName: userProfile.fullName || "",
        email: userProfile.email || ""
    };

    const handleToggleEdit = () => {
        setIsEdit((prev) => !prev);
    };

    const renderSkeleton = <><Skeleton variant="text" width={"100%"} />
        <Skeleton variant="rectangular" width={"100%"} height={"40"} /></>;

    const handleUpdateProfileImg = async (file: File) => {
        const formData = new FormData();
        formData.append("profileImg", file);
        try {
            setLoading(true);
            await apiInterceptor.put(api.user.updateProfileImg, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            showToast("success", t("messages.profileImageEditSuccess"));
            invalidateQuery(["userProfile"]);
            invalidateQuery(["profileImg"]);
        }
        catch (err) {
            console.error("Error editing profile image:", err);
        }
        finally {
            setLoading(false);
        }
    };

    const handleEditProfile = async (payload: any) => {
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
            await apiInterceptor.put(api.user.updateProfile, payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            showToast("success", t("messages.EditProfileSuccess"));
            await updateRole(role);
            const { setRole } = useRole();
            setRole(role);
            await updateUsername(payload.username);
            invalidateQuery(["userProfile"]);
        }
        catch (err) {
            console.error("Error editing user profile:", err);
        }
        finally {
            setIsLoading(false);
        }
    };

    const handleUpdateCollegeID = async (file: File) => {
        const formData = new FormData();
        formData.append("collegeID", file);
        try {
            setLoading(true);
            await apiInterceptor.put(api.user.editCollegeID, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            showToast("success", t("messages.collegeIDEditSuccess"));
            invalidateQuery(["userProfile"]);
        }
        catch (err) {
            console.error("Error editing profile image:", err);
        }
        finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        setSubmitting(false);
        let payload = { ...values };
        await handleEditProfile(payload);
        setIsEdit(false);
    };

    return (
        <>
            {loading && <LoadingOverlay />}
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema} enableReinitialize>
                {({ values, handleChange, handleBlur, handleSubmit, errors, touched, isValid, setFieldValue, resetForm }) => {
                    const handleRoleChange = (e: any) => {
                        const newRole = e.target.checked ? e.target.value : '';
                        setFieldValue("role", newRole);
                        setRole(newRole);
                    };
                    const handleReset = () => {
                        resetForm();
                        setRole(initialValues.role);
                    }
                    return (
                        <WithSuspense
                            data={userProfile}
                            isLoading={isProfileLoading}
                            empty={<ProfileNotFound />}
                            fallback={renderSkeleton}
                        >
                            <form onSubmit={handleSubmit}>
                                {userProfile && (
                                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                                        <ImageUpload
                                            image={userProfile.profileImg}
                                            onImageChange={handleUpdateProfileImg}
                                        />
                                    </div>
                                )}

                                <div className="border-t border-gray-200 mt-2 pt-4 animate-fade-in">
                                    <div className="flex items-end justify-between">
                                        <h2 className="text-gray-800 font-bold mb-4">{t("userProfile")}</h2>
                                        <EditButton isEditing={isEdit} onToggle={handleToggleEdit} onCancel={handleReset} />
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
                                    {role === "passenger" && (
                                        <TextInput
                                            label={t("collegeName")}
                                            name="collegeName"
                                            placeholder={t("collegeName")}
                                            value={values.collegeName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            disabled={!isEdit}
                                            required
                                            error={touched?.collegeName && errors.collegeName}
                                        />
                                    )}
                                </div>
                                {role === "passenger" && (
                                    userProfile.collegeIDProof ? (
                                        <ImageUpload
                                            image={`${userProfile.collegeIDProof}?t=${Date.now()}`}
                                            onImageChange={handleUpdateCollegeID}
                                            heading="College ID"
                                            alignment="left"
                                        />
                                    ) : (
                                        <FileUpload
                                            label={t("uploadCollegeID")}
                                            required
                                            name="collegeID"
                                            onChange={(file) => setFieldValue("collegeID", file)}
                                        />
                                    )
                                )}
                                {isEdit && <div className="flex items-center justify-end">
                                    <LoadingButton name={t("saveBtn")} handleApi={handleSubmit} isLoading={isLoading}
                                        disabled={!isValid || !isEdit} /></div>
                                }
                            </form>
                        </WithSuspense>
                    )
                }}
            </Formik>
        </>
    );
};

export default UserProfile;
