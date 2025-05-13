import React, { useState, useEffect, useCallback } from "react";
import avatar from "../../assets/volunteer-services-bureau logo@2x.png";
import { Interceptor } from "../../Apis/interceptor";
import {
  acceptApplication,
  getCharityApplications,
  rejectApplication,
} from "../../Apis/requestes";
import Loader from "../Loader/Loader";

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
      setRequestsData((prev) => prev.filter((req) => req.id !== id));
    } catch (error) {
      console.error("Error handling action:", error);
    }
  };

  return (
    <div
      className="container py-4"
      dir="rtl"
      style={{
        minHeight: "80vh",
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
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gap-2">
          {requestsData.map((request) => (
            <div
              key={request.id}
              className="card shadow-lg border-0 rounded-3 overflow-hidden"
              style={{ height: "100%" }}
            >
              <div
                className="card-img-top mt-2"
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
                    className="btn text-white py-1 px-2"
                    style={{
                      backgroundColor: "#214D97",
                      fontSize: "0.9rem",
                      flex: 1,
                    }}
                    onClick={() => handleAction(request.id, acceptApplication)}
                  >
                    قبول
                  </button>
                  <button
                    className="btn btn-outline-danger py-1 px-2"
                    style={{
                      fontSize: "0.9rem",
                      flex: 1,
                    }}
                    onClick={() => handleAction(request.id, rejectApplication)}
                  >
                    رفض
                  </button>
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
