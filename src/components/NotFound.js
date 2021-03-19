import React from "react";
import notFoundImg from "../assets/movie-not-found.svg";

const NotFound = () => {
  return (
    <div className="image">
      <h1>Movie not found...</h1>
      <img src={notFoundImg} alt="" />
    </div>
  );
};

export default NotFound;
