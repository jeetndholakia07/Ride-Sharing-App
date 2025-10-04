import { useTranslation } from "react-i18next";
import DriveCard from "./DriveCard";
import RideNotFound from "../RideLocation/RideNotFound";
import { type FC } from "react";

type Props = {
    drives: any;
    mapper: any;
};

const DriveList: FC<Props> = ({ drives, mapper }) => {
    const { t } = useTranslation();
    if (!drives || drives.length === 0) {
        return <RideNotFound />;
    }

    return (
        <>
            <h2 className="text-3xl font-bold text-indigo-700 mb-2 text-center tracking-tight">
                {t("yourRides")}
            </h2>
            <div className={`grid grid-cols-1 ${drives.length === 1 ? "sm:grid-cols-1" : "sm:grid-cols-2"} gap-6`}>
                {drives.map((drive: any) => (
                    <DriveCard key={drive.driveDetails._id} data={mapper(drive)} />
                ))}
            </div>
        </>
    );
};

export default DriveList;