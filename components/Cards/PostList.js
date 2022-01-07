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

export const PostList = ({ posts, handleDelete }) => {
  const [state] = useContext(UserContext);
  const router = useRouter();
  return (
    <div>
      {posts &&
        posts.map((post) => (
          <div className="card mb-5" key={post._id}>
            <div className="card-header">
              <Avatar size={40} className="mb-2">
                {post.postedBy.name[0]}
              </Avatar>
              <span className="pt-2 ml-2 " style={{ marginLeft: "1rem" }}>
                {post.postedBy.name}
              </span>
              <span className="pt-2 ml-2 " style={{ marginLeft: "1rem" }}>
                {moment(post.createdAt).fromNow()}
              </span>
            </div>

            <div className="card-body">{renderHtml(post.content)}</div>
            <div className="card-footer">
              {post.image && <PostImage url={post.image.url} />}
              <div className="pt-3 d-flex ">
                <div>
                  <HeartFilled className="text-danger h4" />
                  <span style={{ marginLeft: "1rem" }}>5 likes</span>
                </div>
                <div style={{ marginLeft: "2rem" }}>
                  <CommentOutlined className="text-danger h4" />
                  <span style={{ marginLeft: "1rem" }}>3 Comment</span>
                </div>

                {state && state.user && state.user._id === post.postedBy._id && (
                  <div style={{ marginLeft: "auto" }}>
                    <EditOutlined
                      onClick={() => router.push(`/user/post/${post._id}`)}
                      className="text-primary h4 px-2"
                    />
                    <DeleteOutlined
                      onClick={() => handleDelete(post)}
                      className="text-danger h4 px-2"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostList;
