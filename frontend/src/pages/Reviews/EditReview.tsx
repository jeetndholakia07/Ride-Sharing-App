import { useState } from 'react';
import { Formik, type FormikHelpers } from 'formik';
import TextArea from "../../components/Form/TextArea";
import LoadingButton from '../../components/Form/LoadingButton';
import { useToast } from '../../components/Toast/ToastContext';
import apiInterceptor from '../../hooks/apiInterceptor';
import { api } from '../../hooks/api';
import { useTranslation } from 'react-i18next';
import EditButton from '../../components/Buttons/EditButton';
import useInvalidateQuery from '../../hooks/useInvalidateQuery';
import RatingStar from '../../components/Review/RatingStar';

type EditReviewProps = {
    reviewId: string;
    initialRating: number;
    initialReview: string;
    isEdit: boolean;
    onEditToggle: any;
    onCancel: any;
};

const EditReview: React.FC<EditReviewProps> = ({ reviewId, initialRating, initialReview, isEdit, onEditToggle, onCancel }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { showToast } = useToast();
    const { t } = useTranslation();
    const invalidateQuery = useInvalidateQuery();

    const initialValues = {
        rating: initialRating,
        review: initialReview,
    };

    const handleSubmit = async (values: any, { setSubmitting }: FormikHelpers<any>) => {
        setSubmitting(false);
        try {
            setIsLoading(true);
            const payload = { ...values, id: reviewId };
            await apiInterceptor.put(api.user.editReview, payload);
            onCancel();
            showToast("success", t("messages.reviewEditSuccess"));
            invalidateQuery(["allReviews"]);
        } catch (err) {
            console.error("Error updating review:", err);
        } finally {
            setIsLoading(false);
        }
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
                            <div className="flex items-end justify-between">
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit Your Review</h2>
                                <EditButton isEditing={isEdit} onToggle={onEditToggle} onCancel={onCancel} />
                            </div>
                            <RatingStar handleClick={handleChangeRating} rating={values.rating} />

                            {/* Review */}
                            <TextArea
                                name={"review"}
                                value={values.review}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                label={t("review")}
                                rows={3}
                                placeholder={values.review}
                            />

                            <div className="flex items-center justify-end mt-4">
                                <LoadingButton
                                    name={t("saveBtn")}
                                    handleApi={handleSubmit}
                                    isLoading={isLoading}
                                    disabled={values.rating === 0}
                                />
                            </div>
                        </div>
                    </form>
                );
            }}
        </Formik>
    );
};

export default EditReview;