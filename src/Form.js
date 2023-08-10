import React, {  useState } from "react";
import "./App.css";


function Form({ data, schema, onSave }) {
  const [formData, setFormData] = useState(data);
  const [formErrors, setFormErrors] = useState({});
  const [showError, setShowError] = useState(false);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === "checkbox" ? checked : value;
  
    setFormData((prevData) => ({ ...prevData, [name]: fieldValue }));
  };

  const handleBlur = (fieldName, value) => {
  
    
    validateField(fieldName, value);
    // checkShowError();  
  };


  const validateField = (fieldName, value) => {
    const errors = { ...formErrors };
    const inputData = schema.form.fields.find(
      (field) => field.name === fieldName
    );

    if (inputData) {
      if (inputData.required && !value) {
        errors[inputData.name] = `${inputData.label} is required`;
      } else {
        errors[inputData.name] = undefined;
      }

      if (inputData.data_type === "Integer") {
        // Adjusted property name
        const numValue = parseInt(value, 10);
        if (isNaN(numValue)) {
          errors[inputData.name] = `${inputData.label} must be a valid number`;
        } else if (numValue < inputData.minLength) {
          // Use inputData.minLength
          errors[
            inputData.name
          ] = `${inputData.label} should be at least ${inputData.minLength}`;
        } else if (numValue > inputData.maxLength) {
          // Use inputData.maxLength
          errors[
            inputData.name
          ] = `${inputData.label} should not exceed ${inputData.maxLength}`;
        }
      }

      if (inputData.data_type === "String") {
        // Adjusted property name
        if (
          value.length < inputData.minLength ||
          value.length > inputData.maxLength
        ) {
          errors[
            inputData.name
          ] = `${inputData.label} must be between ${inputData.minLength} and ${inputData.maxLength} characters`;
        }
      }
    }

    setFormErrors(errors);
  };

 
  // const checkShowError = () => {
  //   const conditions = schema.form.fields.map((inputData) => {
  //     const value = formData[inputData.name];
  //     console.log(`Field: ${inputData.name}, Value: ${value}`);
  
  //     if (inputData.data_type === 'Integer') {
  //       const condition = !inputData.minLength || !inputData.maxLength ||
  //              (value >= inputData.minLength && value <= inputData.maxLength);
  //              console.log(`Condition (Integer): ${condition}`);
  //              return condition;
  //     }
  
  //     if (inputData.data_type === 'String') {
  //       const condition =  !inputData.minLength || !inputData.maxLength ||
  //              (value.length >= inputData.minLength && value.length <= inputData.maxLength);
  //              console.log(`Condition (String): ${condition}`);
  //              return condition;
  //     }
  
  //     // For other data types or fields without min/max values, assume conditions are met
  //     return true;
  //   });
  
  //   const allConditionsMet = conditions.every((condition) => condition);
  //   setShowError(!allConditionsMet);
  // };
  
  const handleSubmit = (event) => {
    event.preventDefault();
  
    const errorCount = Object.values(formErrors).filter(Boolean).length;
  
    if (errorCount === 0) {
      onSave(formData);
    } else {
      console.log("Form contains errors");
    }
  };

  const handleReset = () => {
    setFormData(data);
    setFormErrors({});
    setShowError(false);
  };


  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {schema.form.fields.map((inputData, index) => (
          <div key={index}>
            <label>{inputData.label}</label>
            {inputData.html_element === "select" ? (
              <select
                className="form-select"
                name={inputData.name}
                required={inputData.required}
                data-type={inputData.data_type}
                onChange={handleInputChange}
                onBlur={(e) => handleBlur(inputData.name, e.target.value)}
                value={formData[inputData.name] || ""}
              >
                <option value="">Select an option</option>
                {inputData.options.map((option, optionIndex) => (
                  <option key={optionIndex} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                className="form-input"
                type={inputData.html_element}
                name={inputData.name}
                required={inputData.required}
                data-type={inputData.data_type}
                onChange={handleInputChange}
                onBlur={(e) => handleBlur(inputData.name, e.target.value)}
                value={formData[inputData.name] || ""}
              />
            )}
            {formErrors[inputData.name] && (
              <div className="error-message">{formErrors[inputData.name]}</div>
            )}
          </div>
        ))}
         {showError && (
          <div className="error-message">Please fix errors or meet conditions.</div>
        )}
        <button className="form-button" type="submit">
          Submit
        </button> 
        <button className="form-button" type="button" onClick={handleReset}>
            Reset
          </button>
      </form>
    </div>
  );
}

export default Form;
