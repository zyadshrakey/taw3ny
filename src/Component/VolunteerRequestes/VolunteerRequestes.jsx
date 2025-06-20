import React, { useState, useEffect, useCallback } from "react";
import avatar from "../../assets/volunteer-services-bureau logo@2x.png";
import { Interceptor } from "../../Apis/interceptor";
import {
  acceptApplication,
  getCharityApplications,
  rejectApplication,
} from "../../Apis/requestes";
import Loader from "../Loader/Loader";
import { message, Modal } from "antd";
import { Link } from "react-router-dom";

function VolunteerRequests() {
  const [requestsData, setRequestsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [modalAlt, setModalAlt] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  useEffect(() => {
    Interceptor();
    fetchRequests();
  }, []);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getCharityApplications();
      setRequestsData(data.data || []);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAction = async (id, action) => {
    try {
      await action(id);
      message.success("تمت العملية بنجاح");
      setRequestsData((prev) => prev.filter((req) => req.id !== id));
    } catch (error) {
      console.error("Error handling action:", error);
      message.error("اعد تنفيذ العملية");
    }
  };

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
          <h1>طلبات التطوع</h1>
        </div>
        <div>
          <Link
            to={"/approvedopportunity"}
            className="p-3 shadow"
            style={{
              backgroundColor: "#214D97",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              fontWeight: "bold",
              fontSize: "1.1rem",
              boxShadow: "0 4px 16px rgba(33,77,151,0.08)",
              transition: "all 0.3s",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#fff";
              e.currentTarget.style.color = "#214D97";
              e.currentTarget.style.border = "2px solid #214D97";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#214D97";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.border = "none";
            }}
          >
            الطلبات المقبوله&nbsp;
            <i class="fa-solid fa-check-double"></i>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center flex-grow-1">
          <Loader />
        </div>
      ) : requestsData.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {requestsData.map((request) => (
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
              <div className="card shadow border-0 rounded-3 overflow-hidden h-100">
                <div
                  className="card-img-top"
                  style={{ height: "120px", overflow: "hidden" }}
                >
                  <img
                    src={request?.pictureUrl || avatar}
                    alt={request.volunteerName}
                    className="w-100 h-100 object-fit-cover"
                  />
                </div>

                <div
                  className="card-body p-2 d-flex flex-column"
                  style={{ height: "calc(100% - 150px)" }}
                >
                  <h5 className="card-title fw-bold mb-1 text-truncate">
                    {request.volunteerName}
                  </h5>
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

                  <div className="d-flex gap-2 mt-auto">
                    <button
                      className="btn py-1 px-2"
                      style={{
                        backgroundColor: "#214D97",
                        fontSize: "0.9rem",
                        flex: 1,
                        color: "#F5F5F5",
                        border: "2px solid #214D97",
                        borderRadius: "8px",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#FFFFFF";
                        e.currentTarget.style.color = "#214D97";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#214D97";
                        e.currentTarget.style.color = "#F5F5F5";
                      }}
                      onClick={() =>
                        handleAction(request.id, acceptApplication)
                      }
                    >
                      قبول
                    </button>
                    <button
                      className="btn btn-outline-danger py-1 px-2"
                      style={{
                        fontSize: "0.9rem",
                        flex: 1,
                      }}
                      onClick={() =>
                        handleAction(request.id, rejectApplication)
                      }
                    >
                      رفض
                    </button>
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
  );
}

export default VolunteerRequests;
