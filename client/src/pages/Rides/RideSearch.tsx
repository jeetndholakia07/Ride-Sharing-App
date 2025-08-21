import { type FC, useState } from 'react';
import TextInput from '../../components/Form/TextInput'; // Importing TextInput component

type RideFormProps = {
    userType: 'driver' | 'receiver'; // Prop to distinguish between Driver and Receiver
};

const RideSearch: FC<RideFormProps> = ({ userType }) => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [error, setError] = useState('');

    const handleSearch = () => {
        if (!from || !to) {
            setError('Please fill in both From and To fields.');
            return;
        }
        setError('');
        console.log(`Searching for a ride from ${from} to ${to} as a ${userType}`);
    };

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                {/* From Input */}
                <div className="grid grid-cols-1 gap-6">
                    <TextInput
                        label="From"
                        name="from"
                        placeholder="Enter your starting location"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        onBlur={() => { }}
                        required
                        error={error}
                    />
                </div>
                {/* To Input */}
                <div className="grid grid-cols-1 gap-6">
                    <TextInput
                        label="To"
                        name="to"
                        placeholder="Enter your destination"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        onBlur={() => { }}
                        required
                        error={error}
                    />
                </div>
            </div>

            {/* Search Button */}
            <div className="mt-6 flex justify-center">
                <button
                    onClick={handleSearch}
                    className="bg-green-600 text-white hover:cursor-pointer text-lg font-semibold py-3 px-8 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-300 transform hover:scale-105"
                >
                    <i className="bi bi-search text-white mr-2"></i>
                    Search
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mt-4 text-center text-red-500 font-medium">
                    {error}
                </div>
            )}
        </div>
    );
};

export default RideSearch;
