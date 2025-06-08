import React, { useEffect, useRef, useState } from "react";
import { message, Modal } from "antd";
import {
  getProfileInfo,
  updateProfileInfo,
  deleteProfile,
  updatePhoto,
} from "../../Apis/profile";
import { Interceptor } from "../../Apis/interceptor";
import Loader from "../Loader/Loader";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    Interceptor();
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getProfileInfo();
      setProfile(response.data);
      setLoading(false);
    } catch (err) {
      setError("فشل في تحميل البيانات");
      setLoading(false);
      message.error("فشل في تحميل البيانات");
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await updateProfileInfo(profile);
      console.log(response);
      message.success("تم تحديث بيانات المؤسسة بنجاح!");
      setIsEditing(false);
    } catch (err) {
      message.error("فشل في تحديث بيانات المؤسسة");
    }
  };

  const handleDeleteProfile = async () => {
    try {
      Modal.confirm({
        title: "حذف بيانات المؤسسة",
        content: "هل أنت متأكد من حذف بيانات المؤسسة؟",
        okText: "نعم",
        okType: "danger",
        cancelText: "لا",
        onOk: () => {
          deleteProfile();
          message.success("تم حذف بيانات المؤسسة بنجاح!");
        },
      });
    } catch (err) {
      message.error("فشل في حذف بيانات المؤسسة");
    }
  };

  const handleEditPhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      await updatePhoto(file);
      message.success("تم تحديث صورة بيانات المؤسسة بنجاح!");
      fetchProfile();
    } catch (err) {
      message.error("فشل في تحديث صورة بيانات المؤسسة");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  if (loading)
    return (
      <div className="text-center py-5">
        <Loader />
      </div>
    );
  if (error) return <div className="text-center py-5 text-danger">{error}</div>;

  return (
    <div className="container mt-3">
      <div className="card shadow">
        <div className="card-body position-relative" dir="rtl">
          <button
            onClick={handleDeleteProfile}
            className="btn btn-outline-danger position-absolute"
            style={{ top: "10px", left: "10px", zIndex: 10 }}
            title="حذف بيانات المؤسسة"
          >
            <DeleteOutlined />
          </button>

          <div
            className="position-relative text-center mb-4"
            style={{ width: "150px", height: "150px", margin: "auto" }}
          >
            <img
              src={profile?.pictureUrl}
              alt="Profile"
              className="img-thumbnail rounded-circle w-100 h-100"
              style={{ objectFit: "cover" }}
            />
            <input
              name="Picture"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleEditPhoto}
              style={{ display: "none" }}
            />
            <div
              className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                borderRadius: "50%",
                opacity: 0,
                transition: "opacity 0.3s",
                cursor: "pointer",
              }}
              onClick={() => fileInputRef.current.click()}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
            >
              <EditOutlined style={{ fontSize: "24px", color: "#fff" }} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">الاسم الكامل:</label>
              <input
                type="text"
                name="fullName"
                value={profile?.fullName || ""}
                onChange={handleInputChange}
                className="form-control"
                readOnly={!isEditing}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">اسم المستخدم:</label>
              <input
                type="text"
                name="userName"
                value={profile?.userName || ""}
                onChange={handleInputChange}
                className="form-control"
                readOnly={!isEditing}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">البريد الإلكتروني:</label>
              <input
                type="email"
                name="email"
                value={profile?.email || ""}
                onChange={handleInputChange}
                className="form-control"
                readOnly={!isEditing}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">رقم الهاتف:</label>
              <input
                type="text"
                name="phoneNumber"
                value={profile?.phoneNumber || ""}
                onChange={handleInputChange}
                className="form-control"
                readOnly={!isEditing}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">العنوان:</label>
              <input
                type="text"
                name="address"
                value={profile?.address || ""}
                onChange={handleInputChange}
                className="form-control"
                readOnly={!isEditing}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">الوصف:</label>
              <textarea
                name="description"
                value={profile?.description || ""}
                onChange={handleInputChange}
                className="form-control"
                readOnly={!isEditing}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">الموقع الإلكتروني:</label>
              <input
                type="url"
                name="websiteUrl"
                value={profile?.websiteUrl || ""}
                onChange={handleInputChange}
                className="form-control"
                readOnly={!isEditing}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">فيسبوك:</label>
              <input
                type="url"
                name="facebookLink"
                value={profile?.facebookLink || ""}
                onChange={handleInputChange}
                className="form-control"
                readOnly={!isEditing}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">إنستجرام:</label>
              <input
                type="url"
                name="instagramLink"
                value={profile?.instagramLink || ""}
                onChange={handleInputChange}
                className="form-control"
                readOnly={!isEditing}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">رقم التسجيل:</label>
              <input
                type="text"
                name="registrationNumber"
                value={profile?.registrationNumber || ""}
                onChange={handleInputChange}
                className="form-control"
                readOnly={!isEditing}
              />
            </div>
          </div>
          <div className=" mt-4">
            <button
              onClick={() => setIsEditing((prev) => !prev)}
              className="btn text-white ms-2"
              style={{ backgroundColor: isEditing ? "#dc3545" : "#214D97" }}
            >
              {isEditing ? "حذف التعديلات" : "تعديل بيانات المؤسسة"}
            </button>
            {isEditing && (
              <button onClick={handleUpdateProfile} className="btn btn-success">
                حفظ التعديلات
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
