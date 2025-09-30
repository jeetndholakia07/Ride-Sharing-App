import { type FC } from 'react';
import TextInput from '../../components/Form/TextInput';
import SelectInput from '../../components/Form/SelectInput';
import { useTranslation } from 'react-i18next';
import { passenger } from "../../i18n/keys/passenger.json";
import DatePicker from '../../components/Form/DatePicker';

type props = {
    values: any;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onBlur: React.FocusEventHandler<HTMLInputElement>;
    errors: any;
    touched: any;
    setSeats: any;
    setDateState: any;
    setFieldValue: any;
}

const RideSearch: FC<props> = ({ values, onChange, onBlur, errors, touched, setSeats, setDateState, setFieldValue }) => {
    const { t } = useTranslation();

    const handleSelectChange = (e: any) => {
        setSeats(e.target.value);
        setFieldValue("seats", e.target.value);
    };
    const handleDateTimeChange = (selectedDate: any) => {
        setDateState(selectedDate);
        setFieldValue("departure", selectedDate);
    };
    return (
        <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <TextInput
                    label={t("from")}
                    name="from"
                    placeholder={t("startingLocation")}
                    value={values.from}
                    onChange={onChange}
                    onBlur={onBlur}
                    required={true}
                    error={touched?.from && errors.from}
                    icon="bi bi-geo-alt-fill"
                />
                <TextInput
                    label={t("to")}
                    name="to"
                    placeholder={t("destinationLocation")}
                    value={values.to}
                    onChange={onChange}
                    onBlur={onBlur}
                    required={true}
                    error={touched?.to && errors.to}
                    icon="bi bi-geo-alt-fill"
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <DatePicker
                    label={t("date")}
                    name={"date"}
                    required={true}
                    placeholder={t("date")}
                    value={values.departure}
                    onChange={([selectedDate]: any) => handleDateTimeChange(selectedDate)}
                    icon="bi bi-calendar-event"
                />
                <SelectInput
                    name={t("seats")}
                    label={t("seats")}
                    value={values.seats}
                    values={passenger.seats}
                    onChange={handleSelectChange}
                    icon="bi bi-person-fill"
                />
            </div>
        </div>
    );
};

export default RideSearch;