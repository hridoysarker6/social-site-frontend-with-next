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
export const PostPublic = ({
  post,
  handleDelete,
  handleLike,
  handleUnlike,
  handleComment,
  commentsCount = 2,
  removeComment,
}) => {
  const [state] = useContext(UserContext);
  const router = useRouter();
  return (
    <>
      {post && post.postedBy && (
        <div>
          <div className="card mb-5" key={post._id}>
            <div className="card-header">
              <Avatar className="mb-2" src={imageSource(post.postedBy)} />
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
                  {/* <HeartFilled className="text-danger h4" /> */}

                  {state &&
                  state.user &&
                  post.likes &&
                  post.likes.includes(state.user._id) ? (
                    <HeartFilled className="text-danger h4" />
                  ) : (
                    <HeartOutlined className="text-danger h4" />
                  )}

                  <span style={{ marginLeft: "1rem" }}>
                    {post.likes.length} likes
                  </span>
                </div>
                <div style={{ marginLeft: "2rem" }}>
                  <CommentOutlined className="text-danger h4" />
                  <span style={{ marginLeft: "1rem" }}>
                    {post.comments.length} Comment
                  </span>
                </div>
              </div>
            </div>
            {/* two comments  */}
            {post.comments && post.comments.length > 0 && (
              <ul
                className="list-group"
                style={{ maxHeight: "125px", overflowY: "scroll" }}
              >
                {post.comments.slice(0, commentsCount).map((c) => (
                  <li
                    className="list-group-item d-flex justify-content-between align-items-start"
                    key={c._id}
                  >
                    <div className="ms-2 me-auto">
                      <div>
                        <Avatar
                          className="mb-1 mr-3"
                          size={20}
                          src={imageSource(c.postedBy)}
                        />
                        {c.postedBy.name}
                      </div>
                      <div>{c.text}</div>
                    </div>
                    <span className="badge rounded-pill text-muted">
                      {moment(c.created).fromNow()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PostPublic;
