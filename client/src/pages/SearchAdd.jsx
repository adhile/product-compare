import React from "react";
import "../css/SearchAdd.css";
import { useState } from "react";
import { useFormik } from "formik";
import SearchResult from "./SearchResult";

export default function () {
  const [apiResponse, setApiResponse] = useState([]);

  //initial value for searching keyword
  const initialValues = {
    keyword: "",
  };
  //ftech api to fetch response from server
  const onSubmit = async (values) => {
    const response = await fetch("http://localhost:3000/api/search", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keyword: values.keyword,
      }),
    });
    const data = await response.json();
    console.log(data);
    setApiResponse(data);
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  let cardElements = apiResponse.map((item) => {
    return <SearchResult key={item._id} data={item} />;
  });
  return (
    <div className="search-section">
      <h1 className="search-title">Search Product</h1>
      <form className="search-product">
        <input
          type="text"
          name="keyword"
          placeholder="Search"
          className="search--bar"
          onChange={formik.handleChange}
          value={formik.values.keyword}
        />
        <button
          type="submit"
          className="search--button btn btn-primary"
          onClick={formik.handleSubmit}
        >
          Search
        </button>
      </form>
      <div className="card--element">{cardElements}</div>
    </div>
  );
}
