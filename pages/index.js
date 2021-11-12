import { useContext, useEffect } from "react";
import { UserContext } from "../context";
function HomePage() {
  const [state, setState] = useContext(UserContext);
  useEffect(() => {
    setState(JSON.parse(window.localStorage.getItem("auth")));
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>this is home page</h1>
          {JSON.stringify(state)}
          <img src="/image/banner.jpg" />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
