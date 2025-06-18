import React, { useState, useEffect, useCallback } from "react";
import avatar from "../../assets/volunteer-services-bureau logo@2x.png";
import Loader from "../Loader/Loader";
import { Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FaQrcode, FaArrowLeft, FaSearch, FaTimes } from "react-icons/fa";
import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";


function ApprovedOpportunity() {

    const [approvedData, setApprovedData] = useState([]);
    const [openApprove, setOpenApprove] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [approve, setApprove] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalImage, setModalImage] = useState(null);
    const [modalAlt, setModalAlt] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
        const handleGoBack = () => {
        navigate(-1);
    };
  

    

    const approvedOpportunity = async()=>{
        setLoading(true);
        try {
            const response = await axios.get(`https://wezaa.runasp.net/VolunteerApplications?status=Approved`,
                {headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("userToken")}`
                }}
            );
            setApprovedData(response.data.data);
            console.log("Approved Opportunities:", response.data.data);
            
            } catch (error) {
                console.error("Error fetching approved opportunities:", error);
            } finally {
                setLoading(false);
            }
    }

    const handleApprove = async (id, rate) => {
    setLoading(true);
    try {
        const response = await axios.put(
        `https://wezaa.runasp.net/VolunteerApplications/rate/${id}?rating=${rate}`,
        {},
        {
            headers: {
            "Authorization": `Bearer ${localStorage.getItem("userToken")}`
            }
        }
        );
        // Update the rated request in approvedData
        setApprovedData(prev =>
        prev.map(item =>
            item.id === id ? { ...item, rate } : item
        )
        );
        setOpenApprove(false);
        setSelectedRequest(null);
        toast.success('تم التقييم بنجاح');
    } catch (error) {
        console.error("Error fetching approved opportunities:", error);
        toast.error("حدث خطأ ما ,اعد الحاوله مره اخرى");
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
                </div>
              </div>
              
        
              {loading ? (
                <div className="d-flex justify-content-center align-items-center flex-grow-1">
                  <Loader />
                </div>
              ) : approvedData.length > 0 ? (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                  {approvedData.map((request) => (
                    <div
                      key={request.id}
                      className="col"
                      style={{
                        // Use cubic-bezier for a smoother transition
                        transition:
                          "transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s cubic-bezier(0.4,0,0.2,1)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.firstChild.style.transform =
                          "translateY(-6px) scale(1.03)";
                        e.currentTarget.firstChild.style.boxShadow =
                          "0 8px 32px rgba(33,77,151,0.10)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.firstChild.style.transform = "none";
                        e.currentTarget.firstChild.style.boxShadow =
                          "0 2px 8px rgba(33,77,151,0.05)";
                      }}
                    >
                      <div
                        className="card shadow border-0 rounded-4 overflow-hidden h-100"
                        style={{
                          transition:
                            "transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s cubic-bezier(0.4,0,0.2,1)",
                        }}
                      >
                        <div
                          className="d-flex justify-content-center align-items-center pt-4 pb-2 position-relative"
                          style={{ background: "#f6f8fa" }}
                        >
                          <img
                            src={request.pictureUrl || avatar}
                            alt={request.volunteerName}
                            className="rounded-circle border"
                            style={{
                              width: 100,
                              height: 100,
                              objectFit: "cover",
                              background: "#fff",
                              transition: "box-shadow 0.35s cubic-bezier(0.4,0,0.2,1)",
                            }}
                          />
                          <button
                          className="btn position-absolute d-flex align-items-center justify-content-center"
                          style={{
                            top: 8,
                            left: 8,
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            background: "rgba(33,77,151,0.85)",
                            color: "#fff",
                            border: "none",
                            boxShadow: "0 2px 8px rgba(33,77,151,0.13)",
                            zIndex: 2,
                            transition: "background 0.2s",
                            padding: 0,
                          }}
                          onClick={() => {
                            setModalImage(request.pictureUrl || avatar);
                            setModalAlt(request.volunteerName);
                            setIsOpen(true);
                          }}
                          title="عرض الصورة"
                          type="button"
                          onMouseEnter={e => (e.currentTarget.style.background = "#16336c")}
                          onMouseLeave={e => (e.currentTarget.style.background = "rgba(33,77,151,0.85)")}
                        >
                          <i className="fa-solid fa-expand"></i>
                        </button>
                        <Modal open={isOpen} onCancel={() => setIsOpen(false)} centered footer={null}>
                                <div className="d-flex flex-column align-items-center h-100 p-3">
                                 
                                  {loading && (
                                    <div className="mt-4 d-flex justify-content-center align-items-center" style={{ height: "100px" }}>
                                      <Loader />
                                    </div>
                                  )}
                                  {!loading && (
                                    <img
                                      src={modalImage}
                                      alt={modalAlt}
                                      className="img-fluid rounded"
                                      style={{ maxHeight: "80vh", objectFit: "cover" }}
                                    />
                                  )}
                                </div>
                        </Modal>
                        </div>
                        <div className="card-body d-flex flex-column align-items-center px-3">
                          <h5 className="fw-bold mb-1 text-truncate w-100 text-center">
                            {request.volunteerName}
                          </h5>
                          <div className="w-100 mb-2">
                            <div className="small text-muted text-center mb-1">
                              {request.volunteerEmail}
                            </div>
                            <div className="small text-muted text-center mb-1">
                              {request.opportunityName}
                            </div>
                            <div className="small text-muted text-center mb-1">
                              عدد المتطوعين: {request.totalVolunteerCount}
                            </div>
                            <div className="small text-muted text-center mb-2">
                              {request.volunteerPhone}
                            </div>
                          </div>
                          <div className="d-flex gap-2 mt-auto w-100">
                            {request.rate ? (
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
                                    التقييم: {request.rate} / 5
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
                                    onMouseEnter={e => {
                                    e.currentTarget.style.backgroundColor = "#fff";
                                    e.currentTarget.style.color = "#214D97";
                                    }}
                                    onMouseLeave={e => {
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
                                <h4 className="fw-bold mb-3" style={{ color: "#214D97" }}>تقييم المتطوع</h4>
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
                                        <div className="small text-muted">{selectedRequest.volunteerEmail}</div>
                                    </div>
                                    </>
                                )}
                                {loading ? (
                                    <div className="mt-4 d-flex justify-content-center align-items-center" style={{ height: "100px" }}>
                                    <Loader />
                                    </div>
                                ) : (
                                    <form
                                    onSubmit={e => {
                                        e.preventDefault();
                                        handleApprove(selectedRequest.id, approve);
                                    }}
                                    className="w-100"
                                    dir="rtl"
                                    >
                                    <label className="form-label mb-2" htmlFor="rateInput">
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
                                        onChange={e => setApprove(e.target.value)}
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
            </div>
    )
}

export default ApprovedOpportunity
