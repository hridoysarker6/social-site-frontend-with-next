import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { UserRoute } from "../../components/routes/UserRoute";
import Post from "../../components/Cards/Post";
import { RollbackOutlined } from "@ant-design/icons";
import Link from "next/link";
const PostComments = () => {
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
  };

  const removeComment = async (postId, comment) => {
    // console.log(postId, comment);
    let answer = window.confirm("Are you sure ?");
    if (!answer) return;
    try {
      const { data } = await axios.put("/remove-comment", {
        postId,
        comment,
      });
      fetchPost();
      // console.log("comment remove", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row bg-default-image py-5">
          <div className="col">
            <h1 className="text-center text-light display-2">NewsFeed</h1>
          </div>
        </div>

        <div className="container col-md-8 offset-md-2 pt-5">
          <Post post={post} commentsCount={100} removeComment={removeComment} />
        </div>

        <Link href="/user/dashboard">
          <a className="d-flex justify-content-center p-5 h5">
            <RollbackOutlined />
          </a>
        </Link>
      </div>
    </>
  );
};

export default PostComments;
