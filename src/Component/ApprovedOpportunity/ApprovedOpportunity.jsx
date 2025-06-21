import React, { useState, useEffect, useCallback } from "react";
import avatar from "../../assets/volunteer-services-bureau logo@2x.png";
import Loader from "../Loader/Loader";
import { message, Modal , Pagination} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FaQrcode, FaArrowLeft, FaSearch, FaTimes } from "react-icons/fa";
import axios from "axios";
import avatar2 from "../../assets/avatar2.jpg"
// import { useFormik } from "formik";
// import toast from "react-hot-toast";

function ApprovedOpportunity() {
  const [approvedData, setApprovedData] = useState([]);
  const [openApprove, setOpenApprove] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [approve, setApprove] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [modalAlt, setModalAlt] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8); // or any default
  const [totalCount, setTotalCount] = useState(0);
  const userToken = localStorage.getItem('userToken')
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  const approvedOpportunity = async (page = 1, size = 8) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://wezaa.runasp.net/VolunteerApplications?status=Approved&PageIndex=${page}&PageSize=${size}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setApprovedData(response.data.data);
      setTotalCount(response.data.totalCount || response.data.total || 0); // adjust according to your API

      console.log("Approved Opportunities:", response.data.data);
    } catch (error) {
      console.error("Error fetching approved opportunities:", error);
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
      approvedOpportunity(currentPage, pageSize);
    }, [currentPage, pageSize]);

    const handlePageChange = (page, size) => {
      setCurrentPage(page);
      setPageSize(size);
    };

  const handleApprove = async (id, rate) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `https://wezaa.runasp.net/VolunteerApplications/rate/${id}?rating=${rate}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      console.log(response);
      

      // Update the rated request in approvedData
      setApprovedData((prev) =>
        prev.map((item) => (item.id === id ? { ...item, rate } : item))
      );
      setOpenApprove(false);
      setSelectedRequest(null);
      message.success("تم التقييم بنجاح");
    } catch (error) {
      console.error("Error fetching approved opportunities:", error);
      message.error("حدث خطأ ما ,اعد الحاوله مره اخرى");
    } finally {
      setLoading(false);
    }
  };

  // Save to localStorage whenever approvedData changes
  useEffect(() => {
    if (approvedData.length > 0) {
      localStorage.setItem("approvedData", JSON.stringify(approvedData));
    }
  }, [approvedData]);

  // On mount, load from localStorage if available
  useEffect(() => {
    const local = localStorage.getItem("approvedData");
    if (local) {
      setApprovedData(JSON.parse(local));
    } else {
      approvedOpportunity();
    }
  }, []);

  return (
    <div
      className="container py-4"
      dir="rtl"
      style={{
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-4">الطلبات المقبوله</h2>
        </div>
        <div>
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
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#214D97";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#fff";
              e.currentTarget.style.color = "#214D97";
            }}
          >
            <FaArrowLeft className="ms-2" /> رجوع
          </button>
        </div>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center flex-grow-1">
          <Loader />
        </div>
      ) : approvedData.length > 0 ? (
        <div
          className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 p-2"
          style={{
            overflowY: "auto",
          }}
        >
          {approvedData.map((request) => (
            <div
              key={request.id}
              className="col"
              style={{
                transition:
                    "transform 0.4s cubic-bezier(0.4,0,0.2,1), box-shadow 0.4s cubic-bezier(0.4,0,0.2,1)",
              }}
              onMouseEnter={(e) => {
                 e.currentTarget.firstChild.style.transform =
                    "translateY(-8px) scale(1.025)";
                  e.currentTarget.firstChild.style.boxShadow =
                    "0 12px 32px rgba(33,77,151,0.13)";
              }}
              onMouseLeave={(e) => {
                  e.currentTarget.firstChild.style.transform = "none";
                  e.currentTarget.firstChild.style.boxShadow =
                    "0 2px 8px rgba(33,77,151,0.05)";
              }}
            >
              <div className="card shadow border-0 rounded-3 overflow-hidden h-100">
                <div
                  className="card-img-top"
                  style={{ height: "120px", overflow: "hidden" }}
                >
                  <img
                    src={request.pictureUrl || avatar}
                    alt={request.volunteerName}
                    className="w-100 h-100 object-fit-cover"
                  />
                </div>

                <div
                  className="card-body p-2 d-flex flex-column"
                  style={{ height: "calc(100% - 150px)" }}
                >
                  <div className="d-flex flex-row gap-2 align-content-center">
                    <div>
                      <img src={request.volunteerPictureUrl || avatar2} alt={request.volunteerName} className="rounded-circle border" style={{ width: 45, height: 45, objectFit: "cover", background: "#fff", boxShadow: "0 2px 8px rgba(33,77,151,0.13)" }} />
                    </div>
                    <div className="flex align-content-center">
                      <h5 className="card-title fw-bold mb-1 text-truncate">
                        {request.volunteerName}
                      </h5>
                    </div>
                  </div>
                  
                  <p className="card-text text-muted small mb-1">
                    {request.volunteerEmail}
                  </p>
                  <p className="card-text text-muted small mb-1">
                    {request.opportunityName}
                  </p>
                  <p className="card-text text-muted small mb-1">
                    عدد المتطوعين: {request.totalVolunteerCount}
                  </p>
                  <p className="card-text text-muted small mb-2">
                    {request.volunteerPhone}
                  </p>

                  <div className="d-flex gap-2 mt-auto w-100">
                    {request.rating ? (
                      <div
                        className="w-100 text-center py-2"
                        style={{
                          backgroundColor: "#e6f0fa",
                          color: "#214D97",
                          borderRadius: "8px",
                          fontWeight: "bold",
                          fontSize: "1.1rem",
                          border: "2px solid #214D97",
                        }}
                      >
                        التقييم: {request.rating} / 5
                      </div>
                    ) : (
                      <button
                        className="btn"
                        style={{
                          backgroundColor: "#214D97",
                          color: "#fff",
                          flex: 1,
                          borderRadius: "8px",
                          border: "2px solid #214D97",
                          fontWeight: "bold",
                          transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#fff";
                          e.currentTarget.style.color = "#214D97";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#214D97";
                          e.currentTarget.style.color = "#fff";
                        }}
                        onClick={() => {
                          setSelectedRequest(request);
                          setOpenApprove(true);
                        }}
                      >
                        تقييم الطلب
                      </button>
                    )}
                    <Modal
                      open={openApprove}
                      onCancel={() => setOpenApprove(false)}
                      centered
                      footer={null}
                      style={{
                        borderRadius: "18px",
                        padding: "32px 24px",
                        background: "#f9fafb",
                        minWidth: 340,
                        boxShadow: "0 8px 32px rgba(33,77,151,0.10)",
                      }}
                    >
                      <div className="d-flex flex-column align-items-center">
                        <h4
                          className="fw-bold mb-3"
                          style={{ color: "#214D97" }}
                        >
                          تقييم المتطوع
                        </h4>
                        {selectedRequest && (
                          <>
                            <img
                              src={selectedRequest.pictureUrl || avatar}
                              alt={selectedRequest.volunteerName}
                              className="rounded-circle border mb-2"
                              style={{
                                width: 72,
                                height: 72,
                                objectFit: "cover",
                                background: "#fff",
                                boxShadow: "0 2px 8px rgba(33,77,151,0.13)",
                              }}
                            />
                            <div className="mb-3 text-center">
                              <strong>{selectedRequest.volunteerName}</strong>
                              <div className="small text-muted">
                                {selectedRequest.volunteerEmail}
                              </div>
                            </div>
                          </>
                        )}
                        {loading ? (
                          <div
                            className="mt-4 d-flex justify-content-center align-items-center"
                            style={{ height: "100px" }}
                          >
                            <Loader />
                          </div>
                        ) : (
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              handleApprove(selectedRequest.id, approve);
                            }}
                            className="w-100"
                            dir="rtl"
                          >
                            <label
                              className="form-label mb-2"
                              htmlFor="rateInput"
                            >
                              أدخل التقييم من 1 إلى 5
                            </label>
                            <input
                              id="rateInput"
                              className="form-control mb-3 text-center"
                              style={{
                                width: "100%",
                                borderRadius: "12px",
                                fontSize: "1.2rem",
                                border: "1.5px solid #214D97",
                                boxShadow: "0 2px 8px rgba(33,77,151,0.05)",
                              }}
                              placeholder="مثال: 5"
                              type="number"
                              min={1}
                              max={5}
                              value={approve}
                              onChange={(e) => setApprove(e.target.value)}
                              required
                            />
                            <button
                              type="submit"
                              className="btn btn-primary w-100 mt-2"
                              style={{
                                borderRadius: "12px",
                                fontWeight: "bold",
                                fontSize: "1.1rem",
                                background: "#214D97",
                                border: "none",
                                transition: "background 0.2s",
                              }}
                            >
                              إرسال التقييم
                            </button>
                          </form>
                        )}
                      </div>
                    </Modal>
                  </div>
                </div>
              </div>
              
            </div>
          ))}
          
        </div>
      ) : (
        <div className="alert alert-warning text-center flex-grow-1 d-flex align-items-center justify-content-center">
          لا توجد طلبات متاحة
        </div>
      )}
      <Pagination
        className="d-flex justify-content-center align-items-center py-3"
        current={currentPage}
        pageSize={pageSize}
        total={totalCount}
        onChange={handlePageChange}
        showSizeChanger={false} // Hide the page size select box
      />
    </div>
  );
}

export default ApprovedOpportunity;
