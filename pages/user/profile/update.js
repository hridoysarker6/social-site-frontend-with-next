import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal, Avatar } from "antd";
import Link from "next/dist/client/link";
import { useRouter } from "next/router";
import AuthForm from "../../../components/forms/AuthForm";
import { UserContext } from "../../../context";
import { LoadingOutlined, CameraOutlined } from "@ant-design/icons";
function ProfileUpdate() {
  const [userName, setUserName] = useState("");
  const [about, setAbout] = useState("");

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [secret, setSecret] = useState();
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const [state, setState] = useContext(UserContext);

  useEffect(() => {
    // setState(JSON.parse(window.localStorage.getItem("auth")));
    setUserName(state.user.userName);
    setName(state.user.name);
    setAbout(state.user.about);
    setEmail(state.user.email);
    setImage(state.user.image);
  }, [state && state.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.put(`/profile-update`, {
        userName,
        about,
        name,
        email,
        password,
        secret,
        image,
      });

      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        let auth = JSON.parse(localStorage.getItem("auth"));
        auth.user = data;
        localStorage.setItem("auth", JSON.stringify(auth));
        setState({ ...state, user: data });
        setOk(true);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.response.data);
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    const formdata = new FormData();
    formdata.append("image", file);
    setUploading(true);
    try {
      const { data } = await axios.post("/upload-image", formdata);
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };
  return (
    <div className="container-fluid">
      <div className="row bg-default-image py-5">
        <div className="col">
          <h1 className="text-center text-light display-2">Profile</h1>
        </div>
      </div>

      <div className="row py-5 ">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              {/* image upload */}
              <label className="d-flex justify-content-center h5">
                {image && image.url ? (
                  <Avatar size={30} src={image.url} />
                ) : uploading ? (
                  <LoadingOutlined className="mt-2" />
                ) : (
                  <CameraOutlined className="mt-2" />
                )}
                <input onChange={(e) => handleImage(e)} type="file" hidden />
              </label>
              <AuthForm
                profileUpdate={true}
                userName={userName}
                setUserName={setUserName}
                about={about}
                setAbout={setAbout}
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
            <p>You have successfully updated your profile</p>
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

export default ProfileUpdate;
