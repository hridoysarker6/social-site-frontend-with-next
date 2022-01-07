import { useState, useEffect, useContext } from "react";

import { Avatar, List } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { UserContext } from "../../context";
import axios from "axios";
import Link from "next/dist/client/link";
import { RollbackOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

export const Following = () => {
  const [people, setPeople] = useState([]);
  const [state, setState] = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (state && state.token) fetchFollowing();
  }, [state && state.token]);

  const fetchFollowing = async () => {
    try {
      const { data } = await axios.get("/user-following");

      setPeople(data);
    } catch (error) {
      console.log(error);
    }
  };
  const imageSource = (user) => {
    if (user.image) {
      return user.image.url;
    } else {
      return "/image/banner.jpg";
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
      let filtered = people.filter((p) => p._id !== user._id);
      setPeople(filtered);
      // render newsfeed

      toast.error(`Unfollowed ${user.name}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <pre>{JSON.stringify(people, null, 4)}</pre> */}
      <div className="row col-md-6 offset-md-3">
        <List
          itemLayout="horizontal"
          dataSource={people}
          renderItem={(user) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={imageSource(user)} />}
                title={
                  <div className="d-flex justify-content-between">
                    {user.userName ? user.userName : user.name}
                    <span
                      className="text-primary pointer"
                      onClick={() => handleUnfollow(user)}
                    >
                      Unfollow
                    </span>
                  </div>
                }
              />
            </List.Item>
          )}
        />

        <Link href={"/user/dashboard"}>
          <a className="d-flex justify-content-center pt-5 h4">
            <RollbackOutlined />
          </a>
        </Link>
      </div>
    </>
  );
};

export default Following;
