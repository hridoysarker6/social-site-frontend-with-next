import { UserContext } from "../../context";
import { useContext } from "react";
import { UserRoute } from "../../components/routes/UserRoute";

export const dashboard = () => {
  const [state, setState] = useContext(UserContext);
  return (
    <UserRoute>
      <div className="container-fluid">
        <div className="row bg-default-image py-5">
          <div className="col">
            <h1 className="text-center text-light display-2">dashboard</h1>
          </div>
        </div>
      </div>
    </UserRoute>
  );
};

export default dashboard;
