import React, { useEffect, useState } from "react";
import { Modal, Form, Input, message, Upload, Select, Pagination } from "antd";
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
    {previewImage && (
      <div>
        <img src={previewImage} alt="preview" className="mt-2 w-100 rounded" />
      </div>
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

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8); // 8 cards per page
  const [totalCount, setTotalCount] = useState(0); // Total number of opportunities

  const fetchOpportunities = async (pageIndex = 1, pageSize = 8) => {
    setLoading(true);
    try {
      const response = await getOpportunities(pageIndex, pageSize);
      setOpportunities(response.data.data);
      setTotalCount(response.data.count); // Set total count for pagination
    } catch (error) {
      message.error("فشل في تحميل البيانات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Interceptor();
    fetchOpportunities(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const openModal = (opportunity = null) => {
    setEditingOpportunity(opportunity);
    setImagePreview(opportunity?.OpportunityPicture);
    form.resetFields();
    if (opportunity) {
      form.setFieldsValue({
        title: opportunity.title,
        location: opportunity.location,
        startDate: opportunity.startDate,
        endDate: opportunity.endDate,
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
      const finalValues = {
        ...values,
        pictureUrl: imagePreview,
        Requirements: "shrakey and 5 others",
      };

      if (editingOpportunity) {
        await updateOpportunity(editingOpportunity.id, finalValues);
        message.success("تم التحديث بنجاح");
      } else {
        await createOpportunity(finalValues);
        message.success("تمت الإضافة بنجاح");
      }

      setIsModalVisible(false);
      fetchOpportunities(currentPage, pageSize);
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
      fetchOpportunities(currentPage, pageSize);
    } catch (error) {
      message.error("فشل في الحذف");
    }
  };

  const handlePageChange = (page, newPageSize) => {
    setCurrentPage(page);
    setPageSize(newPageSize);
  };

  return (
    <>
      <div
        className="d-flex m-auto align-items-center justify-content-between"
        style={{ width: "90%" }}
      >
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
            إضافة فرصة <i className="fa-regular fa-square-plus"></i>
          </button>
        </div>

        <h2 className="text-2xl font-bold">فرص التطوع</h2>
      </div>
      <div className="container mx-auto m-1" dir="rtl">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {opportunities
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
            .map((opportunity) => (
              <div key={opportunity.id} className="col d-flex flex-column">
                <div className="p-3 border-0 bg-light shadow rounded-4">
                  <img
                    src={opportunity.pictureUrl || avatar}
                    alt={opportunity.title}
                    className="card-img-top rounded-3"
                    style={{ height: "110px", objectFit: "cover" }}
                  />

                  <div className="d-flex flex-column pt-3">
                    <h5 className="card-title text-center mb-1 text-truncate fw-bold">
                      {opportunity.title}
                    </h5>

                    <p className="card-text text-center mb-1 text-truncate">
                      {opportunity.description || "لا يوجد وصف متاح"}
                    </p>

                    <div className="d-flex flex-column align-items-center justify-content-between text-dark mb-3 small">
                      <span>{opportunity.location}</span>
                      <span>{opportunity.category}</span>
                      <span>{opportunity.maxVolunteers} متطوع</span>
                    </div>

                    <div className="d-flex justify-content-center gap-3">
                      <button
                        className="btn btn-primary bg-primary text-white"
                        onClick={() => openModal(opportunity)}
                      >
                        تعديل
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(opportunity.id)}
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-center mt-4">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalCount}
            onChange={handlePageChange}
            showSizeChanger
            // pageSizeOptions={["8", "16", "24"]}
          />
        </div>
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
            label="اسم الفرصة"
            rules={[{ required: true, message: "الرجاء إدخال اسم الفرصة" }]}
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
    </>
  );
};

export default VolunteerOpportunities;
