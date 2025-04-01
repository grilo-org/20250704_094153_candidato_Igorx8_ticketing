import { cookies } from "next/headers";
import axios from "axios";

async function buildClient() {
  const cks = await cookies();

  const session = cks.get("session")?.value;

  const axiosInstance = axios.create({
    baseURL: "http://easytickets.dev",
    headers: {
      Cookie: `session=${session}`,
    },
  });

  return axiosInstance;
}

export default buildClient;
