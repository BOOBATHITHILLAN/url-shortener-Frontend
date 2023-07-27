import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AccountActivation from "./components/AccountActivation";
import ForgotPassword from "./components/ForgotPassword";
import UpdatePassword from "./components/UpdatePassword";
import Urlshortener from "./components/Urlshortener";

function App() {
  const url = "https://url-short-be.onrender.com";
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login url={url} />}></Route>
          <Route path='/UrlShortener/Signup' element={<Signup url={url}/>} ></Route>
          <Route path="/UrlShortener/account_activation/:id" element={<AccountActivation url={url} />} ></Route>
          <Route path="/UrlShortener/forgotPassword" element={<ForgotPassword url={url}/>}></Route>
          <Route path="/UrlShortener/UpdatePassword/:id" element={<UpdatePassword url={url}/>}></Route>
          <Route path="/UrlShortener" element={<Urlshortener url={url} />}></Route>
                    
        </Routes>
      </Router>
    </>
  );
}

export default App;
