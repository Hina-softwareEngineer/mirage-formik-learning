import React from "react";
import { Formik, Form, useFormik } from "formik";
import * as Yup from "yup";

export default function FormData() {
  const formik = useFormik({
    initialValues: { name: "", age: 0 },
    onSubmit: (values) => {
      console.log(values);
    },
    validate: (values) => {
      const error = {};
      if (!values.name) {
        error.name = "Name field must be required.";
      } else if (values.name.length > 20) {
        error.name = "Name field must be greateer than 20.";
      }
      return error;
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name field is required.")
        .max(15, "Name field should be less than 15 character"),
      age: Yup.number()
        .max(60, "Age shourld be less than 60")
        .min(10, "Age should be greater than 10"),
    }),
  });
  return (
    <div>
      <h1>Hina</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Name</label>
          <input
            id="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </div>
        <div>{formik.errors.name}</div>

        <div>
          <label>Age</label>
          <input
            id="age"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.age}
          />
        </div>
        <div>{formik.errors.age}</div>
        <button type="submit">Submit form</button>
      </form>
    </div>
  );
}
