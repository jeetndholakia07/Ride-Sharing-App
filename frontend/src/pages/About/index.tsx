import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { RootState } from "../../context/store/store";

const Index = () => {
    const { t } = useTranslation();
    const data = useSelector((state: RootState) => state.peerRide);
    return (
        <div className="min-h-screen bg-gray-50 py-16 px-6 w-auto sm:px-12 lg:px-24">
            <div className="max-w-5xl mx-auto">
                {/* Company Intro */}
                <section className="mb-16 text-center">
                    <h1 className="text-5xl font-extrabold mb-6">{t("welcome")}
                        <span className="text-blue-700 ml-2">{t("peer")}</span>
                        <span className="text-green-700">{t("ride")}</span>
                    </h1>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                        {t("peerrideaim")}
                    </p>
                </section>

                {/* Company Goals */}
                <section className="mb-16">
                    <h2 className="text-3xl font-semibold text-blue-700 mb-6 text-center">{t("ourGoals")}</h2>
                    <ul className="max-w-3xl mx-auto space-y-4 text-gray-700 text-lg list-disc list-inside">
                        {data.goals.map((item, index) => {
                            return (
                                <li key={index}>
                                    {item.text}
                                </li>
                            )
                        })}
                    </ul>
                </section>

                {/* Company Services */}
                <section>
                    <h2 className="text-3xl font-semibold text-blue-700 mb-6 text-center">{t("whatWeOffer")}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                        {data.services.map((item) => {
                            return (
                                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition" key={item.heading}>
                                    <h3 className="text-xl font-bold mb-2 text-green-700">{item.heading}</h3>
                                    <p className="text-gray-700">
                                        {item.text}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Index;  