import { UserContext } from "../../context";
import { useContext, useState } from "react";
import { UserRoute } from "../../components/routes/UserRoute";
import CreatePostForm from "../../components/forms/CreatePostForm";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

export const dashboard = () => {
  const [state, setState] = useContext(UserContext);

  const [image, setImage] = useState("");

  // state

  const [content, setContent] = useState({});
  const [uploading, setUploading] = useState(false);

  // router
  const router = useRouter();

  const postSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/create-post", { content, image });

    console.log(data);
    if (data.ok) {
      toast.success("post created successfully");
      setContent("");
      setImage({});
    } else {
      toast.error(data.error);
    }
    // console.log(data);
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
    <UserRoute>
      <div className="container-fluid">
        <div className="row bg-default-image py-5">
          <div className="col">
            <h1 className="text-center text-light display-2">NewsFeed</h1>
          </div>
        </div>
      </div>
      .
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <CreatePostForm
              content={content}
              setContent={setContent}
              postSubmit={postSubmit}
              handleImage={handleImage}
              uploading={uploading}
              image={image}
            />
          </div>
          <div className="col-md-4">sidebar</div>
        </div>
      </div>
    </UserRoute>
  );
};

export default dashboard;
