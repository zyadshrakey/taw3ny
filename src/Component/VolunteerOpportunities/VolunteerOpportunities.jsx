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
  Tooltip,
} from "antd";
import { UploadOutlined, EditOutlined, DeleteOutlined, PlusSquareOutlined } from "@ant-design/icons";
import {
  getOpportunities,
  createOpportunity,
  deleteOpportunity,
  updateOpportunity,
} from "../../Apis/opportunities";
import avatar from "../../assets/volunteer-services-bureau logo@2x.png";
import { Interceptor } from "../../Apis/interceptor";
import Loader from "../Loader/Loader";

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
        className="d-flex m-auto align-items-center justify-content-between py-5"
        style={{ width: "90%" }}
      >
        <button
          className="p-3 shadow"
          style={{
            backgroundColor: "#214D97",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            fontWeight: "bold",
            fontSize: "1.1rem",
            boxShadow: "0 4px 16px rgba(33,77,151,0.08)",
            transition: "all 0.3s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = "#fff";
            e.currentTarget.style.color = "#214D97";
            e.currentTarget.style.border = "2px solid #214D97";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = "#214D97";
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.border = "none";
          }}
          onClick={() => openModal()}
        >
          <PlusSquareOutlined style={{ fontSize: "1.3rem", marginLeft: 8 }} />&nbsp;
           إضافة فرصة
        </button>
        <h2 className="text-2xl fw-bold" style={{ color: "#214D97" }}>فرص التطوع</h2>
      </div>

      <div className="container mx-auto " dir="rtl">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center py-5">
            <Loader />
          </div>
        ) : opportunities.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <img src={avatar} alt="no opportunities" style={{ width: 120, opacity: 0.3 }} />
            <div className="mt-3">لا توجد فرص متاحة حالياً</div>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {opportunities.map((opportunity) => (
              <div
                key={opportunity.id}
                className="col"
                style={{
                  transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1), box-shadow 0.4s cubic-bezier(0.4,0,0.2,1)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.firstChild.style.transform = "translateY(-8px) scale(1.025)";
                  e.currentTarget.firstChild.style.boxShadow = "0 12px 32px rgba(33,77,151,0.13)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.firstChild.style.transform = "none";
                  e.currentTarget.firstChild.style.boxShadow = "0 2px 8px rgba(33,77,151,0.05)";
                }}
              >
                <div
                  className="card shadow border-0 rounded-4 overflow-hidden h-100"
                  style={{
                    minHeight: 370,
                    transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1), box-shadow 0.4s cubic-bezier(0.4,0,0.2,1)",
                  }}
                >
                  <div
                    className="card-img-top position-relative"
                    style={{ height: "140px", overflow: "hidden", background: "#f6f8fa" }}
                  >
                    <img
                      src={opportunity.pictureUrl || avatar}
                      alt={opportunity.title}
                      className="w-100 h-100 object-fit-cover"
                      style={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}
                    />
                    <span
                      className="position-absolute px-3 py-1"
                      style={{
                        left: 0,
                        top: 0,
                        background: "rgba(33,77,151,0.85)",
                        color: "#fff",
                        borderBottomRightRadius: "1rem",
                        fontWeight: "bold",
                        fontSize: "1rem",
                      }}
                    >
                      {opportunity.title}
                    </span>
                  </div>
                  <div className="d-flex flex-column p-3">
                    <div className="mb-2 text-truncate" style={{ color: "#22223b", fontWeight: 500 }}>
                      {opportunity.description || "لا يوجد وصف متاح"}
                    </div>
                    <div className="d-flex flex-wrap gap-2 mb-2 small text-secondary">
                      <span><i className="fa-solid fa-location-dot ms-1"></i>{opportunity.location}</span>
                      <span><i className="fa-solid fa-layer-group ms-1"></i>{opportunity.category}</span>
                      <span><i className="fa-solid fa-users ms-1"></i>{opportunity.maxVolunteers} متطوع</span>
                    </div>
                    <div className="d-flex flex-wrap gap-2 mb-2 small text-secondary">
                      <span><i className="fa-solid fa-calendar-days ms-1"></i>{opportunity.startDate} - {opportunity.endDate}</span>
                      <span><i className="fa-solid fa-clock ms-1"></i>{opportunity.totalHours} ساعة</span>
                    </div>
                    <div className="d-flex gap-2 mt-auto justify-content-end">
                      <Tooltip title="تعديل">
                        <Button
                          icon={<EditOutlined />}
                          style={{
                            background: "#f3f4f6",
                            color: "#214D97",
                            border: "none",
                            borderRadius: "8px",
                            fontWeight: "bold",
                            transition: "background 0.2s, color 0.2s",
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = "#214D97";
                            e.currentTarget.style.color = "#fff";
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = "#f3f4f6";
                            e.currentTarget.style.color = "#214D97";
                          }}
                          onClick={() => openModal(opportunity)}
                        />
                      </Tooltip>
                      <Tooltip title="حذف">
                        <Button
                          icon={<DeleteOutlined />}
                          danger
                          style={{
                            borderRadius: "8px",
                            fontWeight: "bold",
                          }}
                          onClick={() => handleDelete(opportunity.id)}
                        />
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="d-flex justify-content-center mt-4">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalCount}
            onChange={handlePageChange}
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
          <div className="row g-3">
            <div className="col-md-6">
              <Form.Item
                name="title"
                label="اسم الفرصة"
                rules={[{ required: true, message: "الرجاء إدخال اسم الفرصة" }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
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
            </div>
            <div className="col-md-6">
              <Form.Item
                name="location"
                label="الموقع"
                rules={[{ required: true, message: "الرجاء إدخال الموقع" }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                name="Requirements"
                label="المتطلبات"
                rules={[{ required: true, message: "الرجاء إدخال المتطلبات" }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                name="startDate"
                label="تاريخ البداية"
                rules={[
                  { required: true, message: "الرجاء إدخال تاريخ البداية" },
                ]}
              >
                <Input type="date" />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                name="endDate"
                label="تاريخ النهاية"
                rules={[
                  { required: true, message: "الرجاء إدخال تاريخ النهاية" },
                ]}
              >
                <Input type="date" />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                name="totalHours"
                label="عدد الساعات المطلوبة"
                rules={[{ required: true, message: "الرجاء إدخال العدد" }]}
              >
                <Input type="number" />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                name="maxVolunteers"
                label="عدد المتطوعين المطلوب"
                rules={[{ required: true, message: "الرجاء إدخال العدد" }]}
              >
                <Input type="number" />
              </Form.Item>
            </div>
            <div className="col-12">
              <Form.Item name="description" label="الوصف">
                <Input.TextArea />
              </Form.Item>
            </div>
            <div className="col-12">
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
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default VolunteerOpportunities;
