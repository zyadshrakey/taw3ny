import axios from "axios";

const baseUrl = "https://wezaa.runasp.net";

export const getCharityApplications = async () => {
  const response = await axios.get(`${baseUrl}/VolunteerApplications`);
  return response;
};

export const acceptApplication = async (id) => {
  const response = await axios.put(
    `${baseUrl}/VolunteerApplications/accept/${id}`
  );
  return response;
};

export const rejectApplication = async (id) => {
  const response = await axios.put(
    `${baseUrl}/VolunteerApplications/reject/${id}`
  );
  return response;
};
