import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo.png";
import hiImg from "../../assets/groundhog.png";
import { Modal } from "antd";

const Navbar = () => {
  function handleLogout() {
    Modal.confirm({
      title: "تسجيل الخروج",
      content: "هل أنت متأكد من تسجيل الخروج؟",
      okText: "نعم",
      okType: "danger",
      cancelText: "لا",
      onOk: () => {
        localStorage.clear();
        window.location.reload();
      },
    });
  }
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white shadow-sm"
      style={{
        borderBottom: "1px solid rgba(33, 77, 151, 1)",
        borderRadius: "0 0 10px 20px",
      }}
    >
      <div className="container-fluid">
        <button
          className="btn btn-outline-danger fw-bold"
          onClick={handleLogout}
        >
          تسجيل خروج
        </button>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 fs-5 fw-bold">
            <li
              style={{ fontWeight: "400", fontSize: "18px" }}
              className="nav-item"
            >
              <Link className="nav-link" to="/attentancerecord">
                سجل الحضور
              </Link>
            </li>
            <li
              style={{ fontWeight: "400", fontSize: "18px" }}
              className="nav-item"
            >
              <Link className="nav-link" to="/opportunities">
                فرص التطوع
              </Link>
            </li>
            <li
              style={{ fontWeight: "400", fontSize: "18px" }}
              className="nav-item"
            >
              <Link className="nav-link" to="/Volunteer">
                المتطوعين
              </Link>
            </li>
            <li
              style={{ fontWeight: "400", fontSize: "18px" }}
              className="nav-item"
            >
              <Link className="nav-link" to="/requestes">
                طلبات التطوع
              </Link>
            </li>
            <li
              style={{ fontWeight: "400", fontSize: "18px" }}
              className="nav-item"
            >
              <Link className="nav-link" to="/">
                ملف المؤسسة
              </Link>
            </li>
          </ul>

          <div className="hiImg d-flex align-items-center">
            <img
              src={hiImg}
              className=" pb-2 mx-2"
              style={{ width: "50px" }}
              alt=""
            />
          </div>
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src={logo}
              alt="Logo"
              className="px-4"
              style={{ width: "90%" }}
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
