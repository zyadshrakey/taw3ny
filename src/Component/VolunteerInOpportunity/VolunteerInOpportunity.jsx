import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Loader from "../Loader/Loader";
import Table from "../Table/Table";

function VolunteerInOpportunity() {
  let navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  const columns = [
    "فى الفرص",
    "الاسم",
    "النوع",
    "رقم الهاتف",
    "البلد",
    "ساعات التطوع",
  ];

  const StyledRow = styled.tr`
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  `;

  const renderRow = (item, index) => (
    <StyledRow
      className="py-2"
      onClick={() => handleRowClick(item.id)}
      key={item.id}
    >
      <td className="py-3">{index}</td>
      <td className="py-3">
        {item.fullName || <span className="text-danger">N/A</span>}
      </td>
      <td className="py-3">
        {item.gender || <span className="text-danger">N/A</span>}
      </td>
      <td className="py-3">
        {item.phoneNumber || <span className="text-danger">N/A</span>}
      </td>
      <td className="py-3">
        {item.city || <span className="text-danger">N/A</span>}
      </td>
      <td className="py-3">
        <i className="text-primary fa-solid fa-clock"></i>{" "}
        {item.volunteerHours || <span className="text-danger">N/A</span>}
      </td>
    </StyledRow>
  );

  let [volunteer, setVolunteer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  let [seacrchItem, setSearchItem] = useState("");

  async function displayVolunteer() {
    setError(null);
    let token = localStorage.getItem("userToken");
    let response = await axios
      .get("https://wezaa.runasp.net/Volunteer/opportunities", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setVolunteer(response.data);
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

  const handleRowClick = (vounteerId) => {
    navigate(`/volunteerdetails/${vounteerId}`);
  };

  const filteredVolunteers = volunteer.filter((item) =>
    item.fullName?.toLowerCase().includes(seacrchItem.toLowerCase())
  );

  useEffect(() => {
    displayVolunteer();
  }, []);
  return (
    <>
      <div className="d-flex flex-column" style={{ minHeight: "100vh", background: "#f8fafc" }}>
        {/* Header */}
        <div
          className="d-flex p-4 flex-row justify-content-between align-items-center"
          style={{
            background: "#fff",
            borderRadius: "0 0 18px 18px",
            boxShadow: "0 2px 12px rgba(33,77,151,0.06)",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <button
            className="d-flex align-items-center gap-2"
            style={{
              backgroundColor: "#f3f4f6",
              color: "#214D97",
              border: "none",
              borderRadius: "8px",
              width: "90px",
              height: "42px",
              fontWeight: "bold",
              fontSize: "1rem",
              boxShadow: "0 2px 8px rgba(33,77,151,0.04)",
              transition: "background 0.2s, color 0.2s",
            }}
            onClick={handleGoBack}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = "#e5e7eb";
              e.currentTarget.style.color = "#1e293b";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = "#f3f4f6";
              e.currentTarget.style.color = "#214D97";
            }}
          >
            <i className="fa-solid fa-arrow-left"></i> رجوع
          </button>
          <div className="title">
            <h1 style={{ color: "#22223b", fontWeight: "bold", letterSpacing: "1px", margin: 0, fontSize: "1.7rem" }}>
              ملف المتطوعين
            </h1>
          </div>
        </div>

        {/* Search Bar */}
        <div
          className="px-4 py-3 d-flex flex-row align-items-center justify-content-end volunteerInput position-relative"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 2,
            background: "#f8fafc",
            borderBottom: "1px solid #e5e7eb",
            boxShadow: "0 2px 8px rgba(33,77,151,0.02)",
          }}
        >
          <input
            className="py-2 px-5"
            style={{
              width: "100%",
              maxWidth: "500px",
              borderRadius: "24px",
              border: "1px solid #d1d5db",
              paddingRight: "38px",
              background: "#fff",
              boxShadow: "0 2px 8px rgba(33,77,151,0.03)",
              transition: "box-shadow 0.2s, border 0.2s",
              fontSize: "1rem",
            }}
            type="text"
            placeholder="ابحث بالأسم..."
            dir="rtl"
            onChange={(e) => setSearchItem(e.target.value)}
          />
          <i
            style={{
              color: "#9ca3af",
              right: "35px",
              top: "50%",
              position: "absolute",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              fontSize: "1.1rem",
            }}
            className="fa-solid fa-magnifying-glass position-absolute px-1"
          ></i>
        </div>

        {/* Table & Results */}
        <div className="p-4 volunteerTable flex-grow-1">
          {error && (
            <div className="alert alert-danger text-center my-3">{error}</div>
          )}
          {seacrchItem && seacrchItem.length > 0 ? (
            isLoading ? (
              <div className="d-flex justify-content-center align-items-center py-5">
                <Loader />
              </div>
            ) : (
              <div className="p-4 volunteerSearchResult card shadow-sm rounded-4" style={{ background: "#fff", border: "none" }}>
                <h5 dir="rtl" className="mb-3" style={{ color: "#22223b", fontWeight: "bold" }}>نتائج البحث:</h5>
                {filteredVolunteers.length > 0 ? (
                  <div style={{ overflowX: "auto" }}>
                    <Table
                      columns={columns}
                      data={filteredVolunteers}
                      renderRow={(item, i) => renderRow(item, i)}
                      isLoading={false}
                      emptyMessage="لا توجد نتائج مطابقة"
                      maxHeight="500px"
                    />
                  </div>
                ) : (
                  <p className="text-danger text-center" style={{ fontSize: "20px" }}>
                    لا توجد نتائج مطابقة
                  </p>
                )}
              </div>
            )
          ) : (
            <div className="card shadow-sm rounded-4 p-3" style={{ overflowX: "auto", background: "#fff", border: "none" }}>
              <Table
                columns={columns}
                data={volunteer}
                renderRow={(item, i) => renderRow(item, i)}
                isLoading={isLoading}
                emptyMessage="لا يوجد متطوعين"
                maxHeight="500px"
              />
            </div>
          )}
        </div>
        <style>
          {`
            .volunteerTable table tr {
              transition: background 0.22s cubic-bezier(0.4,0,0.2,1), transform 0.22s cubic-bezier(0.4,0,0.2,1);
              cursor: pointer;
            }
            .volunteerTable table tr:hover {
              background: #f3f4f6 !important;
              transform: scale(1.012);
              box-shadow: 0 2px 12px rgba(33,77,151,0.06);
            }
            .volunteerTable table th {
              background: #f8fafc;
              color: #22223b;
              font-weight: bold;
              border-bottom: 2px solid #e5e7eb;
            }
          `}
        </style>
      </div>
    </>
  );
}

export default VolunteerInOpportunity;
