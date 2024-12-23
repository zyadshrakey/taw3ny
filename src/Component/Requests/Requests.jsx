import React from "react";
import avatar from "../../assets/volunteer-services-bureau logo@2x.png";

function Requests({ item, onReject, onAccept }) {
  return (
    <>
      <div className="col-md-3 gap-3 p-2">
        <div
          style={{ backgroundColor: "#F5F5F5", borderRadius: "24px" }}
          className="requests p-2 m-auto d-flex flex-column justify-content-center align-items-center"
        >
          <div className="requestImg w-50">
            <img
              src={item.pictureUrl || avatar}
              alt={item.opportunityName}
              width={"100%"}
              style={{ borderRadius: "50%" }}
            />
          </div>
          <h4
            style={{
              fontWeight: "400",
              fontSize: "24px",
              lineHeight: "33.6px",
              textAlign: "center",
            }}
          >
            {item.volunteerName}
          </h4>
          <h4
            style={{
              fontWeight: "400",
              fontSize: "24px",
              lineHeight: "33.6px",
              textAlign: "center",
            }}
          >
            {item.opportunityName}
          </h4>
          <p
            style={{
              fontWeight: "400",
              fontSize: "18px",
              lineHeight: "21px",
            }}
          >
            عدد المتطوعين : {item.totalVolunteerCount}
          </p>
          <p
            style={{
              fontWeight: "400",
              fontSize: "18px",
            }}
          >
            {item.volunteerEmail}
          </p>
          <p
            style={{
              fontWeight: "400",
              fontSize: "18px",
              lineHeight: "21px",
            }}
          >
            {item.volunteerPhone}
          </p>
          <div
            className="btn d-flex flex-row gap-3"
            style={{ fontWeight: "400", fontSize: "24px" }}
          >
            <div className="btn1">
              <button
                className="btn"
                style={{
                  border: "1px solid #972121",
                  color: "#972121",
                }}
                onClick={() => onReject(item.id)}
              >
                رفض
              </button>
            </div>
            <div className="btn1">
              <button
                className="btn"
                style={{
                  backgroundColor: "#214D97",
                  color: "white",
                }}
                onClick={() => onAccept(item.id)}
              >
                قبول
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Requests;
