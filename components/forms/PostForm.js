import { Avatar } from "antd";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CameraOutlined, LoadingOutlined } from "@ant-design/icons";

export const PostForm = ({
  content,
  setContent,
  postSubmit,
  handleImage,
  image,
  uploading,
}) => {
  return (
    <>
      <div className="card">
        <div className="card-body">
          <form>
            <div className="form-group">
              <ReactQuill
                theme="snow"
                className="form-control"
                value={content}
                onChange={(e) => setContent(e)}
              />
            </div>
          </form>
        </div>
        <div className="card-footer d-flex justify-content-between text-muted">
          <button
            disabled={!content}
            className="btn btn-primary btn-sm"
            onClick={postSubmit}
          >
            Post
          </button>

          <label className="btn btn-small  pb-2">
            {image && image.url ? (
              <Avatar size={30} src={image.url} />
            ) : uploading ? (
              <LoadingOutlined className="mt-2" />
            ) : (
              <CameraOutlined className="mt-2" />
            )}
            <input onChange={(e) => handleImage(e)} type="file" hidden />
          </label>
        </div>
      </div>
    </>
  );
};

export default PostForm;
