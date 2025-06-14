import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Loader from "../Loader/Loader";
import { FaQrcode, FaArrowLeft, FaSearch, FaTimes } from "react-icons/fa";

function AttendanceRecord() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  let [attentance, setAttentance] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let [error, setError] = useState(null);
  let [searchItem, setSearchItem] = useState("");
  let token = localStorage.getItem("userToken");
  let [qrCode, setQrCode] = useState(null);

  const handleGoBack = () => {
    navigate(-1);
  };

  async function getAttentance() {
    setIsLoading(true);
    let response = await axios.get("https://wezaa.runasp.net/Attendance/charity?page=1&pageSize=10", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.attendances);
        setAttentance(response.data.attendances);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to show Volunteer Data"
        );
        setIsLoading(false);
      });
  }

  const filteredVolunteers = attentance.filter((item) =>
    item.volunteerName?.toLowerCase().includes(searchItem.toLowerCase())
  );

  async function generatQr() {
    setIsLoading(true);
    try {
      let response = await axios.get(
        "https://wezaa.runasp.net/Attendance/qrcode",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      console.log(response.data);
      // setQrCode(response.data)

      const imageUrl = URL.createObjectURL(response.data);
      setQrCode(imageUrl);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAttentance();
  }, []);

  return (
    <>
      <div style={{ minHeight: "100vh", background: "#f4f7fb" }}>
        {/* Header */}
        <div
          className="d-flex flex-row align-items-center justify-content-between px-4 py-3"
          style={{
            background: "#fff",
            borderBottom: "1px solid #e5e7eb",
            boxShadow: "0 2px 8px rgba(33,77,151,0.04)",
            position: "sticky",
            top: 0,
            zIndex: 10,
            borderRadius: "0 0 18px 18px"
          }}
        >
          <button
            className="d-flex align-items-center gap-2"
            style={{
              backgroundColor: "#fff",
              color: "#214D97",
              border: "1px solid #214D97",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "1rem",
              padding: "8px 18px",
              transition: "background 0.2s, color 0.2s",
            }}
            onClick={handleGoBack}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = "#214D97";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = "#fff";
              e.currentTarget.style.color = "#214D97";
            }}
          >
            <FaArrowLeft className="ms-2" /> رجوع
          </button>
          <h1 style={{ color: "#214D97", fontWeight: "bold", margin: 0, fontSize: "1.5rem" }}>
            سجل الحضور
          </h1>
          <button
            className="d-flex align-items-center gap-2"
            style={{
              backgroundColor: "#fff",
              color: "#214D97",
              border: "1px solid #214D97",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "1rem",
              padding: "8px 18px",
              transition: "background 0.2s, color 0.2s",
            }}
            onClick={handleShow}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = "#214D97";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = "#fff";
              e.currentTarget.style.color = "#214D97";
            }}
          >
            <FaQrcode className="ms-2" /> QR Code
          </button>
        </div>

        {/* QR Modal */}
        <Modal show={show} onHide={handleClose} centered>
          <div className="d-flex justify-content-end">
            <button
              className="px-3 py-2"
              style={{
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                backgroundColor: "#e74c3c",
                fontSize: "1.2rem",
                margin: "10px",
                boxShadow: "0 2px 8px rgba(231,76,60,0.12)",
              }}
              onClick={handleClose}
            >
              <FaTimes />
            </button>
          </div>
          <div className="d-flex flex-column align-items-center h-100 p-3">
            <button
              className="py-2 px-4 mb-3"
              style={{
                backgroundColor: "#214D97",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                fontSize: "1rem",
                transition: "background 0.2s",
              }}
              onClick={generatQr}
              disabled={isLoading}
            >
              إنشاء رمز الاستجابة السريعة
            </button>
            {isLoading && (
              <div className="mt-4 d-flex justify-content-center align-items-center" style={{ height: "100px" }}>
                <Loader />
              </div>
            )}
            {qrCode && !isLoading && (
              <div className="mt-4 p-2 d-flex justify-content-center">
                <img
                  src={qrCode}
                  alt="QR Code"
                  style={{ width: "220px", height: "220px", borderRadius: "12px", border: "1px solid #eee" }}
                />
              </div>
            )}
          </div>
        </Modal>

        {/* Table */}
        <div className="container py-4">
          {/* Search Input */}
          <div className="d-flex justify-content-end mb-3 position-relative">
            <input
              className="form-control"
              style={{
                maxWidth: "350px",
                borderRadius: "24px",
                paddingRight: "38px",
                background: "#fff",
                border: "1px solid #d1d5db",
                boxShadow: "0 2px 8px rgba(33,77,151,0.03)",
                fontSize: "1rem",
              }}
              type="text"
              placeholder="ابحث بالاسم"
              dir="rtl"
              value={searchItem}
              onChange={e => setSearchItem(e.target.value)}
            />
            <FaSearch
              style={{
                color: "#9ca3af",
                position: "absolute",
                right: "18px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
                fontSize: "1.1rem",
              }}
            />
          </div>
          <div className="card shadow-sm rounded-4 p-3" style={{ background: "#fff", border: "none" }}>
            {searchItem && searchItem.length > 0 ? (
              <>
                <h5 dir="rtl" className="mb-3" style={{ color: "#214D97", fontWeight: "bold" }}>
                  نتائج البحث :
                </h5>
                {filteredVolunteers.length > 0 ? (
                  <div style={{ overflowX: "auto" }}>
                    <table dir="rtl" className="table table-hover table-borderless" style={{ minWidth: 600 }}>
                      <thead>
                        <tr className="text-center" style={{ background: "#f4f7fb" }}>
                          <th>الاسم</th>
                          <th>وقت الحضور</th>
                          <th>وقت الانصراف</th>
                          <th>مدة التواجد</th>
                          <th>الحالة</th>
                        </tr>
                      </thead>
                      <tbody>
                        {isLoading ? (
                          <tr>
                            <td colSpan="5" className="text-center py-3">
                              <Loader />
                            </td>
                          </tr>
                        ) : (
                          filteredVolunteers.map((item, index) => (
                            <tr className="py-2 text-center" key={item.id || index} style={{ borderBottom: "1px solid #f0f0f0" }}>
                              <td>{item.volunteerName || <span className="text-danger">N/A</span>}</td>
                              <td>{item.checkInTime || <span className="text-danger">N/A</span>}</td>
                              <td>{item.checkOutTime || <span className="text-danger">N/A</span>}</td>
                              <td>{item.duration || <span className="text-danger">N/A</span>}</td>
                              <td>
                                {item.status
                                  ? item.status === "Active"
                                    ? <span className="badge bg-success">متواجد</span>
                                    : <span className="badge bg-secondary">غير متواجد</span>
                                  : <span className="text-danger">N/A</span>}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-danger text-center">لا توجد نتائج مطابقة</p>
                )}
              </>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table dir="rtl" className="table table-hover table-borderless" style={{ minWidth: 600 }}>
                  <thead>
                    <tr className="text-center" style={{ background: "#f4f7fb" }}>
                      <th>الاسم</th>
                      <th>وقت الحضور</th>
                      <th>وقت الانصراف</th>
                      <th>مدة التواجد</th>
                      <th>الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan="5" className="text-center py-3">
                          <Loader />
                        </td>
                      </tr>
                    ) : (
                      attentance &&
                      attentance.map((item, index) => (
                        <tr className="py-2 text-center" key={item.id || index} style={{ borderBottom: "1px solid #f0f0f0" }}>
                          <td>{item.volunteerName || <span className="text-danger">N/A</span>}</td>
                          <td>{item.checkInTime || <span className="text-danger">N/A</span>}</td>
                          <td>{item.checkOutTime || <span className="text-danger">N/A</span>}</td>
                          <td>{item.duration || <span className="text-danger">N/A</span>}</td>
                          <td>
                            {item.status
                              ? item.status === "Active"
                                ? <span className="badge bg-success">متواجد</span>
                                : <span className="badge bg-secondary">غير متواجد</span>
                              : <span className="text-danger">N/A</span>}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        <style>
          {`
            .table tbody tr {
              transition: background 0.22s cubic-bezier(0.4,0,0.2,1), transform 0.22s cubic-bezier(0.4,0,0.2,1);
              cursor: pointer;
            }
            .table tbody tr:hover {
              background: #eaf1fb !important;
              transform: scale(1.01);
              box-shadow: 0 2px 12px rgba(33,77,151,0.06);
            }
            .table th {
              background: #f4f7fb !important;
              color: #214D97 !important;
              font-weight: bold;
              border-bottom: 2px solid #e5e7eb !important;
            }
          `}
        </style>
      </div>
    </>
  );
}

export default AttendanceRecord;
