import { useState, type FC } from 'react';
import TextArea from "../Form/TextArea";
import { useTranslation } from 'react-i18next';
import { Formik, type FormikHelpers } from 'formik';
import LoadingButton from '../Form/LoadingButton';
import apiInterceptor from '../../hooks/apiInterceptor';
import { api } from '../../hooks/api';
import { useToast } from '../Toast/ToastContext';
import { useNavigate } from 'react-router';
import useInvalidateQuery from '../../hooks/useInvalidateQuery';
import RatingStar from './RatingStar';

type Props = {
    driverId: string;
    driveId: string;
};

type FormValues = {
    rating: number;
    review: string;
};

const AddDriverRating: FC<Props> = ({ driveId, driverId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { showToast } = useToast();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const invalidateQuery = useInvalidateQuery();

    const initialValues: FormValues = {
        rating: 0,
        review: ""
    };

    const handleAddRating = async (payload: any) => {
        try {
            setIsLoading(true);
            await apiInterceptor.post(api.ride.addDriverRating, payload);
            showToast("success", t("messages.addDriverRatingSuccess"));
            navigate("/profile/rides");
            invalidateQuery(["ridesForPassenger"]);
        } catch (err) {
            console.error("Error adding driver rating:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        setSubmitting(false);
        const payload = { ...values, driveId, driverId };
        await handleAddRating(payload);
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
                const handleChangeRating = (selectedRating: number) => {
                    setFieldValue("rating", selectedRating);
                };

                return (
                    <form onSubmit={handleSubmit} className="w-full mt-4">
                        <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">
                            {t("rateDriver")}
                        </h2>

                        <div className="mb-4">
                            <RatingStar handleClick={handleChangeRating} rating={values.rating} />
                        </div>

                        <div className="mb-4">
                            <TextArea
                                name="review"
                                value={values.review}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                label={t("optionalReview")}
                                rows={3}
                                placeholder={t("optionalReview")}
                            />
                        </div>

                        <div className="flex justify-start mt-2">
                            <LoadingButton
                                name={t("submitReview")}
                                handleApi={handleSubmit}
                                isLoading={isLoading}
                                disabled={values.rating === 0}
                            />
                        </div>
                    </form>
                );
            }}
        </Formik>
    );
};

export default AddDriverRating;
