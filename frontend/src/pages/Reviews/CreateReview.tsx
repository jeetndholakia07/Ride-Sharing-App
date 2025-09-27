import { useState } from 'react';
import TextArea from "../../components/Form/TextArea";
import { useTranslation } from 'react-i18next';
import { Formik, type FormikHelpers } from 'formik';
import LoadingButton from '../../components/Form/LoadingButton';
import apiInterceptor from '../../hooks/apiInterceptor';
import { api } from '../../hooks/api';
import { useToast } from '../../components/Toast/ToastContext';
import useAuth from '../../hooks/useAuth';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import { useNavigate } from 'react-router';

type FormValues = {
    rating: number;
    review: string;
}

const CreateReview = () => {
    const [rating, setRating] = useState(0);
    const [hovered, setHovered] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const handleClose = () => setModalOpen(false);
    const { showToast } = useToast();
    const { t } = useTranslation();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const initialValues: FormValues = {
        rating: rating,
        review: ""
    };

    const handleCreateReview = async (payload: FormValues) => {
        try {
            if (!isAuthenticated) {
                setModalOpen(true);
                return;
            }
            setIsLoading(true);
            await apiInterceptor.post(api.createReview, payload);
            showToast("success", t("messages.createReviewSuccess"));
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
    }

    const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        setSubmitting(false);
        const payload = {
            ...values,
            rating: rating
        };
        await handleCreateReview(payload);
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange, handleBlur, handleSubmit }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl mx-auto">
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">{t("leaveReview")}</h2>
                                {/* Star Rating */}
                                <div className="flex mb-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <i
                                            key={star}
                                            className={`bi ${(hovered || rating) >= star ? 'bi-star-fill text-yellow-400' : 'bi-star text-gray-300'
                                                } text-2xl cursor-pointer transition-all duration-150`}
                                            onMouseEnter={() => setHovered(star)}
                                            onMouseLeave={() => setHovered(0)}
                                            onClick={() => setRating(star)}
                                        />
                                    ))}
                                </div>

                                <TextArea name={"review"} value={values.review} onChange={handleChange} onBlur={handleBlur}
                                    label={t("review")} rows={3} placeholder={t("enterReview")}
                                />
                                <div className="flex items-center justify-end mt-4">
                                    <LoadingButton name={t("submitReview")} handleApi={handleSubmit} isLoading={isLoading}
                                        disabled={rating === 0}
                                    />
                                </div>
                            </div>
                        </form>
                    )
                }}
            </Formik>
            {modalOpen && <ConfirmModal title={t("notLogin")} message={t("messages.redirectLogin")} onClose={handleClose} open={modalOpen}
                confirmBtn={t("ok")} handleSubmit={handleRedirect} />}
        </>
    );
};

export default CreateReview;