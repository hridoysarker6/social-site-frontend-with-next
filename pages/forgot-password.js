import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/dist/client/link";

import ForgotPasswordForm from "../components/forms/ForgotPasswordForm";

function ForgotPassword() {
  const [email, setEmail] = useState();
  const [newPassword, setNewPassword] = useState();
  const [secret, setSecret] = useState();
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(`/forgot-password`, {
        email,
        newPassword,
        secret,
      });
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        console.log(`forgot password response`, data);
        setEmail("");
        setNewPassword("");
        setSecret("");
        setOk(data.ok);
        setLoading(false);
      }
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };
  return (
    <div className="container-fluid">
      <div className="row bg-default-image py-5">
        <div className="col">
          <h1 className="text-center text-light display-2">Forgot Password</h1>
        </div>
      </div>

      <div className="row py-5 ">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <ForgotPasswordForm
                handleSubmit={handleSubmit}
                email={email}
                setEmail={setEmail}
                newPassword={newPassword}
                setNewPassword={setNewPassword}
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
            <p>You can login with your new password now.</p>
            <Link href="/login">
              <a className="btn btn-primary">Login</a>
            </Link>
          </Modal>
        </div>
      </div>

      {/* <div className="row">
        <div className="col">
          <p className="text-center">
            Alreary Register?
            <Link href="/login">
              <a className="btn btn-primary">Login</a>
            </Link>
          </p>
        </div>
      </div> */}
    </div>
  );
}

export default ForgotPassword;
