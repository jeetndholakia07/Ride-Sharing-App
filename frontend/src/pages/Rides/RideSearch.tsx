import { type FC } from "react";
import TextInput from "../../components/Form/TextInput";
import { useTranslation } from "react-i18next";
import { seats } from "../../i18n/keys/seats.json";
import DatePicker from "../../components/Form/DatePicker";
import ReverseBtn from "../../components/Buttons/ReverseBtn";
import SelectInput from "../../components/Form/SelectInput";

type Props = {
    values: any;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onBlur: React.FocusEventHandler<HTMLInputElement>;
    errors: any;
    touched: any;
    handleDateChange: (date: Date) => void;
    handleSelectChange: (e: any) => void;
    setFieldValue: any;
};

const RideSearch: FC<Props> = ({
    values,
    onChange,
    onBlur,
    errors,
    touched,
    handleDateChange,
    handleSelectChange,
    setFieldValue,
}) => {
    const { t } = useTranslation();

    const handleReverse = () => {
        setFieldValue("from", values.to);
        setFieldValue("to", values.from);
    };

    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-4 sm:space-y-0 px-2 sm:px-0">
            {/* FROM */}
            <div className="flex-1">
                <TextInput
                    label={t("from")}
                    name="from"
                    placeholder={t("startingLocation")}
                    value={values.from}
                    onChange={onChange}
                    onBlur={onBlur}
                    required
                    error={touched?.from && errors.from}
                    icon="bi bi-geo-alt-fill"
                    isRide={true}
                />
            </div>

            {/* REVERSE BUTTON */}
            <div className="flex items-stretch justify-center">
                <ReverseBtn handleClick={handleReverse} />
            </div>

            {/* TO */}
            <div className="flex-1">
                <TextInput
                    label={t("to")}
                    name="to"
                    placeholder={t("destinationLocation")}
                    value={values.to}
                    onChange={onChange}
                    onBlur={onBlur}
                    required
                    error={touched?.to && errors.to}
                    icon="bi bi-geo-alt-fill"
                    isRide={true}
                />
            </div>

            {/* DATE PICKER */}
            <div className="w-[180px] min-w-[150px]">
                <DatePicker
                    label={t("date")}
                    name="date"
                    required
                    placeholder={t("date")}
                    value={values.departure}
                    onChange={([selectedDate]: any) => handleDateChange(selectedDate)}
                    icon="bi bi-calendar-event"
                    minDate={new Date()}
                />
            </div>

            {/* SEATS SELECT */}
            <div className="w-[130px] min-w-[110px]">
                <SelectInput
                    name={t("seats")}
                    label={t("seats")}
                    value={values.seats}
                    values={seats}
                    onChange={handleSelectChange}
                    icon="bi bi-person-fill"
                />
            </div>
        </div>
    );
};

export default RideSearch;
