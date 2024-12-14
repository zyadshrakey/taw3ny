import { useState } from "react";
import { Form, Input, Button, Steps, message, ConfigProvider } from "antd";
import { requestOtp, confirmResetPassword } from "../../Apis/resetPassword";
import restPassword from "./../../assets/forgot_password.png";
import mailSent from "./../../assets/mail_sent.png";
import completing from "./../../assets/completing.png";
import { Link } from "react-router-dom";

const { Step } = Steps;

const Theme = {
  token: {
    colorPrimary: "#214D97",
  },
};

const ResetPassword = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleRequestOtp = async (values) => {
    setLoading(true);
    try {
      await requestOtp(values.email);
      setCurrentStep(1);
    } catch (error) {
      console.log("Error requesting OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      console.log(otp);
      // setOtp();
      setCurrentStep(2);
    } catch (error) {
      console.log("Error verifying OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      message.error("كلمة المرور غير متطابقة");
      return;
    }
    setLoading(true);
    try {
      await confirmResetPassword(email, otp, newPassword, confirmPassword);
      message.success("كلمة المرور تم تعيينها بنجاح");
      setCurrentStep(3);
    } catch (error) {
      console.log("Error resetting password:", error);
    } finally {
      setLoading(false);
    }
  };

  const getImageForStep = () => {
    switch (currentStep) {
      case 0:
        return restPassword;
      case 1:
        return mailSent;
      case 2:
        return completing;
      default:
        return restPassword;
    }
  };

  return (
    <div className=" vh-100 d-flex justify-content-center">
      <div className="row w-100 ">
        <div className="col-md-6 px-5 d-flex align-items-center">
          <div>
            <ConfigProvider theme={Theme}>
              <Steps current={currentStep} className="mb-5">
                <Step title="طلب الكود" />
                <Step title="التحقق من الكود" />
                <Step title="إعادة تعيين كلمة المرور" />
              </Steps>
            </ConfigProvider>
            {currentStep === 0 && (
              <Form onFinish={handleRequestOtp} layout="vertical">
                <Form.Item
                  name="email"
                  label="البريد الإلكتروني"
                  rules={[
                    {
                      required: true,
                      message: "الرجاء إدخال بريدك الإلكتروني",
                    },
                    {
                      type: "email",
                      message: "الرجاء إدخال بريد إلكتروني صالح",
                    },
                  ]}
                >
                  <Input
                    placeholder="example@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                  />
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-100 btn"
                  style={{ backgroundColor: "#214D97", color: "white" }}
                  loading={loading}
                >
                  إرسال الكود
                </Button>
              </Form>
            )}

            {currentStep === 1 && (
              <Form layout="vertical">
                <Form.Item
                  name="otp"
                  label="الكود المرسل"
                  rules={[{ required: true, message: "الرجاء إدخال الكود" }]}
                >
                  <Input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="form-control"
                  />
                </Form.Item>
                <Button
                  type="primary"
                  onClick={handleVerifyOtp}
                  className="w-100 btn"
                  style={{
                    backgroundColor: "#214D97",
                    color: "white",
                  }}
                  loading={loading}
                >
                  تحقق من الكود
                </Button>
              </Form>
            )}

            {currentStep === 2 && (
              <Form layout="vertical">
                <Form.Item
                  name="newPassword"
                  label="كلمة المرور الجديدة"
                  rules={[
                    {
                      required: true,
                      message: "الرجاء إدخال كلمة المرور الجديدة",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="أدخل كلمة المرور الجديدة"
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    className="form-control"
                  />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  label="تأكيد كلمة المرور"
                  rules={[
                    { required: true, message: "الرجاء تأكيد كلمة المرور" },
                  ]}
                >
                  <Input.Password
                    placeholder="تأكيد كلمة المرور"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    className="form-control"
                  />
                </Form.Item>
                <Button
                  type="primary"
                  onClick={handleResetPassword}
                  className="w-100 btn"
                  style={{ backgroundColor: "#214D97", color: "white" }}
                  loading={loading}
                >
                  إعادة تعيين كلمة المرور
                </Button>
              </Form>
            )}

            {currentStep === 3 && (
              <div className="text-center">
                <h2>تم إعادة تعيين كلمة المرور بنجاح!</h2>
                <Link to="/login">
                  <Button
                    type="primary"
                    className="btn"
                    style={{ backgroundColor: "#214D97", color: "white" }}
                  >
                    العودة إلى صفحة تسجيل الدخول
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div
          style={{ backgroundColor: "#214D97" }}
          className="col-md-6 d-flex align-items-center justify-content-center"
        >
          <img
            src={getImageForStep()}
            alt="Reset Password"
            className="w-75 max-w-md"
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
