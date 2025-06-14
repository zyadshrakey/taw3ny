import React, { useState, useEffect, useCallback } from "react";
import avatar from "../../assets/volunteer-services-bureau logo@2x.png";
import { Interceptor } from "../../Apis/interceptor";
import {
  acceptApplication,
  getCharityApplications,
  rejectApplication,
} from "../../Apis/requestes";
import Loader from "../Loader/Loader";
import { message } from "antd";

function VolunteerRequests() {
  const [requestsData, setRequestsData] = useState([]);
  const [loading, setLoading] = useState(false);

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
        maxHeight: "90vh",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2 className="fw-bold mb-4">طلبات التطوع</h2>

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
              <div
                className="card shadow border-0 rounded-4 overflow-hidden h-100"
                style={{
                  transition:
                    "transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s cubic-bezier(0.4,0,0.2,1)",
                }}
              >
                <div
                  className="d-flex justify-content-center align-items-center pt-4 pb-2"
                  style={{ background: "#f6f8fa" }}
                >
                  <img
                    src={request.pictureUrl || avatar}
                    alt={request.volunteerName}
                    className="rounded-circle border"
                    style={{
                      width: 72,
                      height: 72,
                      objectFit: "cover",
                      background: "#fff",
                      transition: "box-shadow 0.35s cubic-bezier(0.4,0,0.2,1)",
                    }}
                  />
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
                      onClick={() => handleAction(request.id, acceptApplication)}
                    >
                      قبول
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      style={{
                        flex: 1,
                        borderRadius: "8px",
                        fontWeight: "bold",
                        transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
                      }}
                      onClick={() => handleAction(request.id, rejectApplication)}
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
