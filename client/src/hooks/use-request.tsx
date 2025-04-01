import axios, { AxiosError } from "axios";
import { ReactElement, useState } from "react";

type useRequestProps = {
  url: string;
  method: "get" | "post" | "put" | "delete";
  body: object;
  onSuccess?: (data: object) => void;
};

const useRequest = ({ url, method, body, onSuccess }: useRequestProps) => {
  const [errors, setErrors] = useState<ReactElement | null>(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        const errors = e.response?.data?.errors;
        if (errors && errors.length > 0) {
          setErrors(
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <ul>
                {errors.map((err: { message: string }, index: number) => (
                  <li key={index} className="mb-1">
                    {err.message}
                  </li>
                ))}
              </ul>
            </div>
          );
        }
      }
    }
  };

  return { doRequest, errors };
};

export default useRequest;
