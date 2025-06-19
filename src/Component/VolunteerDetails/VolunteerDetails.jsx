import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import img from "../../assets/avatar2.jpg";
import { message } from "antd";

function VolunteerDetails() {
  let { id } = useParams();
  console.log("Volunteer Id:", id);
  let token = localStorage.getItem("userToken");
  let [volunteerInfo, setVolunteerIfo] = useState([]);

  async function getVolunteerdetails() {
    let response = await axios
      .get(`https://wezaa.runasp.net/Volunteer/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setVolunteerIfo(response.data);
      })
      .catch((error) => console.log(error));
  }

  const deleteVolunteer = async () => {
    try {
      const response = await axios.delete(
        `https://wezaa.runasp.net/Volunteer/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        message.success("تم حذف المتطوع بنجاح!");
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
        {volunteerInfo && (
          <div className="row ">
            <div className="col-md-5 d-flex flex-column align-items-center justify-content-center py-4">
              <img
                src={img || volunteerInfo?.pictureUrl}
                alt={volunteerInfo.fullName}
                className="rounded-circle mb-4"
                style={{ width: "200px", height: "200px", objectFit: "cover" }}
              />
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
                  <label className="col-3 text-end" htmlFor="name">
                    :اسم المتطوع
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
                  <label className="col-3 text-end" htmlFor="email">
                    :البريد الإلكترونى{" "}
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
                  <label className="col-3 text-end" htmlFor="phoneNumber">
                    :رقم الهاتف
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
                  <label className="col-3 text-end" htmlFor="city">
                    :المدينه
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
                  <label className="col-3 text-end" htmlFor="age">
                    :السن
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
                  <label className="col-3 text-end" htmlFor="dateOfBirth">
                    :تاريخ الميلاد
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
                  <label className="col-3 text-end" htmlFor="gender">
                    :النوع
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
                  <label
                    className="col-3 text-end"
                    htmlFor="hoursForDailyTasks"
                  >
                    :ساعات المهام اليومية
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
                  <label
                    className="col-3 text-end"
                    htmlFor="totalVolunteerHours"
                  >
                    :إجمالي ساعات التطوع
                  </label>
                </div>

                <div>
                  <button
                    className="btn btn-outline-danger fw-bold px-3 rounded-2 "
                    style={{ borderRadius: "2px" }}
                    onClick={() => deleteVolunteer()}
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
