import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/dist/client/link";
import { useRouter } from "next/router";
import AuthForm from "../components/forms/AuthForm";
import { UserContext } from "../context";
function Login() {
  const [state, setState] = useContext(UserContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(`/login`, {
        email,
        password,
      });
      setState({
        user: data.user,
        token: data.token,
      });

      // save data in localStorage
      window.localStorage.setItem("auth", JSON.stringify(data));
      router.push("/user/dashboard");
    } catch (err) {
      toast.error(err.response?.data);
      setLoading(false);
    }

    // console.log(name, email, password, secret);
  };

  if (state && state.token) router.push("/user/dashboard");
  return (
    <div className="container-fluid">
      <div className="row bg-default-image py-5">
        <div className="col">
          <h1 className="text-center text-light display-2">Login</h1>
        </div>
      </div>

      <div className="row py-5 ">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <AuthForm
                handleSubmit={handleSubmit}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                loading={loading}
                page="login"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <p className="text-center">
            Not Yet Register?
            <Link href="/register">
              <a className="text-primary">Register</a>
            </Link>
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="text-center">
            <Link href="/forgot-password">
              <a className="text-danger">Forgot Password</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
