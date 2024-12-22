import React, { useEffect, useState } from "react";
import { Modal, Form, Input, message, Upload, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import {
  getOpportunities,
  createOpportunity,
  deleteOpportunity,
  updateOpportunity,
} from "../../Apis/opportunities";
import { Interceptor } from "../../Apis/interceptor";
import avatar from "../../assets/volunteer-services-bureau logo@2x.png";

const ImageUploader = ({ onUpload, previewImage }) => (
  <div>
    <Upload
      beforeUpload={() => false}
      showUploadList={false}
      onChange={onUpload}
    >
      <button type="button" className="bg-blue-500 px-3 py-1 rounded">
        <PlusOutlined /> تحميل
      </button>
    </Upload>
  </div>
);

const VolunteerOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [form] = Form.useForm();

  const fetchOpportunities = async () => {
    setLoading(true);
    try {
      const response = await getOpportunities();
      console.log(response);
      setOpportunities(response.data.data);
      // const image = new Image();
      // image.src = opportunities.pictureUrl;
      // image.onload = () => setImageError(false);
      // image.onerror = () => setImageError(true);
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
        title: opportunity.title,
        location: opportunity.location,
        startDate: moment(opportunity.startDate),
        endDate: moment(opportunity.endDate),
        totalHours: opportunity.totalHours,
        maxVolunteers: opportunity.maxVolunteers,
        category: opportunity.category,
        description: opportunity.description,
      });
    }
    setIsModalVisible(true);
  };

  const handleSave = async (values) => {
    try {
      if (editingOpportunity) {
        await updateOpportunity(editingOpportunity.id, values);
        message.success("تم التحديث بنجاح");
      } else {
        await createOpportunity(values);
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

  const handleDelete = async (id) => {
    try {
      await deleteOpportunity(id);
      message.success("تم الحذف بنجاح");
      fetchOpportunities();
    } catch (error) {
      message.error("فشل في الحذف");
    }
  };

  return (
    <div className="container mx-auto mt-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="btn">
          <button
            className="p-3"
            style={{
              backgroundColor: "#214D97",
              color: "#F5F5F5",
              border: "none",
              borderRadius: "8px",
            }}
            onClick={() => openModal()}
          >
            إضافة فرصة <i class="fa-regular fa-square-plus"></i>
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-4">فرص التطوع</h2>
      </div>

      <Modal
        title={editingOpportunity ? "تعديل الفرصة" : "إضافة فرصة"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
        okText="حفظ"
        cancelText="اغلاق"
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item
            name="title"
            label="المحافظة"
            rules={[{ required: true, message: "الرجاء إدخال العنوان" }]}
          >
            <Input />
          </Form.Item>

          <div className="row">
            <div className="col-md-12 mb-3">
              <Form.Item
                name="location"
                label="الموقع"
                rules={[{ required: true, message: "الرجاء إدخال الموقع" }]}
              >
                <Input className="form-control" />
              </Form.Item>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <Form.Item
                name="startDate"
                label="تاريخ البداية"
                rules={[
                  { required: true, message: "الرجاء إدخال تاريخ البداية" },
                ]}
              >
                <Input type="date" className="form-control" />
              </Form.Item>
            </div>
            <div className="col-md-6 mb-3">
              <Form.Item
                name="endDate"
                label="تاريخ النهاية"
                rules={[
                  { required: true, message: "الرجاء إدخال تاريخ النهاية" },
                ]}
              >
                <Input type="date" className="form-control" />
              </Form.Item>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <Form.Item
                name="totalHours"
                label="عدد الساعات المطلوبة"
                rules={[
                  { required: true, message: "الرجاء إدخال العدد المطلوب" },
                ]}
              >
                <Input type="number" className="form-control" />
              </Form.Item>
            </div>
            <div className="col-md-6 mb-3">
              <Form.Item
                name="maxVolunteers"
                label="عدد المتطوعين المطلوب"
                rules={[
                  { required: true, message: "الرجاء إدخال العدد المطلوب" },
                ]}
              >
                <Input type="number" className="form-control" />
              </Form.Item>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <Form.Item
                name="category"
                label="الفئة"
                rules={[{ required: true, message: "الرجاء اختيار الفئة" }]}
              >
                <Select placeholder="اختر الفئة">
                  {[
                    { id: 0, name: "Education" },
                    { id: 1, name: "Health" },
                    { id: 2, name: "Relief" },
                    { id: 3, name: "Environment" },
                    { id: 4, name: "CommunityDevelopment" },
                    { id: 5, name: "ArtsAndCulture" },
                  ].map((category) => (
                    <Select.Option key={category.id} value={category.name}>
                      {category.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-6 mb-3">
              <Form.Item name="OpportunityPicture" label="تحميل الصورة">
                <ImageUploader
                  onUpload={handleImageUpload}
                  previewImage={imagePreview}
                />
              </Form.Item>
            </div>
          </div>

          <div className="row">
            <div className="col-12 mb-3">
              <Form.Item name="description" label="الوصف">
                <Input.TextArea rows={3} className="form-control" />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default VolunteerOpportunities;
