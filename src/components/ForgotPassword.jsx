import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";

function ForgotPassword({url}) {
  const [emailavailable, setEmailavailable] = useState(false);
  const [mail, setMail] = useState(false);

  const Navigate = useNavigate();

  const HandleForgotMail = async (email) => {
    try {
      const res = await axios.put(`${url}/forgotPassword`, {email });
      setEmailavailable(false);
      setMail(true);
      setTimeout(() => {
        Navigate("/");
      }, 1500);
    } catch (error) {      
      setEmailavailable(true)
      setMail(false)
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "*Required";
    }
    return errors;
  };

  const Formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: (values) => {
      HandleForgotMail(Formik.values.email);
      Formik.values.email = "";
    },
  });

  return (
    <div
      className="d-flex justify-content-center align-items-center  passwordreset vh-100 "
      style={{ backgroundColor: "#9A616D" }}
    >
      <div className="card" style={{ width: "80vw" }}>
        <div className="card-header h5 text-white bg-primary">
          Password Reset
        </div>
        <div className="card-body px-5">
          <form onSubmit={Formik.handleSubmit}>
            <p className="card-text py-2">
              Enter your email address and we'll send you an email with
              instructions to reset your password.
            </p>
            <div className="form-outline">
              <input
                type="email"
                id="email"
                className="form-control my-3"
                placeholder="Enter registered email address"
                value={Formik.values.email}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
              />
              {Formik.touched.email && Formik.errors.email ? (
                <span className="fw-bold" style={{ color: "red" }}>
                  {Formik.errors.email}
                </span>
              ) : null}
            </div>
            <div className="form-outline text-center mb-1">
              <span className="text-danger">
                {emailavailable ? "User not found,Wrong mail id" : null}
              </span>{" "}
              <br />
              <span className="text-primary">
                {mail
                  ? "Password reset link send to your mail id, Successfully"
                  : null}
              </span>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-outline-primary w-40">
                Reset Password
              </button>
            </div>
            <div className="d-flex justify-content-center mt-4 row">
              <div className="col-lg-6 col-md-12 text-center">
                <Link to="/">
                  <button className="btn btn-outline-danger mb-3 me-5 md-col-12">
                    Log in
                  </button>
                </Link>
              </div>
              <div className="col-lg-6 col-md-12 text-center">
                <Link to="/UrlShortener/Signup">
                  <button
                    type="button"
                    className="btn btn-outline-danger mb-3 me-5"
                  >
                    Register
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
