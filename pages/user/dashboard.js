import { UserContext } from "../../context";
import { useContext, useEffect, useState } from "react";
import { UserRoute } from "../../components/routes/UserRoute";
import PostForm from "../../components/forms/PostForm";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import PostList from "../../components/Cards/PostList";
import People from "../../components/Cards/People";
import Link from "next/dist/client/link";
import { imageSource } from "../../components/functions";

import { Modal, Pagination } from "antd";
import CommentForm from "../../components/forms/CommentForm";
import Search from "../../components/Search";
export const dashboard = () => {
  const [state, setState] = useContext(UserContext);

  const [image, setImage] = useState("");

  // state

  const [content, setContent] = useState({});
  const [uploading, setUploading] = useState(false);

  // post
  const [posts, setPosts] = useState([]);
  //people
  const [people, setPeople] = useState([]);

  // comment
  const [comment, setComment] = useState("");
  const [visible, setVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  //pagination
  const [totalPost, setTotalPost] = useState(0);
  const [page, setPage] = useState(1);

  // router
  const router = useRouter();

  useEffect(() => {
    if (state && state.token) {
      newsfeed();
      findPeople();
    }
  }, [state && state.token, page]);

  useEffect(() => {
    try {
      axios.get("/total-posts").then(({ data }) => setTotalPost(data));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const newsfeed = async () => {
    try {
      const { data } = await axios.get(`/news-feed/${page}`);
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };
  const findPeople = async () => {
    try {
      const { data } = await axios.get("/find-people");
      setPeople(data);
    } catch (err) {
      console.log(err);
    }
  };
  const postSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/create-post", { content, image });
    if (data.ok) {
      setPage(1);
      newsfeed();
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

  const handleDelete = async (post) => {
    const answer = window.confirm("Are you sure?");
    if (!answer) {
      return;
    } else {
      const { data } = await axios.delete(`/delete-post/${post._id}`);
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("post created successfully");
        newsfeed();
      }
    }
  };

  const handleFollow = async (user) => {
    try {
      const { data } = await axios.put("/user-follow", { _id: user._id });

      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));
      setState({ ...state, user: data });

      // update people state
      let filtered = people.filter((p) => p._id !== user._id);
      setPeople(filtered);
      // render newsfeed
      newsfeed();
      toast.success(`following ${user.name}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (_id) => {
    try {
      const { data } = await axios.put("/like-post", { _id });
      newsfeed();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlike = async (_id) => {
    try {
      const { data } = await axios.put("/unlike-post", { _id });
      newsfeed();
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = (post) => {
    setVisible(true);
    setCurrentPost(post);
  };

  const addComment = async (e) => {
    //
    e.preventDefault();

    try {
      const { data } = await axios.put("/add-comment", {
        postId: currentPost._id,
        comment,
      });

      console.log("add comment", data);
      setComment("");
      setVisible(false);
      newsfeed();
    } catch (error) {
      console.log(error);
    }
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
      newsfeed();
      // console.log("comment remove", data);
    } catch (error) {
      console.log(error);
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

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <PostForm
              content={content}
              setContent={setContent}
              postSubmit={postSubmit}
              handleImage={handleImage}
              uploading={uploading}
              image={image}
            />
            <div className="py-4"></div>
            <PostList
              posts={posts}
              handleDelete={handleDelete}
              handleLike={handleLike}
              handleUnlike={handleUnlike}
              handleComment={handleComment}
              removeComment={removeComment}
            />

            <Pagination
              defaultCurrent={page}
              total={(totalPost / 2) * 10}
              onChange={(value) => setPage(value)}
            />
            {totalPost}
          </div>
          <div className="col-md-4">
            <Search />
            <div>
              {state && state.user && state.user.following && (
                <Link href={"/user/following"} className="h6">
                  <a>{state.user.following.length} Following</a>
                </Link>
              )}
            </div>
            <div>
              {state && state.user && state.user.followers && (
                <Link href={"/user/followers"} className="h6">
                  <a>{state.user.followers.length} Followers</a>
                </Link>
              )}
            </div>
            <People people={people} handleFollow={handleFollow} />
          </div>
        </div>
        <Modal
          visible={visible}
          onCancel={() => setVisible(false)}
          title="Comment"
          footer={null}
        >
          <CommentForm
            addComment={addComment}
            setComment={setComment}
            comment={comment}
          />
        </Modal>
      </div>
    </UserRoute>
  );
};

export default dashboard;
