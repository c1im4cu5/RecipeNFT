import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function RowContainers() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 mb-3">
          <Link
            to="/login"
            className="link d-flex flex-column justify-content-center align-items-center p-3 h-100 rounded"
            style={{
              backgroundImage:
                "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
            }}
          >
            <h2>Web3 Enabled Login</h2>
            <p>No Registration Required!</p>
          </Link>
        </div>
        <div className="col-md-4 mb-3">
          <Link
            to="/vision"
            className="link d-flex flex-column justify-content-center align-items-center p-3 h-100 rounded"
            style={{
              backgroundImage:
                "linear-gradient(to right, #43c6ac 0%, #f8ffae 100%)",
            }}
          >
            <h2>Vision</h2>
            <p>
              Learn about our hopes for permanent, secure ownership and storage
              for generations of friends and families.
            </p>
          </Link>
        </div>
        <div className="col-md-4 mb-3">
          <Link
            to="/search"
            className="link d-flex flex-column justify-content-center align-items-center p-3 h-100 rounded"
            style={{
              backgroundImage:
                "linear-gradient(to right, #ee9ca7 0%, #ffdde1 100%)",
            }}
          >
            <h2>Search</h2>
            <p>Find an recipe, learn about a culture!</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RowContainers;
