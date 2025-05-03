import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo.png";



const Navbar = () => {
  function handleLogout() {
    localStorage.clear();
    window.location.reload();
  }
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white shadow-sm"
      style={{
        borderBottom: "1px solid rgba(33, 77, 151, 1)",
        borderRadius: "0 0 10px 20px",
        height: "80px",
      }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Logo" className="p-4" style={{ width: "90%" }} />
        </Link>

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
            
          <li style={{fontWeight:'400', fontSize:'18px'}} className="nav-item">
              <Link className="nav-link" to="/attentancerecord">
                سجل الحضور
              </Link>
            </li>
            <li style={{fontWeight:'400', fontSize:'18px'}} className="nav-item">
              <Link className="nav-link" to="/opportunities">
                فرص التطوع
              </Link>
            </li>
            <li style={{fontWeight:'400', fontSize:'18px'}} className="nav-item">
              <Link className="nav-link" to="/Volunteer">
                المتطوعين
              </Link>
            </li>
            <li style={{fontWeight:'400', fontSize:'18px'}} className="nav-item">
              <Link className="nav-link" to="/requestes">
                طلبات التطوع
              </Link>
            </li>
            <li style={{fontWeight:'400', fontSize:'18px'}} className="nav-item">
              <Link className="nav-link" to="/profile">
                ملف المؤسسة
              </Link>
            </li>
          </ul>

          <button
            className="btn fw-bold"
            style={{
              padding: "0 20px",
              height: "40px",
              backgroundColor: "#214D97",
              color: "#fff",
              borderRadius:'8px'
            }}
            onClick={handleLogout}
          >
            تسجيل خروج
          </button>
        </div>
      </div>
    </nav>


  );
};

export default Navbar;
