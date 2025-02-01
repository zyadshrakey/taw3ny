import React, { useState, useEffect, useCallback } from "react";
import avatar from "../../assets/volunteer-services-bureau logo@2x.png";
import { Interceptor } from "../../Apis/interceptor";
import {
  acceptApplication,
  getCharityApplications,
  rejectApplication,
} from "../../Apis/requestes";

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
    <div className="container py-3" dir="rtl">
      <h2 className="text-2xl font-bold">طلبات التطوع</h2>
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : requestsData.length > 0 ? (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {requestsData.map((request) => (
            <div key={request.id} className="col pt-2">
              <VolunteerCard {...request} handleAction={handleAction} />
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-warning text-center">
          لا توجد طلبات متاحة
        </div>
      )}
    </div>
  );
}

const VolunteerCard = ({
  id,
  pictureUrl,
  opportunityName,
  volunteerName,
  totalVolunteerCount,
  volunteerEmail,
  volunteerPhone,
  handleAction,
}) => (
  <div className="p-4 border-0 bg-light shadow rounded-4 d-flex flex-column align-items-center">
    <img
      src={pictureUrl || avatar}
      alt={opportunityName}
      className="rounded-circle"
      style={{ height: "150px" }}
    />
    <h5 className="mt-2 fw-bold">{volunteerName}</h5>
    <h6 className="text-muted">{opportunityName}</h6>
    <p className="text-muted mb-2">{`عدد المتطوعين: ${totalVolunteerCount}`}</p>
    <p className="text-muted">{volunteerEmail}</p>
    <p className="text-muted">{volunteerPhone}</p>
    <div className="d-flex gap-2">
      <button
        className="btn btn-primary bg-primary text-white"
        onClick={() => handleAction(id, acceptApplication)}
      >
        قبول
      </button>
      <button
        className="btn btn-outline-danger"
        onClick={() => handleAction(id, rejectApplication)}
      >
        رفض
      </button>
    </div>
  </div>
);

export default VolunteerRequests;
