import React, { useState } from "react";
import "./App.css";

const data = {
  form: {
    fields: [
      {
        name: "name",
        label: "Name",
        required: true,
        data_type: "String",
        html_element: "text",
      },
      {
        name: "email",
        label: "Email",
        required: true,
        data_type: "String",
        html_element: "email",
      },
      {
        name: "age",
        label: "Age",
        required: true,
        data_type: "Integer",
        html_element: "number",
      },
      {
        name: "number",
        label: "Number",
        required: true,
        data_type: "Integer",
        html_element: "number",
      },

      {
        name: "role",
        label: "Role",
        required: true,
        data_type: "String",
        html_element: "select",
        options: [
          { label: "Admin", value: "admin" },
          { label: "User", value: "user" },
        ],
      },
      {
        name: "Condition",
        label: "Do You Accept All The Condition",
        required: false,
        data_type: "Boolean",
        html_element: "checkbox",
      },
    ],
  },
};

function Form() {
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({ ...prevData, [name]: fieldValue }));
  };

  const handleBlur = (fieldName, value) => {
    validateField(fieldName, value);
  };

  // validation for Form
  const validateField = (fieldName, value) => {
    const errors = { ...formErrors };

    const inputData = data.form.fields.find(
      (field) => field.name === fieldName
    );

    if (inputData) {
      if (inputData.required && !value) {
        errors[inputData.name] = `${inputData.label} is required`;
      } else {
        errors[inputData.name] = undefined; 
      }

      if (inputData.name === "age") {
        const numValue = parseInt(value, 10);

        if (isNaN(numValue)) {
          errors[inputData.name] = `${inputData.label} must be a valid number`;
        } else {
          if (numValue < 18) {
            errors[inputData.name] = `${inputData.label} should be at least 18`;
          }

          if (numValue > 100) {
            errors[inputData.name] = `${inputData.label} should not exceed 100`;
          }
        }
      }
       if (inputData.name === "name") {
        if (value.length < 5 || value.length > 30) {
          errors[inputData.name] = `${inputData.label} must be between 5 and 30 characters`;
        }
      }
    }

    setFormErrors(errors);
  };

  // For Submit
  const handleSubmit = (event) => {
    event.preventDefault();

    const nameValue = formData["name"];
    if (validateForm() && formData.age >= 18 && nameValue.length >= 5 && nameValue.length <= 30) {
      console.log("Submitted Data:", formData);
    } else {
      console.log("Form contains errors ");
    }
  };

  const validateForm = () => {
    const errors = {};
 
    data.form.fields.forEach((inputData) => {
      const value = formData[inputData.name];
      validateField(inputData.name, value); 
      if (errors[inputData.name]) {
        return false; 
      }
    });

    return true; 
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {data.form.fields.map((inputData, index) => (
          <div key={index}>
            <label>{inputData.label}</label>
            {inputData.html_element === "select" ? (
              <select
                className="form-select"
                name={inputData.name}
                required={inputData.required}
                datatype={inputData.data_type}
                onChange={handleInputChange}
                onBlur={(e) => handleBlur(inputData.name, e.target.value)}
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
                datatype={inputData.data_type}
                onChange={handleInputChange}
                onBlur={(e) => handleBlur(inputData.name, e.target.value)}
              />
            )}
            {formErrors[inputData.name] && (
              <div className="error-message">{formErrors[inputData.name]}</div>
            )}
          </div>
        ))}
        <button className="form-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
