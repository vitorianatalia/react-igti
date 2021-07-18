import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 10000,
});

export async function getYear(url) {
    const {data} = await axiosInstance.get(url);
    return data;
}
