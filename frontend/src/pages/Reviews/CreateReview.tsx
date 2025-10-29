import { useState } from 'react';
import TextArea from "../../components/Form/TextArea";
import { useTranslation } from 'react-i18next';
import { Formik, type FormikHelpers } from 'formik';
import LoadingButton from '../../components/Form/LoadingButton';
import apiInterceptor from '../../hooks/apiInterceptor';
import { api } from '../../hooks/api';
import { useToast } from '../../components/Toast/ToastContext';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router';
import { useConfirmModal } from '../../context/ConfirmModalContext';
import useInvalidateQuery from '../../hooks/useInvalidateQuery';
import RatingStar from '../../components/Review/RatingStar';

type FormValues = {
    rating: number;
    review: string;
}

const CreateReview = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { showToast } = useToast();
    const { openModal } = useConfirmModal();
    const { t } = useTranslation();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const invalidateQuery = useInvalidateQuery();

    const initialValues: FormValues = {
        rating: 0,
        review: ""
    };

    const handleCreateReview = async (payload: FormValues) => {
        try {
            if (!isAuthenticated) {
                openModal(t("notLogin"), t("messages.redirectLogin"), t("ok"), handleRedirect);
                return;
            }
            setIsLoading(true);
            await apiInterceptor.post(api.user.createReview, payload);
            showToast("success", t("messages.createReviewSuccess"));
            invalidateQuery(["userReview"]);
            invalidateQuery(["allReviews"]);
        }
        catch (err) {
            console.error("Error creating a review:", err);
        }
        finally {
            setIsLoading(false);
        }
    }

    const handleRedirect = () => {
        navigate("/login");
    };

    const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        setSubmitting(false);
        const payload = { ...values };
        await handleCreateReview(payload);
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            {({ values, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
                const handleChangeRating = (selectedRating: number) => {
                    setFieldValue("rating", selectedRating);
                };
                return (
                    <form onSubmit={handleSubmit}>
                        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl mx-auto">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">{t("leaveReview")}</h2>
                            <RatingStar handleClick={handleChangeRating} rating={values.rating} />

                            <TextArea name={"review"} value={values.review} onChange={handleChange} onBlur={handleBlur}
                                label={t("review")} rows={3} placeholder={t("enterReview")}
                            />
                            <div className="flex items-center justify-end mt-4">
                                <LoadingButton name={t("submitReview")} handleApi={handleSubmit} isLoading={isLoading}
                                    disabled={values.rating === 0}
                                />
                            </div>
                        </div>
                    </form>
                )
            }}
        </Formik>
    )
}

export default CreateReview;