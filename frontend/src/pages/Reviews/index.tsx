import { lazy, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import apiInterceptor from '../../hooks/apiInterceptor';
import { api } from '../../hooks/api';
import { useQuery } from '@tanstack/react-query';
import Skeleton from '@mui/material/Skeleton';
import NotFoundReview from './NotFoundReview';
const ReviewDisplay = lazy(() => import("./ReviewDisplay"));
import WithSuspense from '../../components/Loading/WithSuspense';
import PageLoader from '../../components/Loading/PageLoader';
import RenderUserReview from './RenderUserReview';

const ReviewSection = () => {
    const { t } = useTranslation();
    const [isEdit, setIsEdit] = useState(false);

    const getReviews = async () => {
        try {
            const response = await apiInterceptor.get(api.public.allReviews);
            return response.data.data;
        } catch (err) {
            console.error("Error fetching all reviews:", err);
            return [];
        }
    };

    const { data: reviews, isLoading: isReviewsLoading } = useQuery({
        queryKey: ["allReviews"],
        queryFn: getReviews,
        refetchOnWindowFocus: false,
        retry: false,
    });

    // Extract the user's own review from the array using isUserRating
    const userReview = useMemo(() => {
        if (!Array.isArray(reviews)) return null;
        return reviews.find((r: any) => r.isUserRating === true) || null;
    }, [reviews]);

    // Filter out the user's review for the general reviews section
    const otherReviews = useMemo(() => {
        if (!Array.isArray(reviews)) return [];
        return reviews.filter((r: any) => !r.isUserRating);
    }, [reviews]);

    const renderSkeleton = (
        <>
            <Skeleton variant="text" width={"100%"} />
            <Skeleton variant="rectangular" width={"100%"} height={"40"} />
        </>
    );

    const handleEditToggle = () => setIsEdit(true);
    const handleCancel = () => setIsEdit(false);

    if (isReviewsLoading) {
        return <PageLoader />;
    }

    if (!reviews) {
        return renderSkeleton;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* User Review Section */}
            <RenderUserReview
                userReview={userReview}
                isEdit={isEdit}
                onEditToggle={handleEditToggle}
                onCancel={handleCancel}
            />

            {/* All Other Reviews */}
            <WithSuspense
                data={otherReviews}
                fallback={renderSkeleton}
                empty={<NotFoundReview />}
                isLoading={false}
            >
                {otherReviews.length > 0 && (
                    <ReviewDisplay reviews={otherReviews} heading={t("userReview")} />
                )}
            </WithSuspense>
        </div>
    );
};

export default ReviewSection;
