import EditButton from "../../components/Buttons/EditButton";
import EditReview from "./EditReview";
import AddReview from "./AddReview";
import ReviewDisplay from "./ReviewDisplay";
import { useTranslation } from "react-i18next";

interface Review {
    rating: number;
    review: string;
    user: {
        userId: string;
        username: string;
        role: string;
    };
}

interface UserReviewSectionProps {
    userReview: Review | null;
    isEdit: boolean;
    onEditToggle: () => void;
    onCancel: () => void;
}

const RenderUserReview = ({
    userReview,
    isEdit,
    onEditToggle,
    onCancel,
}: UserReviewSectionProps) => {
    const { t } = useTranslation();
    if (!userReview) {
        return <div className="space-y-6 w-full max-w-2xl mx-auto"><h2 className="text-2xl font-bold text-gray-800 mb-4">{t("yourReview")}</h2><AddReview /></div>;
    }

    if (isEdit) {
        return (
            <EditReview
                initialRating={userReview.rating}
                initialReview={userReview.review}
                reviewId={userReview.user.userId}
                isEdit={isEdit}
                onEditToggle={onEditToggle}
                onCancel={onCancel}
            />
        );
    }

    return (
        <ReviewDisplay reviews={[userReview]} heading={t("yourReview")}>
            <EditButton isEditing={isEdit} onToggle={onEditToggle} onCancel={onCancel} />
        </ReviewDisplay>
    );
};

export default RenderUserReview;