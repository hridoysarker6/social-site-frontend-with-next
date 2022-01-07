import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/dist/client/link";
import { useRouter } from "next/router";
import AuthForm from "../components/forms/AuthForm";
import { UserContext } from "../context";

function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [secret, setSecret] = useState();
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [state, setState] = useContext(UserContext);

  useEffect(() => {
    setState(JSON.parse(window.localStorage.getItem("auth")));
  }, []);

  if (state && state.token) router.push("/");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(`/register`, {
        name,
        email,
        password,
        secret,
      });
      setName("");
      setEmail("");
      setPassword("");
      setSecret("");
      setOk(data.ok);
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };
  return (
    <div className="container-fluid">
      <div className="row bg-default-image py-5">
        <div className="col">
          <h1 className="text-center text-light display-2">Register</h1>
        </div>
      </div>

      <div className="row py-5 ">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <AuthForm
                handleSubmit={handleSubmit}
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                secret={secret}
                setSecret={setSecret}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <Modal
            title="Congratulations"
            visible={ok}
            onCancel={() => setOk(false)}
            footer={null}
          >
            <p>You hav registered successfully</p>
            <Link href="/login">
              <a className="btn btn-primary">Login</a>
            </Link>
          </Modal>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <p className="text-center">
            Alreary Register?
            <Link href="/login">
              <a className="btn btn-primary">Login</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
