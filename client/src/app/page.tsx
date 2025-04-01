import buildClient from "@/api/buildClient";

export default async function Home() {
  const axios = await buildClient();

  try {
    const response = await axios.get("/api/users/currentuser");
    if (response.data.currentUser) {
      console.log("Usuário atual: ", response.data.currentUser);
    }
  } catch (error) {
    console.error("Erro ao buscar o usuário atual:", error);
  }

  return <h1>Olá mundo </h1>;
}
