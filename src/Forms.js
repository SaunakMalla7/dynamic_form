// import React, { useEffect, useState } from "react";
// import "./App.css";


// // Define your API endpoint here
// const apiEndpoint = "http://localhost:5000/data";

// const data = {
//   form: {
//     fields: [
//       {
//         name: "name",
//         label: "Name",
//         required: true,
//         data_type: "String",
//         html_element: "text",
//         minLength: 5,
//         maxLength: 30,
//         defaultValue: "John",
//       },
//       {
//         name: "email",
//         label: "Email",
//         required: true,
//         data_type: "String",
//         html_element: "email",
//       },
//       {
//         name: "age",
//         label: "Age",
//         required: true,
//         data_type: "Integer",
//         html_element: "number",
//         minLength: 18,
//         maxLength: 100,
//       },
//       {
//         name: "number",
//         label: "Number",
//         required: true,
//         data_type: "Integer",
//         html_element: "number",
//       },

//       {
//         name: "role",
//         label: "Role",
//         required: true,
//         data_type: "String",
//         html_element: "select",
//         options: [
//           { label: "Admin", value: "admin" },
//           { label: "User", value: "user" },
//         ],
//       },
//       {
//         name: "Condition",
//         label: "Do You Accept All The Condition",
//         required: false,
//         data_type: "Boolean",
//         html_element: "checkbox",
//       },
//     ],
//   },
// };

// function Forms() {
//   const [formData, setFormData] = useState({});
//   const [formErrors, setFormErrors] = useState({});

//   useEffect(() => {
//     // Fetch data from the API
//     fetch(apiEndpoint)
//       .then((response) => response.json())
//       .then((apiData) => {
//         const defaultData = {};

//         data.form.fields.forEach((field) => {
//           defaultData[field.name] = apiData[field.name] || field.defaultValue || "";
//         });

//         setFormData(defaultData);
//       })
//       .catch((error) => {
//         console.error("Error fetching data from API:", error);
//       });
//   }, []);



//   const handleInputChange = (event) => {
//     const { name, value, type, checked } = event.target;
//     const fieldValue = type === "checkbox" ? checked : value;

//     setFormData((prevData) => ({ ...prevData, [name]: fieldValue }));
//   };

//   const handleBlur = (fieldName, value) => {
//     validateField(fieldName, value);
//   };

//   const validateField = (fieldName, value) => {
//     const errors = { ...formErrors };
//     const inputData = data.form.fields.find((field) => field.name === fieldName);

//     if (inputData) {
//       if (inputData.required && !value) {
//         errors[inputData.name] = `${inputData.label} is required`;
//       } else {
//         errors[inputData.name] = undefined;
//       }

//       if (inputData.data_type === "Integer") { // Adjusted property name
//         const numValue = parseInt(value, 10);
//         if (isNaN(numValue)) {
//           errors[inputData.name] = `${inputData.label} must be a valid number`;
//         } else if (numValue < inputData.minLength) { // Use inputData.minLength
//           errors[inputData.name] = `${inputData.label} should be at least ${inputData.minLength}`;
//         } else if (numValue > inputData.maxLength) { // Use inputData.maxLength
//           errors[inputData.name] = `${inputData.label} should not exceed ${inputData.maxLength}`;
//         }
//       }

//       if (inputData.data_type === "String") { // Adjusted property name
//         if (value.length < inputData.minLength || value.length > inputData.maxLength) {
//           errors[inputData.name] = `${inputData.label} must be between ${inputData.minLength} and ${inputData.maxLength} characters`;
//         }
//       }
//     }

//     setFormErrors(errors);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const ageValue = parseInt(formData.age, 10);
//     const nameValue = formData.name;

//     if (validateForm() && ageValue >= 18 && ageValue <= 100 && nameValue.length >= 5 && nameValue.length <= 30) {
//       console.log("Submitted Data:", formData);
//     } else {
//       console.log("Form contains errors ");
//     }
//   };

//   const validateForm = () => {
//     const errors = {};

//     data.form.fields.forEach((inputData) => {
//       const value = formData[inputData.name];
//       validateField(inputData.name, value);
//       if (errors[inputData.name]) {
//         return false;
//       }
//     });
//     return true;
//   };

//   return (
//     <div className="form-container">
//       <form onSubmit={handleSubmit}>
//         {data.form.fields.map((inputData, index) => (
//           <div key={index}>
//             <label>{inputData.label}</label>
//             {inputData.html_element === "select" ? (
//               <select
//                 className="form-select"
//                 name={inputData.name}
//                 required={inputData.required}
//                 data-type={inputData.data_type} 
//                 value={formData[inputData.name]} 
//                 onChange={handleInputChange}
//                 onBlur={(e) => handleBlur(inputData.name, e.target.value)}
//               >
//                 <option value="">Select an option</option>
//                 {inputData.options.map((option, optionIndex) => (
//                   <option key={optionIndex} value={option.value}>
//                     {option.label}
//                   </option>
//                 ))}
//               </select>
//             ) : (
//               <input
//                 className="form-input"
//                 type={inputData.html_element}
//                 name={inputData.name}
//                 required={inputData.required}
//                 data-type={inputData.data_type} 
//                 value={formData[inputData.name]} 
//                 onChange={handleInputChange}
//                 onBlur={(e) => handleBlur(inputData.name, e.target.value)}
//               />
//             )}
//             {formErrors[inputData.name] && (
//               <div className="error-message">{formErrors[inputData.name]}</div>
//             )}
//           </div>
//         ))}
//         <button className="form-button" type="submit">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Forms;
