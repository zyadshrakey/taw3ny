import { useEffect, useState } from "react";
import {
  getCharityApplications,
  acceptApplication,
  rejectApplication,
} from "../../Apis/requestes";
import { Interceptor } from "../../Apis/interceptor";
import { Card, Button, Spin, message, Row, Col, Avatar } from "antd";
import { PhoneOutlined } from "@ant-design/icons";

function VolunteerRequestes() {
  const [volunteerData, setVolunteerData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRequestes = async () => {
    setLoading(true);
    try {
      const { data } = await getCharityApplications();
      setVolunteerData(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id) => {
    try {
      await acceptApplication(id);
      message.success("تمت الموافقة على الطلب");
      getRequestes();
    } catch (error) {
      console.error(error);
      message.error("حدث خطأ أثناء الموافقة");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectApplication(id);
      message.success("تم رفض الطلب");
      getRequestes();
    } catch (error) {
      console.error(error);
      message.error("حدث خطأ أثناء الرفض");
    }
  };

  useEffect(() => {
    Interceptor();
    getRequestes();
  }, []);

  return (
    <div className="container mt-5" dir="rtl">
      <h1 className="mb-4 fw-bold">طلبات التطوع</h1>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {volunteerData.map(
            ({ id, volunteerName, volunteerPhone, opportunityName }) => (
              <Col xs={24} sm={12} md={8} lg={6} key={id}>
                <Card
                  className="text-center shadow-sm"
                  cover={
                    <Avatar
                      // src={profileImage}
                      size={100}
                      className="mt-3 mx-auto"
                    />
                  }
                >
                  <h3 className="mt-3 mb-1">{volunteerName}</h3>
                  <h5 className="mb-1">{opportunityName}</h5>
                  <p className="mb-1 d-flex align-items-center justify-content-center">
                    <PhoneOutlined />
                    {volunteerPhone}
                  </p>
                  <div className="d-flex justify-content-around mt-3">
                    <Button
                      type="primary"
                      onClick={() => handleAccept(id)}
                      className="px-4"
                    >
                      قبول
                    </Button>
                    <Button
                      danger
                      onClick={() => handleReject(id)}
                      className="px-4"
                    >
                      رفض
                    </Button>
                  </div>
                </Card>
              </Col>
            )
          )}
        </Row>
      )}
    </div>
  );
}

export default VolunteerRequestes;
