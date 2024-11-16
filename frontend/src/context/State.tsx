import { createContext, useState } from "react";
import axios from "axios";

import Cookie from "js-cookie";

import { jwtDecode } from "jwt-decode";

export const MainContext = createContext(null);

export const MainContextProvider = ({ children }) => {
  const [Loading, setLoading] = useState(false);

  const [file, setFile] = useState<File | null>(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

  const [Videos, setVideos] = useState([]);

  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  const getUserId = (token: string) => {
    const user = jwtDecode(token);

    return user;
  };

  const getProcessedVideos = async (token: string) => {
    const res = await axios.get(`${BACKEND_URL}/upload/getAllVideos`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  };

  return (
    <MainContext.Provider
      value={{
        Loading,
        setLoading,
        Videos,
        setVideos,
        file,
        setFile,
        getToken,
        getUserId,
        getProcessedVideos,
        BACKEND_URL,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
