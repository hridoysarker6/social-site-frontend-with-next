import moment from "moment";
import renderHtml from "react-render-html";
import { Avatar } from "antd";
import PostImage from "../images/PostImage";
import { useContext } from "react";
import { UserContext } from "../../context";
import {
  HeartOutlined,
  HeartFilled,
  CommentOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { useRouter } from "next/router";
import { imageSource } from "../functions";
import Link from "next/link";
import Post from "./Post";

export const PostList = ({
  posts,
  handleDelete,
  handleLike,
  handleUnlike,
  handleComment,
  removeComment,
}) => {
  const [state] = useContext(UserContext);
  const router = useRouter();
  return (
    <div>
      {posts &&
        posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            handleDelete={handleDelete}
            handleComment={handleComment}
            handleLike={handleLike}
            handleUnlike={handleUnlike}
            removeComment={removeComment}
          />
        ))}
    </div>
  );
};

export default PostList;
