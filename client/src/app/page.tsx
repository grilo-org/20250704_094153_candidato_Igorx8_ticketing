"use client";
import { useUser } from "@/providers/UserProvider";

export default function Home() {
  const { currentUser } = useUser();
  try {
    if (currentUser) {
      return <h1> You are signed in</h1>;
    }

    return <h1> You are not signed in</h1>;
  } catch (error) {
    console.error("Error fetching current user:", error);
  }
}
