import { useState, useEffect, useContext } from "react";

import { Avatar, Card } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { UserContext } from "../../context";
import axios from "axios";
import Link from "next/dist/client/link";
import { RollbackOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const { Meta } = Card; // <Card.Meta>
export const UserName = () => {
  const [user, setUser] = useState({});
  const [state, setState] = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (router.query.userName) fetchUser();
  }, [router.query.userName]);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`/user/${router.query.userName}`);

      setUser(data);
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

  return (
    <>
      {/* <pre>{JSON.stringify(people, null, 4)}</pre> */}

      <div className="row col-md-6 offset-md-3">
        <div className="py-5">
          <Card
            hoverable
            cover={<img src={imageSource(user)} alt={user.name} />}
          >
            <Meta title={user.name} description={user.about} />
            <p className="pt-2 text-muted">
              Joined {moment(user.createdAt).fromNow()}
            </p>

            <div className="d-flex justify-content-between">
              <span className="btn btn-sm">
                {user.followers && user.followers.length} Followers
              </span>
              <span className="btn btn-sm">
                {user.following && user.following.length} Following
              </span>
            </div>
          </Card>
          <Link href={"/user/dashboard"}>
            <a className="d-flex justify-content-center pt-5 h4">
              <RollbackOutlined />
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserName;
