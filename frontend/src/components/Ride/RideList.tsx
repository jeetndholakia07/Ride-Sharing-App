import { useTranslation } from "react-i18next";
import RideCard from "./RideCard";
import NotFound from "../../pages/Error/NotFound";
import { type FC } from "react";

type Props = {
    rides: any;
    mapper: any;
};

const RideList: FC<Props> = ({ rides, mapper }) => {
    const { t } = useTranslation();
    if (!rides || rides.length === 0) {
        return <NotFound />;
    }

    return (
        <>
            <h2 className="text-3xl font-bold text-indigo-700 mb-2 text-center tracking-tight">
                {t("availableRides")}
            </h2>
            <div className={`grid grid-cols-1 ${rides.length === 1 ? "sm:grid-cols-1" : "sm:grid-cols-2"} gap-6`}>
                {rides.map((ride: any, index: any) => {
                    const data = mapper(ride);
                    return (
                        <RideCard key={index} data={data} />
                    )
                })}
            </div>
        </>
    );
};

export default RideList;