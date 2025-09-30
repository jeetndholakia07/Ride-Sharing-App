import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import apiInterceptor from '../../hooks/apiInterceptor';
import axiosInstance from "../../hooks/axiosInstance";
import { api } from '../../hooks/api';
import { useQuery } from '@tanstack/react-query';
import Skeleton from '@mui/material/Skeleton';
import NotFoundReview from './NotFoundReview';
const ReviewDisplay = lazy(() => import("./ReviewDisplay"));
import WithSuspense from '../../components/Loading/WithSuspense';
const AddReview = lazy(() => import("./AddReview"));

const ReviewSection = () => {
    const { t } = useTranslation();

    const handleSearchReview = async () => {
        try {
            const response = await apiInterceptor.get(api.user.userReview);
            return response.data;
        }
        catch (err) {
            console.error("User review not found:", err);
            return null;
        }
    };

    const getReviews = async () => {
        try {
            const response = await axiosInstance.get(api.public.allReviews);
            return response.data.data;
        }
        catch (err) {
            console.error("Error fetching reviews:", err);
            return null;
        }
    };

    const { data: userReview, isLoading: isUserLoading } = useQuery({
        queryKey: ["userReview"],
        queryFn: handleSearchReview,
        refetchOnWindowFocus: false,
        retry: false
    });

    const { data: reviews, isLoading: isReviewsLoading } = useQuery({
        queryKey: ["allReviews"],
        queryFn: getReviews,
        refetchOnWindowFocus: false,
        retry: false
    });

    const renderSkeleton = <><Skeleton variant="text" width={"100%"} />
        <Skeleton variant="rectangular" width={"100%"} height={"40"} /></>;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="mb-8">
                {/* User Review Section */}
                <WithSuspense
                    data={userReview}
                    fallback={renderSkeleton}
                    empty={<AddReview />}
                    isLoading={isUserLoading}
                >
                    <ReviewDisplay reviews={[userReview]} heading={t("userReview")} />
                </WithSuspense>
            </div>
            {/* All Reviews Section */}
            <WithSuspense
                data={reviews}
                fallback={renderSkeleton}
                empty={<NotFoundReview />}
                isLoading={isReviewsLoading}
            >
                <ReviewDisplay reviews={reviews} heading={t("review")} />
            </WithSuspense>
        </div>
    );
};

export default ReviewSection;