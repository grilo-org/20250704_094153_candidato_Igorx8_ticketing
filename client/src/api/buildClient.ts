import { cookies } from "next/headers";
import axios from "axios";

async function buildClient() {
  const cks = await cookies();

  const axiosInstance = axios.create({
    baseURL: "http://easytickets.dev",
    headers: {
      Cookie: cks.toString(),
    },
  });

  return axiosInstance;
}

export default buildClient;
