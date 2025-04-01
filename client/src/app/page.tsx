import buildClient from "@/api/buildClient";

export default async function Home() {
  const axios = await buildClient();

  try {
    const response = await axios.get("/api/users/currentuser");
    if (response.data.currentUser) {
      return <h1> You are signed in</h1>;
    }

    return <h1> You are not signed in</h1>;
  } catch (error) {
    console.error("Error fetching current user:", error);
  }
}
