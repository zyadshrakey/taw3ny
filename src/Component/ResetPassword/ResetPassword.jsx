import { useState } from "react";
import { Form, Input, Button, Steps, message, ConfigProvider } from "antd";
import { requestOtp, confirmResetPassword } from "../../Apis/resetPassword";
import restPassword from "./../../assets/forgot_password.png";
import mailSent from "./../../assets/mail_sent.png";
import completing from "./../../assets/completing.png";
import { Link, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handlegoBack = () => {
    navigate(-1);
  };

  const handleRequestOtp = async () => {
    setLoading(true);
    try {
      await requestOtp(email);
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
      setCurrentStep(2);
    } catch (error) {
      console.log("Error verifying OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword || newPassword === "") {
      message.error("كلمه المرور غير صحيحه");
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
    <div className="d-flex w-100 h-100 flex-md-row flex-column justify-content-center">
      <div className="row w-100 h-100">
        <div className="col-md-6 h-100 px-5 d-flex justify-content-center">
          <div>
            <ConfigProvider theme={Theme}>
              <Steps
                current={currentStep}
                style={{ visibility: "hidden" }}
                className="mb-5"
              >
                <Step title="طلب الكود" />
                <Step title="التحقق من الكود" />
                <Step title="إعادة تعيين كلمة المرور" />
              </Steps>
            </ConfigProvider>

            <div className="d-flex align-items-start mb-5 back">
              <button
                className="btn"
                style={{
                  color: "rgba(33, 77, 151, 1)",
                  border: "2px solid rgba(33, 77, 151, 1)",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
                onClick={handlegoBack}
              >
                <i class="fa-solid fa-chevron-left"></i> رجوع
              </button>
            </div>

            <div className="d-flex flex-column gap-2 w-80 mb-5 justify-content-center align-items-center">
              <div>
                <h1
                  style={{
                    fontWeight: "400",
                    fontSize: "40px",
                    lineHeight: "56px",
                    textAlign: "center",
                  }}
                >
                  استعادة كلمة المرور ؟
                </h1>
              </div>
              <div>
                <p
                  style={{
                    fontWeight: "200",
                    fontSize: "20px",
                    lineHeight: "28px",
                    alignItems: "center",
                  }}
                >
                  يرجى إدخال بريدك الإلكتروني سنرسل لك رابطًا لإعادة تعيين كلمة
                  المرور.
                </p>
              </div>
            </div>

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
                    placeholder="البريد الإلكترونى"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control w-100"
                    style={{
                      paddingRight: "40px",
                      border: "1px solid #777777",
                      height: "48px",
                      width: "503px",
                      borderRadius: "16px",
                    }}
                    dir="rtl"
                  />
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="btn w-100 mt-2"
                  style={{
                    backgroundColor: "#214D97",
                    color: "white",
                    borderRadius: "24px",
                    height: "48px",
                  }}
                  loading={loading}
                >
                  إرسال
                </Button>
              </Form>
            )}

            {currentStep === 1 && (
              <Form layout="vertical" onFinish={handleVerifyOtp}>
                <Form.Item
                  name="otp"
                  label="الكود المرسل"
                  rules={[{ required: true, message: "الرجاء إدخال الكود" }]}
                >
                  <Input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="form-control w-100"
                    style={{
                      paddingRight: "40px",
                      border: "1px solid #777777",
                      height: "48px",
                      width: "503px",
                      borderRadius: "16px",
                    }}
                    dir="rtl"
                  />
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-100 btn"
                  style={{
                    backgroundColor: "#214D97",
                    color: "white",
                    borderRadius: "24px",
                    height: "48px",
                  }}
                  loading={loading}
                >
                  تحقق من الكود
                </Button>
              </Form>
            )}

            {currentStep === 2 && (
              <Form layout="vertical" onFinish={handleResetPassword}>
                <Form.Item
                  name="newPassword"
                  label="كلمة المرور الجديدة"
                  rules={[
                    {
                      required: true,
                      message: "الرجاء إدخال كلمة المرور الجديدة",
                    },
                    {
                      min: 6,
                      message: "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="أدخل كلمة المرور الجديدة"
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    className="form-control w-100"
                    style={{
                      paddingRight: "40px",
                      border: "1px solid #777777",
                      height: "48px",
                      width: "503px",
                      borderRadius: "16px",
                    }}
                    dir="rtl"
                  />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  label="تأكيد كلمة المرور"
                  dependencies={["newPassword"]}
                  rules={[
                    {
                      required: true,
                      message: "الرجاء تأكيد كلمة المرور",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("كلمتا المرور غير متطابقتين")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    placeholder="تأكيد كلمة المرور"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    className="form-control w-100"
                    style={{
                      paddingRight: "40px",
                      border: "1px solid #777777",
                      height: "48px",
                      width: "503px",
                      borderRadius: "16px",
                      fontWeight: "400",
                    }}
                    dir="rtl"
                  />
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-100 btn"
                  style={{
                    backgroundColor: "#214D97",
                    color: "white",
                    borderRadius: "24px",
                    height: "48px",
                  }}
                  loading={loading}
                >
                  إعادة تعيين كلمة المرور
                </Button>
              </Form>
            )}

            {currentStep === 3 && (
              <div className="text-center">
                <h2>!تم إعادة تعيين كلمة المرور بنجاح</h2>
                <Link to="/login">
                  <Button
                    type="primary"
                    className="btn py-2 w-100 my-3 px-4 d-flex align-items-center justify-content-center"
                    style={{
                      backgroundColor: "#214D97",
                      color: "white",
                      borderRadius: "24px",
                      height: "48px",
                      textDecoration: "none",
                    }}
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
          className="col-md-6 vh-100 me-0 d-flex align-items-center justify-content-center"
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
