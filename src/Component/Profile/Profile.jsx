import React, { useEffect, useState } from "react";
import { message } from "antd";
import {
  getProfileInfo,
  updateProfileInfo,
  deleteProfile,
} from "../../Apis/profile";
import { Interceptor } from "../../Apis/interceptor";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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
      message.success("تم تحديث الملف الشخصي بنجاح!");
      setIsEditing(false);
    } catch (err) {
      message.error("فشل في تحديث الملف الشخصي");
    }
  };

  const handleDeleteProfile = async () => {
    try {
      await deleteProfile();
      message.success("تم حذف الملف الشخصي بنجاح!");
    } catch (err) {
      message.error("فشل في حذف الملف الشخصي");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  if (loading) return <div className="text-center py-5">جاري التحميل...</div>;
  if (error) return <div className="text-center py-5 text-danger">{error}</div>;

  return (
    <div className="container mt-3">
      <div className="card shadow">
        <div className="card-body">
          {/* Profile Picture */}
          <div className="text-center mb-4">
            <img
              src={profile?.pictureUrl}
              alt="Profile"
              className="img-thumbnail rounded-circle"
              style={{ width: "150px", height: "150px" }}
            />
          </div>

          {/* Profile Fields */}
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
                rows="3"
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

          {/* Action Buttons */}
          <div className="d-flex justify-content-between mt-4">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn btn-primary"
            >
              {isEditing ? "إلغاء التعديل" : "تعديل الملف الشخصي"}
            </button>
            {isEditing && (
              <button onClick={handleUpdateProfile} className="btn btn-success">
                حفظ التعديلات
              </button>
            )}
            <button onClick={handleDeleteProfile} className="btn btn-danger">
              حذف الملف الشخصي
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
