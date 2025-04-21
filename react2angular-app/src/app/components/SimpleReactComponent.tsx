import React, { ChangeEvent, useState } from 'react';
import NestedReactComponent from './NestedReactComponent'; // Import the nested component

interface SimpleReactComponentProps {
    name: string;
    onNameChange: (newName: string) => void;
    onNestedValueChange?: (newNestedValue: string) => void; // Add optional prop for nested component
}

const SimpleReactComponent: React.FC<SimpleReactComponentProps> = ({ name, onNameChange, onNestedValueChange }) => {

    const [nestedValue, setNestedValue] = useState(''); // State for the nested component's value

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onNameChange(event.target.value);
    };

    // Handler for changes in the nested component
    const handleNestedChange = (newNestedValue: string) => {
        setNestedValue(newNestedValue);
        // Call the prop function if it exists
        if (onNestedValueChange) {
            onNestedValueChange(newNestedValue);
        }
    };

    return (
        <div>
            <h2>Hello from React!</h2>
            <p>Value received from Angular: <strong>{name}</strong></p>
            <p style={{ marginTop: '5px' }}>Value from Nested Component: <strong>{nestedValue}</strong></p>
            <label>
                Change Value (in React):
                <input
                    type="text"
                    value={name} // Use the prop directly for value
                    onChange={handleChange}
                />
            </label>

            {/* Render the nested component */}
            <NestedReactComponent value={nestedValue} onChange={handleNestedChange} />
        </div>
    );
};

export default SimpleReactComponent; 