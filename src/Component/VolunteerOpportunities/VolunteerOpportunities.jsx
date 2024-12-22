import React, { useEffect, useState } from "react";
import { Modal, Form, Input, message, DatePicker, Upload, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import {
  getOpportunities,
  createOpportunity,
  deleteOpportunity,
  updateOpportunity,
} from "../../Apis/opportunities";
import { Interceptor } from "../../Apis/interceptor";

const { RangePicker } = DatePicker;

const ActionButton = ({ label, onClick, style }) => (
  <button
    className="btn fw-bold"
    style={{
      padding: "0 20px",
      height: "40px",
      backgroundColor: "#214D97",
      color: "#fff",
      ...style,
    }}
    onClick={onClick}
  >
    {label}
  </button>
);

const ImageUploader = ({ onUpload, previewImage }) => (
  <div>
    <Upload
      beforeUpload={() => false}
      showUploadList={false}
      onChange={onUpload}
    >
      <button
        type="button"
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        <PlusOutlined /> تحميل
      </button>
    </Upload>
    {previewImage && (
      <img
        src={previewImage}
        alt="Uploaded Preview"
        className="mt-2 w-full h-40 object-cover rounded"
      />
    )}
  </div>
);

const VolunteerOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [form] = Form.useForm();

  const fetchOpportunities = async () => {
    setLoading(true);
    try {
      const response = await getOpportunities();
      setOpportunities(response.data.data);
    } catch (error) {
      message.error("فشل في تحميل البيانات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Interceptor();
    fetchOpportunities();
  }, []);

  const openModal = (opportunity = null) => {
    setEditingOpportunity(opportunity);
    setImagePreview(opportunity?.pictureUrl || null);
    form.resetFields();
    if (opportunity) {
      form.setFieldsValue({
        ...opportunity,
        duration: [moment(opportunity.startDate), moment(opportunity.endDate)],
      });
    }
    setIsModalVisible(true);
  };

  const handleSave = async (values) => {
    try {
      const { duration, ...restValues } = values;
      const dataToSend = {
        ...restValues,
        startDate: duration[0].format("YYYY-MM-DD"),
        endDate: duration[1].format("YYYY-MM-DD"),
        pictureUrl: imagePreview,
      };

      if (editingOpportunity) {
        await updateOpportunity(editingOpportunity.id, dataToSend);
        message.success("تم التحديث بنجاح");
      } else {
        await createOpportunity(dataToSend);
        message.success("تمت الإضافة بنجاح");
      }

      setIsModalVisible(false);
      fetchOpportunities();
    } catch (error) {
      message.error("فشل في الحفظ");
    }
    
  };

  const handleImageUpload = ({ file }) => {
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="container mx-auto mt-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
          <div className="btn"><button className="p-3" style={{backgroundColor:'#214D97', color:'#F5F5F5', border:'none', borderRadius:'8px'}} onClick={()=>openModal()}>إضافة فرصة <i class="fa-regular fa-square-plus"></i></button></div>
          
        <h2 className="text-2xl font-bold mb-4">فرص التطوع</h2>
      </div>

      {loading ? (
        <Spin tip="جاري التحميل..." className="my-4" />
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mt-4">
          {opportunities.map((opportunity) => (
            <div
              key={opportunity.id}
              className="col  d-flex flex-column"
            >
              <div className="card h-100 px-2" style={{border:'none' ,backgroundColor:'#F5F5F5', borderRadius:'24px'}}>
                {opportunity.pictureUrl && (
                  <img
                    src={opportunity.pictureUrl}
                    alt={opportunity.title}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover", boxSizing:'content-box', borderRadius:'50%' }}
                  />
                )}

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-center mb-1">
                    {opportunity.title}
                  </h5>

                  <p
                    className="card-text overflow-hidden text-center mb-4"
                    style={{
                      width: "100%",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {opportunity.description || "لا يوجد وصف متاح"}
                  </p>

                  <div className="d-flex flex-column align-items-center justify-content-between text-sm text-dark mb-4">
                    <span>{opportunity.location}</span>
                    <span>{opportunity.category}</span>
                    <span>{opportunity.maxVolunteers} متطوع</span>
                  </div>

                  <div className="d-flex justify-content-center gap-3">
                    <button
                      className="btn btn-primary"
                      onClick={() => openModal(opportunity)}
                      style={{backgroundColor:'#214D97'}}
                    >
                      تعديل
                    </button>
                    <button
                      className="btn"
                      onClick={() => deleteOpportunity(opportunity.id)}
                      style={{border:'1px solid #972121', color:'#972121', fontSize:'20px'}}
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        title={editingOpportunity ? "تعديل الفرصة" : "إضافة فرصة"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item
            name="title"
            label="المحافظة"
            rules={[{ required: true, message: "الرجاء إدخال العنوان" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="location"
            label="الموقع"
            rules={[{ required: true, message: "الرجاء إدخال الموقع" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="duration"
            label="مدة الفرصة"
            rules={[{ required: true, message: "الرجاء اختيار المدة" }]}
          >
            <RangePicker format="YYYY-MM-DD" />
          </Form.Item>

          <Form.Item
            name="maxVolunteers"
            label="عدد المتطوعين المطلوب"
            rules={[{ required: true, message: "الرجاء إدخال العدد المطلوب" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="category"
            label="الفئة"
            rules={[{ required: true, message: "الرجاء إدخال الفئة" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="description" label="الوصف">
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item label="تحميل الصورة">
            <ImageUploader
              onUpload={handleImageUpload}
              previewImage={imagePreview}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default VolunteerOpportunities;
