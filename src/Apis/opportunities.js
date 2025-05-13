import axios from "axios";

const baseUrl = "https://wezaa.runasp.net";

export const createOpportunity = async (opportunity) => {
  const formData = new FormData();

  Object.entries(opportunity).forEach(([key, value]) => {
    if (key === "OpportunityPicture" && value instanceof File) {
      formData.append("OpportunityPicture", value);
    } else {
      formData.append(key, value);
    }
  });

  const response = await axios.post(`${baseUrl}/Opportunities`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// export const getOpportunities = async (pageIndex = 1, pageSize = 8) => {
//   const response = await axios.get(`${baseUrl}/Opportunities`, {
//     params: {
//       pageIndex: pageIndex,
//       pageSize: pageSize,
//     },
//   });
//   return response;
// };

export const getOpportunities = async () => {
  const response = await axios.get(`${baseUrl}/Opportunities/all`);
  return response;
};

export const deleteOpportunity = async (id) => {
  const response = await axios.delete(`${baseUrl}/Opportunities/${id}`);
  return response;
};

export const updateOpportunity = async (id, opportunity) => {
  const formData = new FormData();

  Object.entries(opportunity).forEach(([key, value]) => {
    if (key === "OpportunityPicture" && value instanceof File) {
      formData.append("OpportunityPicture", value);
    } else {
      formData.append(key, value);
    }
  });

  const response = await axios.put(`${baseUrl}/Opportunities/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
