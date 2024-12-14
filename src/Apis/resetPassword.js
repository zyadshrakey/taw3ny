import axios from "axios";

const baseUrl = "https://wezaa.runasp.net";

// Request OTP API with email as a raw string
export const requestOtp = async (email) => {
  try {
    const response = await axios.post(
      `${baseUrl}/Auth/request-password-reset`,
      `"${email}"`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Confirm Reset Password API
export const confirmResetPassword = async (
  email,
  otp,
  newPassword,
  confirmPassword
) => {
  try {
    const response = await axios.post(
      `${baseUrl}/Auth/confirm-reset-password`,
      {
        email,
        otp,
        newPassword,
        confirmPassword,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
