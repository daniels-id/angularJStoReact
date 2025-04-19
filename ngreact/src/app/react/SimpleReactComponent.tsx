import React, { ChangeEvent } from 'react';

interface SimpleReactComponentProps {
    name: string;
    onNameChange: (newName: string) => void;
}

const SimpleReactComponent: React.FC<SimpleReactComponentProps> = ({ name, onNameChange }) => {
    console.log('SimpleReactComponent rendering! Name:', name);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log('[React] handleChange, calling onNameChange with:', event.target.value);
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
                    value={name}
                    onChange={handleChange}
                />
            </label>
        </div>
    );
};

export default SimpleReactComponent;