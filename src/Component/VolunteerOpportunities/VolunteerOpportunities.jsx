import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  message,
  Upload,
  Button,
  Select,
  Pagination,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  getOpportunities,
  createOpportunity,
  deleteOpportunity,
  updateOpportunity,
} from "../../Apis/opportunities";
import avatar from "../../assets/volunteer-services-bureau logo@2x.png";
import { Interceptor } from "../../Apis/interceptor";

const VolunteerOpportunities = () => {
  const [allOpportunities, setAllOpportunities] = useState([]); // لتخزين جميع الفرص
  const [opportunities, setOpportunities] = useState([]); // لتخزين الفرص التي ستعرض في الصفحة الحالية
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState(null);
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8); // عدد الفرص في الصفحة
  const [totalCount, setTotalCount] = useState(0);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    Interceptor();
    fetchOpportunities();
  }, []);

  useEffect(() => {
    // تقسيم الفرص بناءً على الصفحة الحالية وحجم الصفحة
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = currentPage * pageSize;
    setOpportunities(allOpportunities.slice(startIndex, endIndex));
  }, [currentPage, pageSize, allOpportunities]);

  const fetchOpportunities = async () => {
    setLoading(true);
    try {
      const response = await getOpportunities();
      setAllOpportunities(response.data);
      setTotalCount(response.data.length);
    } catch {
      message.error("فشل في تحميل البيانات");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (opportunity = null) => {
    setEditingOpportunity(opportunity);
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
        Requirements: opportunity.requirements,
      });
      setPreviewUrl(opportunity.pictureUrl || null);
      setImageFile(null);
    }

    setIsModalVisible(true);
  };

  const handleSave = async (values) => {
    try {
      const finalValues = {
        ...values,
      };

      if (imageFile) {
        finalValues.OpportunityPicture = imageFile;
      }

      if (editingOpportunity) {
        await updateOpportunity(editingOpportunity.id, finalValues);
        message.success("تم التحديث بنجاح");
      } else {
        await createOpportunity(finalValues);
        message.success("تمت الإضافة بنجاح");
      }

      setIsModalVisible(false);
      setImageFile(null);
      setPreviewUrl(null);
      fetchOpportunities();
    } catch {
      message.error("تاكد من ملئ جميع الحقول");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOpportunity(id);
      message.success("تم الحذف بنجاح");
      fetchOpportunities();
    } catch {
      message.error("فشل في الحذف");
    }
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setImageFile(null);
    setPreviewUrl(null);
  };

  return (
    <>
      <div
        className="d-flex m-auto mt-2 align-items-center justify-content-between"
        style={{ width: "90%" }}
      >
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

        <h2 className="text-2xl font-bold">فرص التطوع</h2>
      </div>

      <div className="container mx-auto" dir="rtl">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-2 gx-4">
          {opportunities.map((opportunity) => (
            <div key={opportunity.id} className="col d-flex flex-column">
              <div className="p-3 border-0 bg-light shadow rounded-4">
                <img
                  src={opportunity.pictureUrl || avatar}
                  alt={opportunity.title}
                  className="card-img-top rounded-3"
                  style={{ height: "110px", objectFit: "conatin" }}
                />

                <div className="d-flex flex-column pt-2">
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
                      className="btn text-white"
                      style={{ backgroundColor: "#214D97" }}
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

        <div className="d-flex justify-content-center mt-4">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalCount}
            onChange={handlePageChange}
            // showSizeChanger
            // pageSizeOptions={["8", "16", "24"]}
            // showTotal={(total) => `العدد الإجمالي: ${total}`}
          />
        </div>
      </div>

      <Modal
        title={editingOpportunity ? "تعديل الفرصة" : "إضافة فرصة"}
        open={isModalVisible}
        onCancel={closeModal}
        onOk={() => form.submit()}
        okText="حفظ"
        cancelText="إغلاق"
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="title"
              label="اسم الفرصة"
              rules={[{ required: true, message: "الرجاء إدخال اسم الفرصة" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="category"
              label="الفئة"
              rules={[{ required: true, message: "الرجاء اختيار الفئة" }]}
            >
              <Select placeholder="اختر الفئة">
                {[
                  "Education",
                  "Health",
                  "Relief",
                  "Environment",
                  "CommunityDevelopment",
                  "ArtsAndCulture",
                ].map((cat) => (
                  <Select.Option key={cat} value={cat}>
                    {cat}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="location"
              label="الموقع"
              rules={[{ required: true, message: "الرجاء إدخال الموقع" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="Requirements"
              label="المتطلبات"
              rules={[{ required: true, message: "الرجاء إدخال المتطلبات" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="startDate"
              label="تاريخ البداية"
              rules={[
                { required: true, message: "الرجاء إدخال تاريخ البداية" },
              ]}
            >
              <Input type="date" />
            </Form.Item>

            <Form.Item
              name="endDate"
              label="تاريخ النهاية"
              rules={[
                { required: true, message: "الرجاء إدخال تاريخ النهاية" },
              ]}
            >
              <Input type="date" />
            </Form.Item>

            <Form.Item
              name="totalHours"
              label="عدد الساعات المطلوبة"
              rules={[{ required: true, message: "الرجاء إدخال العدد" }]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item
              name="maxVolunteers"
              label="عدد المتطوعين المطلوب"
              rules={[{ required: true, message: "الرجاء إدخال العدد" }]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item name="description" label="الوصف">
              <Input.TextArea />
            </Form.Item>

            <Form.Item label="الصورة">
              <Upload
                beforeUpload={(file) => {
                  setImageFile(file);
                  setPreviewUrl(URL.createObjectURL(file));
                  return false;
                }}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />}>تحميل صورة</Button>
              </Upload>
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="preview"
                  style={{ width: "100px", marginTop: "10px" }}
                />
              )}
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default VolunteerOpportunities;
