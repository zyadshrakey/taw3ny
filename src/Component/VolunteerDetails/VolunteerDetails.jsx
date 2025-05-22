import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import img from "../../assets/avatar2.jpg";
import { message } from "antd";
import { FaStar, FaRegStar, FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";

function VolunteerDetails() {
  const navigate= useNavigate()
  const handleGoBack=()=>{
    navigate(-1)
  }

  let { id } = useParams();
  console.log("Volunteer Id:", id);
  let token = localStorage.getItem("userToken");
  let [volunteerInfo, setVolunteerInfo] = useState([]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  async function getVolunteerdetails() {
    let response = await axios
      .get(`https://wezaa.runasp.net/Volunteer/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setVolunteerInfo(response.data);
      })
      .catch((error) => console.log(error));
  }

  const submitRating = async () => {
    if (rating < 1 || rating > 5) {
      message.error("الرجاء اختيار تقييم بين 1 و 5");
      return;
    }

    try {
      await axios.put(
        `https://wezaa.runasp.net/VolunteerApplications/rate/${id}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { rating },
        }
      );
      message.success("تم تقييم المتطوع بنجاح!");
    } catch (error) {
      console.error(error);
      message.error("حدث خطأ أثناء تقييم المتطوع");
    }
  };

  const deleteVolunteer = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.delete(
        `https://wezaa.runasp.net/Volunteer/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        toast.success("تم حذف المتطوع بنجاح!");
        window.location.href = "/volunteer";
      } else {
        throw new Error("Failed to delete volunteer");
      }
    } catch (error) {
      console.error(error);
      message.error("حدث خطاء اثناء حذف المتطوع");
    }
  };

  useEffect(() => {
    getVolunteerdetails();
  }, []);

  return (
    <>
      <div className="container">
      <div className="volunteerBtn p-3" onClick={handleGoBack}>
            <button
              style={{
                backgroundColor: "rgba(33, 77, 151, 1)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                width: "79px",
                height: "40px",
              }}
            >
              <i className="fa-solid fa-arrow-left"></i> رجوع
            </button>
          </div>
        {volunteerInfo && (
          <div className="row ">
            <div className="col-md-5 d-flex flex-column align-items-center justify-content-center py-4">
              <img
                src={img || volunteerInfo?.pictureUrl}
                alt={volunteerInfo.fullName}
                className="rounded-circle mb-4"
                style={{ width: "200px", height: "200px", objectFit: "cover" }}
              />

              <div className="text-center mb-4" style={{ width: "100%" }}>
                <div
                  style={{
                    direction: "rtl",
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "20px",
                  }}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      style={{
                        background: "none",
                        border: "none",
                        outline: "none",
                        cursor: "pointer",
                        padding: "0 8px",
                        transition: "all 0.2s",
                      }}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                    >
                      {star <= (hover || rating) ? (
                        <FaStar
                          style={{
                            fontSize: "2rem",
                            color: "#ffc107",
                            filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.2))",
                          }}
                        />
                      ) : (
                        <FaRegStar
                          style={{
                            fontSize: "2rem",
                            color: "#dee2e6",
                            filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.1))",
                          }}
                        />
                      )}
                    </button>
                  ))}
                </div>
                <button
                  onClick={submitRating}
                  className="btn text-white"
                  style={{
                    backgroundColor: "#214D97",
                    padding: "8px 25px",
                    borderRadius: "4px",
                    fontWeight: "500",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    opacity: rating ? 1 : 0.6,
                    cursor: rating ? "pointer" : "not-allowed",
                  }}
                  disabled={!rating}
                >
                  إرسال التقييم
                </button>
              </div>
            </div>

            <div className="col-md-7 d-flex align-items-center justify-content-center py-4">
              <form className="w-100">
                <div className="pb-2">
                  <input
                    className="inputDiv col-9 p-2"
                    dir="rtl"
                    type="text"
                    name="name"
                    value={volunteerInfo.fullName || ""}
                    readOnly
                    style={{
                      borderRadius: "4px",
                      border: "1px solid rgba(167, 167, 167, 1)",
                    }}
                  />
                  <label className="col-3" htmlFor="name">
                    &nbsp;:اسم المتطوع
                  </label>
                </div>

                <div className="pb-2">
                  <input
                    className="inputDiv col-9 p-2"
                    dir="rtl"
                    type="email"
                    name="email"
                    value={volunteerInfo.email || ""}
                    readOnly
                    style={{
                      borderRadius: "4px",
                      border: "1px solid rgba(167, 167, 167, 1)",
                    }}
                  />
                  <label className="col-3" htmlFor="email">
                    &nbsp;:البريد الإلكترونى{" "}
                  </label>
                </div>
                <div className="pb-2">
                  <input
                    className="inputDiv col-9 p-2"
                    dir="rtl"
                    type="tel"
                    name="phoneNumber"
                    value={volunteerInfo.phoneNumber || ""}
                    readOnly
                    style={{
                      borderRadius: "4px",
                      border: "1px solid rgba(167, 167, 167, 1)",
                    }}
                  />
                  <label className="col-3" htmlFor="phoneNumber">
                    &nbsp;:رقم الهاتف
                  </label>
                </div>
                <div className="pb-2">
                  <input
                    className="inputDiv col-9 p-2"
                    dir="rtl"
                    type="text"
                    name="city"
                    value={volunteerInfo.city || ""}
                    readOnly
                    style={{
                      borderRadius: "4px",
                      border: "1px solid rgba(167, 167, 167, 1)",
                    }}
                  />
                  <label className="col-3" htmlFor="city">
                    &nbsp;:المدينه
                  </label>
                </div>
                <div className="pb-2">
                  <input
                    className="inputDiv col-9 p-2"
                    dir="rtl"
                    type="number"
                    name="age"
                    value={volunteerInfo.age || ""}
                    readOnly
                    style={{
                      borderRadius: "4px",
                      border: "1px solid rgba(167, 167, 167, 1)",
                    }}
                  />
                  <label className="col-3" htmlFor="age">
                    &nbsp;:السن
                  </label>
                </div>
                <div className="pb-2">
                  <input
                    className="inputDiv col-9 p-2"
                    dir="rtl"
                    type="datetime-local"
                    name="dateOfBirth"
                    value={volunteerInfo.dateOfBirth || ""}
                    readOnly
                    style={{
                      borderRadius: "4px",
                      border: "1px solid rgba(167, 167, 167, 1)",
                    }}
                  />
                  <label className="col-3" htmlFor="dateOfBirth">
                    {" "}
                    &nbsp;:تاريخ الميلاد
                  </label>
                </div>
                <div className="pb-2">
                  <input
                    className="inputDiv col-9 p-2"
                    dir="rtl"
                    type="text"
                    name="gender"
                    value={volunteerInfo.gender || ""}
                    readOnly
                    style={{
                      borderRadius: "4px",
                      border: "1px solid rgba(167, 167, 167, 1)",
                    }}
                  />
                  <label className="col-3" htmlFor="gender">
                    &nbsp;:النوع
                  </label>
                </div>
                <div className="pb-2">
                  <input
                    className="inputDiv col-9 p-2"
                    dir="rtl"
                    type="number"
                    name="hoursForDailyTasks"
                    value={volunteerInfo.hoursForDailyTasks || ""}
                    readOnly
                    style={{
                      borderRadius: "4px",
                      border: "1px solid rgba(167, 167, 167, 1)",
                    }}
                  />
                  <label className="col-3" htmlFor="hoursForDailyTasks">
                    &nbsp;:ساعات المهام اليومية
                  </label>
                </div>
                <div className="pb-2">
                  <input
                    className="inputDiv col-9 p-2"
                    dir="rtl"
                    type="number"
                    name="totalVolunteerHours"
                    value={volunteerInfo.totalVolunteerHours || ""}
                    readOnly
                    style={{
                      borderRadius: "4px",
                      border: "1px solid rgba(167, 167, 167, 1)",
                    }}
                  />
                  <label className="col-3" htmlFor="totalVolunteerHours">
                    &nbsp;:إجمالي ساعات التطوع
                  </label>
                </div>

                <div>
                  <button
                    className="btn btn-outline-danger fw-bold px-3 rounded-2 "
                    style={{ borderRadius: "2px" }}
                    onClick={deleteVolunteer}
                  >
                    <i class="fa-solid fa-trash-can"></i>
                    <span className="px-2">حذف المتطوع</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default VolunteerDetails;
