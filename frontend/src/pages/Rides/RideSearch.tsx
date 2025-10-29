import { type FC } from 'react';
import TextInput from '../../components/Form/TextInput';
import SelectInput from '../../components/Form/SelectInput';
import { useTranslation } from 'react-i18next';
import { seats } from "../../i18n/keys/seats.json";
import DatePicker from '../../components/Form/DatePicker';
import ReverseBtn from '../../components/Buttons/ReverseBtn';

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
    setFieldValue
}) => {
    const { t } = useTranslation();

    const handleReverse = () => {
        setFieldValue("from", values.to);
        setFieldValue("to", values.from);
    };

    return (
        <div className="space-y-6 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <div className="relative flex flex-col sm:flex-row sm:items-center sm:gap-4">
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

                <div className="absolute sm:static top-1/2 sm:top-auto left-1/2 sm:left-auto transform -translate-x-1/2 -translate-y-1/2 sm:translate-x-0 sm:translate-y-0 z-10">
                    <ReverseBtn handleClick={handleReverse} />
                </div>

                <div className="flex-1 mt-8 sm:mt-0">
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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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