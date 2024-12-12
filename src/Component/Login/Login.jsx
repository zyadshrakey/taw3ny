import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function getUserData(eventInfo) {
    let myUserData = { ...user };
    myUserData[eventInfo.target.name] = eventInfo.target.value;
    setUser(myUserData);
    console.log(myUserData);
  }

  async function sendLoginDataToApi() {
    try {
      let { data } = await axios.post(
        `https://wezaa.runasp.net/Auth/login`,
        user
      );
      console.log(data);
      if (!data.error) {
        localStorage.setItem("userToken", data.token);
        console.log(data.message);
        navigate("/");
        setLoading(false);
      } else {
        setError(data.message);
        setLoading(false);
      }
    } catch (errors) {
      setLoading(false);
      setError(
        errors.response?.data?.message || "An unexpected error occurred."
      );
      console.error("Error:", errors.response?.data);
    }
  }

  function submitLoginData(e) {
    setLoading(true);

    e.preventDefault();

    let validation = validationLoginData();
    console.log(validation);
    if (validation.error) {
      console.log(validation.error.details);
    } else if (user.password !== user.confirmPassword) {
      alert("Passwords do not match. Please check your entries.");
      return;
    } else if (!user.hasAcceptedTerms) {
      alert("You must accept the terms and conditions to proceed.");
      return;
    }
    sendLoginDataToApi();
  }

  function validationLoginData() {
    let scheme = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string()
        .pattern(/^[A-Z][a-z]{3,6}$/)
        .required(),
    });
    return scheme.validate(user, { abortEarly: false });
  }

  return (
    <>
      <div className="d-flex w-100 flex-md-row flex-column justify-content-between">
        <div
          className="flex-column p-4 w-50"
          style={{ textAlign: "center", margin: "auto" }}
        >
          {error.length > 0 ? (
            <div className="alert alert-danger my-2">{error}</div>
          ) : (
            ""
          )}

          <p
            className="h1"
            style={{
              fontSize: "32px",
              fontWeight: "500",
              lineHeight: "38.73px",
              marginBottom: "32px",
            }}
          >
            <span>!نحن هنا لنساعدك</span>
            <br />
            <span> .سجّل دخولك و ابدأ رحلتك</span>
          </p>

          <form onSubmit={submitLoginData} className="w-75 m-auto">
            <div className="input-contaier position-relative">
              <i
                className="far fa-envelope"
                style={{ position: "absolute", right: "20px", bottom: "15px" }}
              ></i>
              <input
                type="email"
                onChange={getUserData}
                name="email"
                placeholder="البريد الإلكترونى"
                className="w-100"
                style={{
                  paddingRight: "40px",
                  border: "1px solid #777777",
                  height: "48px",
                  width: "503px",
                  borderRadius: "16px",
                }}
                dir="rtl"
              />
            </div>
            <div className="input-contaier position-relative py-2">
              <i
                className="fas fa-key"
                style={{ position: "absolute", right: "20px", bottom: "25px" }}
              ></i>
              <input
                type="password"
                onChange={getUserData}
                name="password"
                placeholder="كلمة المرور"
                className="w-100"
                style={{
                  paddingRight: "40px",
                  border: "1px solid #777777",
                  height: "48px",
                  width: "503px",
                  borderRadius: "16px",
                }}
                dir="rtl"
              />
            </div>
            <button
              className="btn w-100 mt-2"
              style={{
                backgroundColor: "#214D97",
                color: "white",
                borderRadius: "24px",
                height: "48px",
              }}
            >
              {loading === true ? (
                <i className="fas fa-spinner fs-spin"></i>
              ) : (
                " تسجيل الدخولِ"
              )}
            </button>
          </form>
          <Link
            to="/reset-password"
            className="pt-2"
            style={{ textDecoration: "none", color: "black" }}
          >
            <p style={{ textAlign: "left" }}>هل نسيت كلمة المرور؟</p>
          </Link>

          <div className="line-text w-75 m-auto">
            <p>أو قم بتسجيل الدخول بواسطة</p>
          </div>
          <div
            className="p-3 d-flex flex-md-row flex-cloumn align-items-center justify-content-center"
            style={{ gap: "16px" }}
          >
            <div>
              <img alt="facebook-icon" src={"/facebook.png"} width={"35px"} />
            </div>
            <div>
              <img alt="google-icon" src={"/google.png"} width={"35px"} />
            </div>
            <div>
              <img alt="twitter-icon" src={"/twitter.png"} width={"35px"} />
            </div>
          </div>
          <p className="w-100 mt-2" dir="rtl">
            ليس لديك حساب؟
            <Link to="/" style={{ textDecoration: "none", color: "#214D97" }}>
              اضغط لانشاء حساب.
            </Link>
          </p>
        </div>
        <div className="login-img">
          {/* <img src={`/login.jpeg`} alt="login" style={{height:'100vh', width:'550px'}} /> */}
        </div>
      </div>
    </>
  );
}

export default Login;
