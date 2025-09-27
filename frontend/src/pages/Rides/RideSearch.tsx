import { type FC } from 'react';
import TextInput from '../../components/Form/TextInput';
import { useTranslation } from 'react-i18next';

type props = {
    values: any;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onBlur: React.FocusEventHandler<HTMLInputElement>;
    errors: any;
    touched: any;
}

const RideSearch: FC<props> = ({ values, onChange, onBlur, errors, touched }) => {
    const { t } = useTranslation();
    return (
        <div className="space-y-6">
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
                />
            </div>
        </div>
    );
};

export default RideSearch;