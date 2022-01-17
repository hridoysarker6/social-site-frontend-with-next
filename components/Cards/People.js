import { useContext } from "react";
import { Avatar, List } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { UserContext } from "../../context";
import { imageSource } from "../functions";
import Link from "next/dist/client/link";
export const People = ({ people, handleFollow, handleUnfollow }) => {
  const [state] = useContext(UserContext);
  const router = useRouter();

  return (
    <>
      {/* <pre>{JSON.stringify(people, null, 4)}</pre> */}
      <List
        itemLayout="horizontal"
        dataSource={people}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={imageSource(user)} />}
              title={
                <div className="d-flex justify-content-between">
                  <Link href={`/user/${user.userName}`}>
                    <a>{user.userName ? user.userName : user.name}</a>
                  </Link>

                  {user.followers?.includes(state.user._id) ? (
                    <span
                      className="text-primary pointer"
                      onClick={() => handleUnfollow(user)}
                    >
                      Unfollow
                    </span>
                  ) : (
                    <span
                      className="text-primary pointer"
                      onClick={() => handleFollow(user)}
                    >
                      Follow
                    </span>
                  )}
                </div>
              }
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default People;
