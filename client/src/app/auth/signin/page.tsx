"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import useRequest from "@/hooks/use-request";
import { useUser } from "@/providers/UserProvider";
import { IUser } from "@/interfaces/IUser";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { push } = useRouter();
  const { setCurrentUser } = useUser();

  const { doRequest, errors } = useRequest({
    url: "/api/users/signin",
    method: "post",
    body: { email, password },
    onSuccess: (user: IUser) => {
      setCurrentUser(user);
      push("/");
    },
  });

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await doRequest();
  };

  return (
    <form
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"
      onSubmit={onSubmit}
    >
      <h1 className="text-2xl font-bold mb-6 text-center text-black">
        Sign in
      </h1>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-black">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-black"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Sign in
      </button>
      {errors}
    </form>
  );
};

export default SignIn;
