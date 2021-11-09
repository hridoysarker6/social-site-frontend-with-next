import { UserProvider } from "../context";

import Nav from "../components/nav";
import "bootstrap/dist/css/bootstrap.min.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";
import "../public/css/style.css";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Nav />
      <ToastContainer position="top-center" />
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
