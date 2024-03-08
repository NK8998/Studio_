import axios from "axios";

export default async function AxiosFetching(method, endpoint, formData) {
  const backendUrl = "http://localhost:8220";

  try {
    const config = {
      method: method,
      url: `${backendUrl}/${endpoint}`,
      data: formData,
      withCredentials: true,
    };

    const axiosResponse = await axios(config);
    const response = { data: axiosResponse.data, error: null };
    console.log(response);
    return response;
  } catch (error) {
    const response = { data: null, error: error };
    console.log(response);
    return response;
  }
}
