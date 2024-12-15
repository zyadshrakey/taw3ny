import axios from "axios";

const baseUrl = "https://wezaa.runasp.net";

export const createOpportunity = async (opportunity) => {
  const response = await axios.post(`${baseUrl}/Opportunities`, opportunity);
  return response;
};

export const getOpportunities = async () => {
  const response = await axios.get(`${baseUrl}/Opportunities`);
  return response;
};

export const deleteOpportunity = async (id) => {
  const response = await axios.delete(`${baseUrl}/Opportunities/${id}`);
  return response;
};

export const updateOpportunity = async (id, opportunity) => {
  const response = await axios.put(
    `${baseUrl}/Opportunities/${id}`,
    opportunity
  );
  return response;
};
