import React, { useState } from 'react';

// ** Form Template has been referenced and adapted from the following online source:
// ** Forms, React, Meta Platforms, Inc. v18.2.0. Available at: https://legacy.reactjs.org/docs/forms.html


function GenericForm({ formFields, onSubmit, onCancel, formClassName, fieldClassName, submitButtonClassName, cancelButtonClassName, constructData  }) {
   
    // State -------------------------------------------------
    const [formData, setFormData] = useState({});


    // Handlers ----------------------------------------------
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
             ...prevFormData, [name]: value === '' ? null : value,
             })
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const constructedData = constructData(formData);   
        onSubmit(constructedData);
    };

    // View --------------------------------------------------
    return (
        <form onSubmit={handleSubmit} className={formClassName}>
            {formFields.map((field) => (
                <div key={field.name} className={fieldClassName}>
                    {field.type === 'select' ? (
                        <select
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={handleChange}
                            required={field.required}
                        >
                            <option value=''>{field.placeholder}</option>
                            {field.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            value={formData[field.name] || ''}
                            onChange={handleChange}
                            required={field.required}
                        />
                    )}
                </div>
            ))}
            <div className={fieldClassName}>
                <button type='submit' className={submitButtonClassName}>Submit</button>
                <button type='cancel' onClick={onCancel} className={cancelButtonClassName}>Cancel</button>
            </div>
        </form>
    );
}

export default GenericForm;
