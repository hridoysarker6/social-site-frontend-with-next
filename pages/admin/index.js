import { UserContext } from "../../context";
import { useContext, useEffect, useState } from "react";
import AdminRoute from "../../components/routes/AdminRoute";

import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import PostList from "../../components/Cards/PostList";
import renderHTML from "react-render-html";

export const Admin = () => {
  const [state, setState] = useContext(UserContext);

  // post
  const [posts, setPosts] = useState([]);

  //pagination

  const [page, setPage] = useState(1);

  // router
  const router = useRouter();

  useEffect(() => {
    if (state && state.token) {
      newsfeed();
    }
  }, [state && state.token, page]);

  const newsfeed = async () => {
    try {
      const { data } = await axios.get(`/posts`);
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (post) => {
    const answer = window.confirm("Are you sure?");
    if (!answer) {
      return;
    } else {
      const { data } = await axios.delete(`/admin/delete-post/${post._id}`);
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.error("post deleted successfully");
        newsfeed();
      }
    }
  };

  return (
    <AdminRoute>
      <div className="container-fluid">
        <div className="row bg-default-image py-5">
          <div className="col">
            <h1 className="text-center text-light display-2">ADMIN</h1>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 offset-md-2 py-4">
            {posts.map((p) => (
              <>
                <div key={p._id} className="d-flex justify-content-between">
                  <div>{renderHTML(p.content)}</div>
                  <div
                    onClick={() => handleDelete(p)}
                    className="text-danger pointer"
                  >
                    Delete
                  </div>
                </div>
                <div className="divider"></div>
              </>
            ))}
          </div>
        </div>
      </div>
    </AdminRoute>
  );
};

export default Admin;
