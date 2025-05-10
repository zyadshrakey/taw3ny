import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Loader from "../Loader/Loader";

function AttendanceRecord() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  let [attentance, setAttentance] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState(null);
  let [searchItem, setSearchItem] = useState("");
  let token = localStorage.getItem("userToken");
  let [qrCode, setQrCode] = useState(null);

  const handleGoBack = () => {
    navigate(-1);
  };

  async function getAttentance() {
    let response = await axios
      .get("https://wezaa.runasp.net/Attendance/charity?page=1&pageSize=10", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.attendances);
        setAttentance(response.data.attendances);
      })
      .catch((error) => {
        console.log(error);
        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to show Volunteer Data"
        );
      });
  }

  const filteredVolunteers = attentance.filter((item) =>
    item.volunteerName?.toLowerCase().includes(searchItem.toLowerCase())
  );

  async function generatQr() {
    setIsLoading(true);
    try {
      let response = await axios.get(
        "https://wezaa.runasp.net/Attendance/qrcode",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      console.log(response.data);
      // setQrCode(response.data)

      const imageUrl = URL.createObjectURL(response.data);
      setQrCode(imageUrl);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAttentance();
  }, []);

  return (
    <>
      <div className="d-flex flex-column">
        <div className="d-flex p-4 flex-row justify-content-between">
          <div className="volunteerBtn" onClick={handleGoBack}>
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
          <div className="title">
            <h1>سجل الحضور</h1>
          </div>
        </div>

        <div className="container d-flex flex-md-row flex-column-reverse justify-content-between align-items-center">
          <Button
            variant="primary"
            onClick={handleShow}
            className="w-25"
            style={{
              backgroundColor: "rgba(33, 77, 151, 1)",
              borderRadius: "8px",
              boxShadow: "0 4px 8px 0 rgb(33, 77, 151)",
              border: "none",
            }}
          >
            QR Code
          </Button>

          <Modal show={show} onHide={handleClose}>
            <div className="d-flex flex-column align-items-center h-100 p-3">
              <div className="qrBtn container d-flex align-items-center justify-content-center">
                <button
                  className="py-2 px-3"
                  style={{
                    backgroundColor: "rgba(33, 77, 151, 1)",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                  }}
                  onClick={generatQr}
                  disabled={isLoading} // optionally disable to avoid multiple clicks
                >
                  إنشاء رمز الاستجابة السريعة
                </button>
              </div>

              {isLoading && (
                <div
                  className="mt-4 d-flex justify-content-center align-items-center"
                  style={{ height: "100px" }}
                >
                  <Loader />
                </div>
              )}

              {qrCode && !isLoading && (
                <div className="mt-4 p-2 d-flex justify-content-center">
                  <img
                    src={qrCode}
                    alt="QR Code"
                    style={{ width: "300px", height: "300px" }}
                  />
                </div>
              )}
            </div>
          </Modal>

          {/* <Modal show={show} onHide={handleClose}>
        <div className='d-flex flex-column align-align-items-center h-100 p-3'>

          <div className='qrBtn container d-flex align-item-center justify-content-center'>
              <button className='py-2 px-3' style={{backgroundColor:'rgba(33, 77, 151, 1)', color:'white', border:'none', borderRadius:'8px' }}
                  onClick={()=>{generatQr()}}>
                    إنشاء رمز الاستجابة السريعة
              </button>
          </div>

          {qrCode && (
          <div className="mt-4 p-2 d-flex justify-content-center">
            <img src={qrCode}  alt="QR Code" style={{ width: '300px', height: '300px' }} />
          </div>
          )}
          

        </div>
      </Modal> */}

          <div
            className=" p-4 d-flex flex-row align-items-center justify-content-end volunteerInput position-relative"
            style={{ width: "100%" }}
          >
            <input
              className="py-1 px-5"
              style={{
                borderRadius: "4px",
                border: "1px solid rgba(167, 167, 167, 1)",
                width: "80%",
              }}
              type="text"
              placeholder="البحث"
              dir="rtl"
              onChange={(e) => setSearchItem(e.target.value)}
            />
            <i
              style={{
                color: "rgba(33, 77, 151, 1)",
                right: "25px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
              className="fa-solid fa-magnifying-glass position-absolute px-1"
            ></i>
          </div>
        </div>

        {searchItem && (
          <div className="p-2">
            <h5 dir="rtl" className="text-danger flex-start">
              نتائج البحث :{" "}
            </h5>
            {filteredVolunteers.length > 0 ? (
              <table dir="rtl" className="table table-bordered">
                <thead>
                  <tr className="table-primary table-borderless text-center">
                    <th>الاسم</th>
                    <th>الوقت</th>
                    <th>التاريخ</th>
                    <th>الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVolunteers.map((item, index) => (
                    <tr className="py-2 text-center" key={item.id || index}>
                      <td>
                        {item.volunteerName || (
                          <span className="text-danger">N/A</span>
                        )}
                      </td>
                      <td>
                        {item.checkInTime || (
                          <span className="text-danger">N/A</span>
                        )}
                      </td>
                      <td>
                        {item.checkInTime || (
                          <span className="text-danger">N/A</span>
                        )}
                      </td>
                      <td>
                        {item.status == "Active"
                          ? "حاضر"
                          : "غائب" || <span className="text-danger">N/A</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-danger text-center">لا توجد نتائج مطابقة</p>
            )}
          </div>
        )}

        <div className="volunteerBtn container d-flex flex-column align-item-center justify-content-center gap-5">
          <div className="d-flex flex-column align-align-items-center">
            <div className="p-2">
              <table dir="rtl" className="table table-bordered">
                <thead>
                  <tr className="table-primary table-borderless text-center">
                    <th>الاسم</th>
                    <th>الوقت</th>
                    <th>التاريخ</th>
                    <th>الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {attentance &&
                    attentance.map((item, index) => (
                      <tr className="py-2 text-center" key={item.id || index}>
                        <td>
                          {item.volunteerName || (
                            <span className="text-danger">N/A</span>
                          )}
                        </td>
                        <td>
                          {item.checkInTime || (
                            <span className="text-danger">N/A</span>
                          )}
                        </td>
                        <td>
                          {item.checkInTime || (
                            <span className="text-danger">N/A</span>
                          )}
                        </td>
                        <td>
                          {item.status == "Active"
                            ? "حاضر"
                            : "غائب" || (
                                <span className="text-danger">N/A</span>
                              )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AttendanceRecord;
