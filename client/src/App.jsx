import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Insert from "./pages/InsertProduct";
import Compare from "./pages/CompareProduct";
import SearchAdd from "./pages/SearchAdd";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

export default function () {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/compare" exact element={<Compare />} />
            <Route path="/insert" element={<Insert />} />
            <Route path="/search" element={<SearchAdd/> } />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
