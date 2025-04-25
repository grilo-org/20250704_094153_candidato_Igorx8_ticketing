"use client";
import useRequest from "@/hooks/use-request";
import { useUser } from "@/providers/UserProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SignOut = () => {
  const { push } = useRouter();
  const { setCurrentUser } = useUser();
  const { doRequest } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => {
      setCurrentUser(null);
      push("/");
    },
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <div> Signing you out . . .</div>;
};

export default SignOut;
