import { lazy, useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import apiInterceptor from '../../hooks/apiInterceptor';
import axiosInstance from "../../hooks/axiosInstance";
import { api } from '../../hooks/api';
import { useQuery } from '@tanstack/react-query';
import Skeleton from '@mui/material/Skeleton';
import NotFoundReview from './NotFoundReview';
const ReviewDisplay = lazy(() => import("./ReviewDisplay"));
import WithSuspense from '../../components/Loading/WithSuspense';
import useAuth from '../../hooks/useAuth';
import PageLoader from '../../components/Loading/PageLoader';
import { findUserId } from '../../IndexedDB/tokens';
import RenderUserReview from './RenderUserReview';

const ReviewSection = () => {
    const { t } = useTranslation();
    const { isAuthenticated, loading } = useAuth();
    const [userId, setUserId] = useState<string | null>(null);
    const [isEdit, setIsEdit] = useState(false);

    const getReviews = async () => {
        try {
            const client = isAuthenticated ? apiInterceptor : axiosInstance;
            const response = await client.get(api.public.allReviews);
            return response.data.data;
        } catch (err) {
            console.error("Error fetching all reviews:", err);
            return null;
        }
    };

    const { data: reviews, isLoading: isReviewsLoading } = useQuery({
        queryKey: ["allReviews"],
        queryFn: getReviews,
        refetchOnWindowFocus: false,
        retry: false
    });

    // Extract user review (if authenticated and it matches)
    const userReview = useMemo(() => {
        if (!isAuthenticated || !userId || !Array.isArray(reviews)) return null;

        const firstReview = reviews[0];
        const reviewUserId = firstReview?.user?.userId;

        const isMatch = reviewUserId?.toString() === userId?.toString();

        return isMatch ? firstReview : null;
    }, [isAuthenticated, userId, reviews]);


    // Filter out the user review if it exists
    const filteredReviews = useMemo(() => {
        return userReview
            ? reviews.filter((review: any) => review.user.userId !== userId)
            : reviews;
    }, [reviews, userReview, userId]);

    useEffect(() => {
        const fetchUserId = async () => {
            if (isAuthenticated) {
                const id = await findUserId();
                setUserId(id);
            } else {
                setUserId(null);
            }
        };
        fetchUserId();
    }, [isAuthenticated]);

    const renderSkeleton = (
        <>
            <Skeleton variant="text" width={"100%"} />
            <Skeleton variant="rectangular" width={"100%"} height={"40"} />
        </>
    );

    const handleEditToggle = () => setIsEdit(true);
    const handleCancel = () => setIsEdit(false);

    if (loading || isReviewsLoading) {
        return <PageLoader />;
    }

    if (!reviews || (isAuthenticated && userId === null)) {
        return renderSkeleton;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Your Review Section */}
            <RenderUserReview
                userReview={userReview}
                isEdit={isEdit}
                onEditToggle={handleEditToggle}
                onCancel={handleCancel}
            />

            {/* All Other Reviews Section */}
            <WithSuspense
                data={filteredReviews}
                fallback={renderSkeleton}
                empty={<NotFoundReview />}
                isLoading={false}
            >
                {filteredReviews && filteredReviews.length > 0 && (
                    <ReviewDisplay reviews={filteredReviews} heading={t("userReview")} />
                )}
            </WithSuspense>
        </div>
    )
}

export default ReviewSection;
