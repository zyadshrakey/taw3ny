import axios from "axios";

const baseUrl = "https://wezaa.runasp.net";

export const getProfileInfo = async () => {
  const response = await axios.get(`${baseUrl}/profile`);
  return response;
};

export const updateProfileInfo = async (profile) => {
  const formData = new FormData();

  for (const key in profile) {
    if (profile.hasOwnProperty(key)) {
      formData.append(key, profile[key]);
    }
  }

  const response = await axios.put(`${baseUrl}/profile/charity`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

export const deleteProfile = async () => {
  const response = await axios.delete(`${baseUrl}/profile`);
  return response;
};

export const updatePhoto = async (file) => {
  const formData = new FormData();
  formData.append("Picture", file);

  return axios.put(`${baseUrl}/Profile/picture`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
