const Schema = {
    form: {
      fields: [
        {
          name: "name",
          label: "Name",
          required: true,
          data_type: "String",
          html_element: "text",
          minLength: 5,
          maxLength: 30,
          defaultValue: "John",
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
          minLength: 18,
          maxLength: 100,
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
  
  export default Schema;
  