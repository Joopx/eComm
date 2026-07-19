import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import api from "../lib/axios";

let isInterceptorRegistered = false;
//better to implement web hooks , this one is beginner type
function useAuthReq() {
  //IMPORTATNT STEP TO VERIFY IF USER IS AUTHENTICATED OR NOT UNDER THE BACKEND
  const { isSignedIn, getToken, isLoaded } = useAuth();

  //include token to req headers, interceptor is from axios , its there in docs
  useEffect(() => {
    if (isInterceptorRegistered) return;
    isInterceptorRegistered = true;

    const interceptor = api.interceptors.request.use(async (config) => {
      if (isSignedIn) {
        const token = await getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    });
    return () => {
      api.interceptors.request.eject(interceptor);  //removes inerceptor when no longer used 
      isInterceptorRegistered = false;
    };
  }, [isSignedIn, getToken]);

  return {
    isSignedIn,
    isClerkLoaded: isLoaded,
  };
}

export default useAuthReq;
