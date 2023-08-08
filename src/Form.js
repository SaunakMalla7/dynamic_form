import React, { useState } from "react";
import './App.css';

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


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted Data:", formData );
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {data.form.fields.map((inputData, index) => {
          // console.log("inputData", inputData);
          return (
            <div key={index}>
              <label>{inputData.label}</label>
              {inputData.html_element === "select" ? (
                <select
                className="form-select"
                  name={inputData.name}
                  required={inputData.required}
                  datatype={inputData.data_type}
                  onChange={handleInputChange}
                >
                  <option value="">Select an option</option>
                  {inputData.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) 
              :  (
                <input
                className="form-input"
                  type={inputData.html_element}
                  name={inputData.name}
                  required={inputData.required}
                  datatype={inputData.data_type}
                  onChange={handleInputChange}
                />
              )}
                {formErrors[inputData.name] && (
              <div className="error-message">{formErrors[inputData.name]}</div>
            )}
            </div>
          );
        })}
        <button className="form-button" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
