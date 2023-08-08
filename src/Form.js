import React from "react";

const data = {
  form: {
    fields: [
      {
        name: "name",
        label: "Name",
        required: true,
        data_type: "Integer",
        html_element: "textbox",
      },
      {
        name: "email",
        label: "Email",
        hidden: false,
        required: true,
        data_type: "String",
        html_element: "email",
      },
    ],
  },
};

function Form() {
  return (
    <div>
      <form>
        {data.form.fields.map((inputData, index) => {
          console.log("inputData", inputData);
          return (
            <div key={index}>
              <label>{inputData.label}</label>
              <input
                type={inputData.html_element}
                name={inputData.name}
                required={inputData.required}
                datatype={inputData.data_type}
              />
            </div>
          );
        })}
      </form>
    </div>
  );
}

export default Form;
