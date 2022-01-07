import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PostForm from "../../../components/forms/PostForm";
import { UserRoute } from "../../../components/routes/UserRoute";

const EditPost = () => {
  const router = useRouter();
  const [post, setPost] = useState({});

  // state
  const [image, setImage] = useState("");
  const [content, setContent] = useState({});
  const [uploading, setUploading] = useState(false);

  const _id = router.query._id;

  useEffect(() => {
    if (_id) fetchPost();
  }, [_id]);
  const fetchPost = async () => {
    const { data } = await axios.get(`/user-post/${_id}`);
    setPost(data);
    setContent(data.content);
    setImage(data.image);
  };

  // post submit
  const postSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/update-post/${_id}`, {
        content,
        image,
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("post created successfully");
        router.push("/user/dashboard");
      }
    } catch (error) {
      console.log(error);
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
    <>
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
            <div className="col-md-8 offset-md-2">
              <PostForm
                content={content}
                setContent={setContent}
                postSubmit={postSubmit}
                handleImage={handleImage}
                uploading={uploading}
                image={image}
              />
            </div>
          </div>
        </div>
      </UserRoute>
    </>
  );
};

export default EditPost;
