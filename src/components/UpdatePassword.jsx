import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";

function UpdatePassword({ url }) {
  const { id } = useParams();
  const [update, setUpdate] = useState(false);
  const Navigate = useNavigate();

  const HandlePasswordReset = async (password) => {
    try{
        const res=axios.patch(`${url}/passwordreset/${id}`, {password: password })
        setUpdate(true);
        setTimeout(() => {
            Navigate('/')
        }, 500);
    }
    catch(err) {
      console.error(err)
    }

  };

  const validate = (values) => {
    const errors = {};
    if (!values.password) {
      errors.password = "*Required";
    }
    if (!values.repassword) {
      errors.repassword = "*Required";
    }
    if (!(values.repassword === values.password)) {
      errors.repassword = "*Password Mismatch";
    }
    return errors;
  };
  const Formik = useFormik({
    initialValues: {
      password: "",
      repassword: "",
    },
    validate,
    onSubmit: (values) => {
      HandlePasswordReset(Formik.values.password);
      Formik.values.password = "";
      Formik.values.repassword = "";
    },
  });

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 "
      style={{ backgroundColor: "#9A616D" }}
    >
      <div className="card" style={{ width: "80vw" }}>
        <div className="card-header h5 text-white bg-primary">
          Password Reset
        </div>
        <div className="card-body px-5">
          <form onSubmit={Formik.handleSubmit}>
            <p className="card-text py-2">Set new password</p>
            <div className="form-outline mt-1">
              <input
                type="password"
                className="form-control my-3"
                id="password"
                placeholder="Reset password"
                value={Formik.values.password}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
              />
              {Formik.touched.password && Formik.errors.password ? (
                <span className="fw-bold" style={{ color: "red" }}>
                  {Formik.errors.password}
                </span>
              ) : null}
            </div>
            <div className="form-outline mt-1">
              <input
                type="password"
                className="form-control my-3"
                id="repassword"
                placeholder="confirm password"
                value={Formik.values.repassword}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
              />
              {Formik.touched.repassword && Formik.errors.repassword ? (
                <span className="fw-bold" style={{ color: "red" }}>
                  {Formik.errors.repassword}
                </span>
              ) : null}
            </div>
            <div className="form-outline text-center mb-1">
              <span className="text-primary">
                {update
                  ? "Password Updated Successfully, Login to check password"
                  : null}
              </span>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-outline-primary w-40">
                Reset Password
              </button>
            </div>
            <div className="text-center mt-4 row">
              <div className="col-lg-6 col-md-12">
                <Link to="/">
                  <button className="btn btn-outline-danger mb-3 me-5">
                    Log in
                  </button>
                </Link>
              </div>
              <div className="col-lg-6 col-md-12">
                <Link to="/Signup">
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

export default UpdatePassword;
