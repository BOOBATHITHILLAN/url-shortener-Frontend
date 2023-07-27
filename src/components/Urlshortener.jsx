import React, { useEffect, useState } from "react";
import { Link, json, useNavigate } from "react-router-dom";
import axios from "axios";

function Urlshortener({ url }) {

  
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [Url, setUrl] = useState("");
  const [Click, setClick] = useState(true);
  const [redirect, setRedirect] = useState("");
  const Navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem("loggedInUser");
    const config = { headers: { authorization: JSON.parse(token) } };
    axios.get(`${url}/urlShortener/userdata`, config).then((res) => {
      setData(res.data);
    });
  }, [Click, setClick]);

  const HandleUrlShort = async (e) => {
    e.preventDefault();
    try {
      const token = window.localStorage.getItem("loggedInUser");
      const config = { headers: { authorization: JSON.parse(token)}};
      const res = await axios.post(
        `${url}/urlShortener`,
        {
          title: title,
          longurl: Url,
        },
        config
      );
      Click ? setClick(false) : setClick(true);
      setTitle("");
      setUrl("");
    } catch (err) {
      console.log(err);
    }
  };

  const HandleClick = async (shorturl) => {
    try {
      const token = window.localStorage.getItem("loggedInUser");
      const config = { headers: { authorization: JSON.parse(token) } };
      await axios.post(`${url}/urlShortener/click`, { shorturl }, config);
      Click ? setClick(false) : setClick(true);
    } catch (err) {
      console.error(err);
    }
  };

  const HandleLogout = () => {
    window.localStorage.clear();
    Navigate("/");
  };

  return (
    <>
      <div className="container-fluid bg-dark vh-100 bg-opacity-10">
        <div className="row mb-3">
          <button className="col-11  fw-bold fs-3 bg-primary bg-opacity-50">
            Url Shortener
          </button>
          <button
            className="col-1 bg-danger bg-opacity-75"
            onClick={HandleLogout}
          >
            <i className="fa fa-sign-out" aria-hidden="true">
              <span style={{ fontSize: "0.5vw" }}>Logout</span>
            </i>
          </button>
        </div>

        <form className="text-center mb-3">
          <input
            className="form-control mb-1 "
            type="text"
            id="title"
            placeholder="Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="form-control mb-1"
            type="url"
            placeholder="url link to short"
            required
            value={Url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            className="btn btn-success"
            type="submit"
            onClick={(e)=>HandleUrlShort(e)}
          >
            Url Short
          </button>
        </form>
        <div className="row d-flex justify-content-center text-center">
          {data.length > 0 ? (
            data.map((urldata) => {
              return (
                <div key={urldata._id} className="col-lg-5 m-1 col-sm-12">
                  <div
                    className="card border-success mb-3"
                    style={{ maxWidth: "30 vw" }}
                  >
                    <div className="card-header bg-transparent border-success">
                      Title : {urldata.title}
                    </div>
                    <div className="card-body text-success">
                      <h6 className="card-title text-start ms-1">
                        ShortUrl:
                        <a href={urldata.longurl} target="_Blank">
                          <span onClick={() => HandleClick(urldata.shorturl)}>
                            {urldata.shorturl}
                          </span>
                        </a>
                      </h6>
                      <h6 className="card-title text-start ms-1">
                        CreatedOn :<Link>{urldata.createdon}</Link>
                      </h6>
                    </div>
                    <div className="card-footer bg-transparent border-success">
                      Clicks : {urldata.clicks}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-danger fw-bold mt-5">
              Wait for data / Data Not available
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Urlshortener;
