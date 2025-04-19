import React, { ChangeEvent } from 'react';

interface SimpleReactComponentProps {
    name: string;
    onNameChange: (newName: string) => void;
}

const SimpleReactComponent: React.FC<SimpleReactComponentProps> = ({ name, onNameChange }) => {

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onNameChange(event.target.value);
    };

    return (
        <div>
            <h2>Hello from React!</h2>
            <p>Value received from Angular: <strong>{name}</strong></p>
            <label>
                Change Value (in React):
                <input
                    type="text"
                    value={name} // Use the prop directly for value
                    onChange={handleChange}
                />
            </label>
        </div>
    );
};

export default SimpleReactComponent; 