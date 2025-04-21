import React, { ChangeEvent } from 'react';

interface NestedReactComponentProps {
    value: string;
    onChange: (newValue: string) => void;
}

const NestedReactComponent: React.FC<NestedReactComponentProps> = ({ value, onChange }) => {

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <div style={{ marginTop: '10px', border: '1px solid lightgray', padding: '10px' }}>
            <h4>Hello from Nested React Component!</h4>
            <label>
                Set Nested Value (in React):
                <input
                    type="text"
                    value={value}
                    onChange={handleChange}
                />
            </label>
        </div>
    );
};

export default NestedReactComponent; 