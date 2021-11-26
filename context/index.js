import { useState, createContext } from "react";
import axios from "axios";
import router, { useRouter } from "next/router";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, setState] = useState({
    user: {},
    token: "",
  });

  const routere = useRouter();
  const token = state && state.token ? state.token : "";
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  axios.interceptors.response.use(
    function (response) {
      // Do something before request is sent
      return response;
    },
    function (error) {
      // Do something with request error
      let res = error.response;
      // console.log("error dekh", res.config);
      if (res.status == 401 && res.config && !res.config.__isRetryRequest) {
        window.localStorage.removeItem("auth");
        setState(null);
        router.push("/login");
      }
      return Promise.reject(error);
    }
  );

  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
