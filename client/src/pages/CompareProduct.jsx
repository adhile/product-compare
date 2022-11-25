import React, { useState, useCallback } from "react";
import Result from "./Result";
import "../css/CompareProduct.css";
import { useFormik } from "formik";

//state to handle api response after form submission
export default function () {
  const [apiResponse, setApiResponse] = useState([]);

  //initial value setting for two product id's

  const initialValues = {
    proId1: "",
    proId2: "",
  };
  //fetch response from server based on request payload by form submission
  const onSubmit = async (values) => {
    console.log(values);
    const response = await fetch("http://localhost:3000/api/compare", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        proId1: values.proId1,
        proId2: values.proId2,
      }),
    });
    const data = await response.json();
    if (data == false) {
      alert("data not found");
    } else if (data != false) {
      setApiResponse(data);
    }
  };
  //validate the form fields
  const validate = (values) => {
    let errors = {};
    if (values.proId1 == "") {
      errors.proId1 = "Please enter a valid product Id.";
    } else if (values.proId1.length != 6) {
      errors.proId1 = "Must be 6 characters length.";
    }
    if (values.proId2 == "") {
      errors.proId2 = "Please enter a valid product Id.";
    } else if (values.proId2.length != 6) {
      errors.proId2 = "Must be 6 characters length.";
    }

    return errors;
  };
  //formik handles the form submission, validation & maintain values state
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  let cardElements = apiResponse.map((item) => {
    return <Result key={item.id} data={item} />;
  });

  return (
    <>
      <div>
        <div className="comapre-card">
          <h1 className="compare--title">Compare Products</h1>
          <form className="compare--form">
            <div className="form---items form-group">
              <input
                type="text"
                className="proId1 form-control"
                placeholder="Enter first product Id"
                name="proId1"
                onChange={formik.handleChange}
                value={formik.values.proId1}
                onBlur={formik.handleBlur}
              />
              {formik.errors.proId1 && formik.touched.proId1 ? (
                <small className="error--message">{formik.errors.proId1}</small>
              ) : null}
            </div>
            <div className="form---items form-group">
              <input
                type="text"
                className="proId2 form-control"
                placeholder="Enter second product Id"
                name="proId2"
                onChange={formik.handleChange}
                value={formik.values.proId2}
                onBlur={formik.handleBlur}
              />
              {formik.errors.proId2 && formik.touched.proId2 ? (
                <small className="error--message">{formik.errors.proId2}</small>
              ) : null}
            </div>

            <button
              type="submit"
              className="submitC btn btn-primary"
              onClick={formik.handleSubmit}
            >
              Compare
            </button>
          </form>
        </div>
        <div className="card--element">{cardElements}</div>
      </div>
    </>
  );
}
