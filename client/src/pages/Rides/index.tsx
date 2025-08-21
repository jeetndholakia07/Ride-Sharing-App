import { useState } from 'react';
import RideSearch from './RideSearch';
import RadioButtonGroup from '../../components/Form/RadioButton';

const RidesContainer = () => {
    const [userType, setUserType] = useState<'driver' | 'receiver'>('driver'); // Default to 'driver'

    const handleUserTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserType(e.target.value as 'driver' | 'receiver'); // Update user type
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                {/* Title and user type selection */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Ride Search
                    </h1>
                    <p className="text-lg text-gray-600 mb-4">
                        Select your role to choose your ride.
                    </p>
                </div>

                {/* Radio Buttons for User Type */}
                <RadioButtonGroup
                    label="Select User Type"
                    name="userType"
                    options={[
                        { label: 'Driver', value: 'driver', icon: 'bi bi-car-front-fill mr-2' },
                        { label: 'Receiver', value: 'receiver', icon: 'bi bi-person mr-1' },
                    ]}
                    value={userType}
                    onChange={handleUserTypeChange}
                    onBlur={() => { }}
                    required
                />

                {/* Rides form based on user type */}
                <RideSearch userType={userType} />
            </div>
        </div>
    );
};

export default RidesContainer;
