import { useAuth } from "@clerk/clerk-react";
import { useEffect, useRef } from "react";
import api from "../lib/axios";

function useAuthReq() {
  const { isSignedIn, getToken, isLoaded } = useAuth();
  const authRef = useRef({ isSignedIn, getToken });

  useEffect(() => {
    authRef.current = { isSignedIn, getToken };
  }, [isSignedIn, getToken]);

  useEffect(() => {
    const interceptor = api.interceptors.request.use(async (config) => {
      const { isSignedIn, getToken } = authRef.current;
      if (isSignedIn) {
        const token = await getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    });

    return () => {
      api.interceptors.request.eject(interceptor);
    };
  }, []);

  return {
    isSignedIn,
    isClerkLoaded: isLoaded,
  };
}

export default useAuthReq;
