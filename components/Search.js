import { useState, useContext } from "react";
import { UserContext } from "../context";
import axios from "axios";
import People from "./Cards/People";
import { toast } from "react-toastify";

export const Search = () => {
  const [state, setState] = useContext(UserContext);

  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  const searchUser = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.get(`/search-user/${query}`);
      // console.log("res", data);
      setResult(data);
    } catch (error) {
      console.log(error);
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
      let filtered = result.filter((p) => p._id !== user._id);
      setResult(filtered);
      // render newsfeed
      // newsfeed();
      toast.success(`following ${user.name}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnfollow = async (user) => {
    try {
      const { data } = await axios.put("/user-unfollow", { _id: user._id });

      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));
      setState({ ...state, user: data });

      // update people state
      let filtered = result.filter((p) => p._id !== user._id);
      setResult(filtered);
      // render newsfeed

      toast.error(`Unfollowed ${user.name}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="form-inline my-2 my-lg-0 row" onSubmit={searchUser}>
        <div className="d-flex my-4">
          <input
            onChange={(e) => {
              setQuery(e.target.value);
              setResult([]);
            }}
            value={query}
            className="form-control mr-sm-2 col"
            type="search"
            placeholder="search"
          />
          <button
            type="submit"
            className="btn btn-outline-primary my-sm-0 mr-2"
          >
            Search
          </button>
        </div>
      </form>

      {result &&
        result.map((r) => (
          <People
            key={r._id}
            people={result}
            handleFollow={handleFollow}
            handleUnfollow={handleUnfollow}
          />
        ))}
    </>
  );
};

export default Search;
