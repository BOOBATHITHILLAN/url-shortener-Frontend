import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function AccountActivation({ url }) {
  const { id } = useParams();
  const Navigate = useNavigate();

  const [activated, setActivated] = useState(false);
  const [done, setDone] = useState(false);

  const HandleActivate = async (id) => {
    try {
      const res = await axios.patch(`${url}/accountactivation/${id}`);
      setActivated(true);
      setTimeout(() => {
        Navigate("/");
      }, 1000);
    } catch (err) {
      console.error(err);
      setDone(true);
      setTimeout(() => {
        Navigate("/");
      }, 2000);
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div
              className="card  text-center fw-bold"
              style={{ borderRadius: "1rem", height: "10vw", fontSize: "3vw" }}
            >
              <div className="row d-flex justify-content-center align-items-center">
                <div className="col-lg-6 col-sm-12">
                  <Link>
                    <button
                      className="btn btn-primary"
                      onClick={() => HandleActivate(id)}
                    >
                      Click Me to Activate
                    </button>
                  </Link>
                </div>
              </div>

              <p>
                <span>
                  {activated ? "Account Activated Successfully" : null}
                  <span>{done ? "Activated Account" : null}</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AccountActivation;
