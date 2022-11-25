import React, { useState } from "react";
import "../css/InsertProduct.css";
import { Form, useFormik } from "formik";
//star rating library
import { Rating } from "react-simple-star-rating";

export default function () {
  //state setting for 'star' rating
  const [rating, setRating] = useState(1);

  //formik initial value setting
  const initialValues = {
    id: "",
    name: "",
    price: "",
    ratings: rating,
  };

  React.useEffect(() => {
    formik.setFieldValue("ratings", rating);
  }, [rating]);

  //function to set New value for rating state
  const handleRating = (number) => {
    setRating(number);
  };
  //function to fetch api response based on the given payload from the server by form submission
  const onSubmit = async (values) => {
    console.log(rating);
    const response = await fetch("http://localhost:3000/api/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: values.id,
        name: values.name,
        price: values.price,
        ratings: values.ratings,
      }),
    });
    const data = await response.json();
    if (data) {
      console.log(data);
      alert("Your Product Added");
    } else if (!data) {
      console.log(data);
      alert("sorry,product Id already Exist.Please enter a valid product Id");
    }
  };
  //validate form fields
  const validate = (values) => {
    let errors = {};

    if (values.id === "") {
      errors.id = "Please enter a valid product Id.";
    } else if (values.id.length != 6) {
      console.log("id lenght", values.id.length);
      errors.id = "Please enter  6 characters.";
    }

    if (values.name === "") {
      errors.name = "Please enter the product name.";
    }
    if (!values.price.match(/^[+-]?([0-9]*[.])?[0-9]+$/)) {
      errors.price = "Please enter the product price.";
    }
    if (values.price.match(/^[A-Za-z]+$/)) {
      errors.price = "Please enter digits";
    }

    return errors;
  };
  //formik handles setting initial values,form submission and form validation
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <div>
      <div className="card">
        <h1 className="card-title">Add Product</h1>
        <form className="card-form " onSubmit={formik.handleSubmit}>
          <div className="form--items form-group">
            <input
              type="text"
              className="id form-control"
              placeholder="Enter Product ID"
              name="id"
              onChange={formik.handleChange}
              value={formik.values.id}
              onBlur={formik.handleBlur}
              required
            />
            {formik.errors.id && formik.touched.id ? (
              <small className="error--message ">{formik.errors.id}</small>
            ) : null}
          </div>
          <div className="form--items form-group">
            <input
              type="text"
              className="name form-control"
              placeholder="Enter Product Name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              required
            />
            {formik.errors.name && formik.touched.name ? (
              <small className="error--message ">{formik.errors.name}</small>
            ) : null}
          </div>
          <div className="form--items form-group">
            <input
              type="text"
              className="price  form-control "
              placeholder="Enter Price"
              name="price"
              onChange={formik.handleChange}
              value={formik.values.price}
              onBlur={formik.handleBlur}
              required
            />
            {formik.errors.price && formik.touched.price ? (
              <small className="error--message ">{formik.errors.price}</small>
            ) : null}
          </div>
          <div className="card--rating">
            <Rating
              id="#card--rating"
              onClick={handleRating}
              initialValue={initialValues.ratings}
              size={27}
            />
          </div>

          <button type="submit" className="submit btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
