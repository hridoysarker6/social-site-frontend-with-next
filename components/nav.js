import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";

export function Nav() {
  const [state, setState] = useContext(UserContext);
  const [current, setCurrent] = useState("");
  useEffect(() => {
    setState(JSON.parse(window.localStorage.getItem("auth")));
  }, []);
  const router = useRouter();
  const logout = () => {
    window.localStorage.removeItem("auth");
    setState(null);
    router.push("/login");
  };

  useEffect(() => {
    {
      process.browser && setCurrent(window.location.pathname);
    }
  }, [process.browser && window.location.pathname]);

  return (
    <>
      <div className="container-fluid bg-primary ">
        <div className="container">
          <nav className="d-flex justify-content-between">
            <Link href="/" className="nav-item">
              <a
                className={`nav-link text-light ${current === "/" && "active"}`}
              >
                Home
              </a>
            </Link>
            <div className="d-flex">
              {state !== null ? (
                <>
                  <Link href="/user/dashboard">
                    <a
                      className={`nav-link text-light ${
                        current === "/user/dashboard" && "active"
                      }`}
                    >
                      {state?.user?.name}
                    </a>
                  </Link>

                  <a onClick={logout} className="nav-link text-light">
                    Logout
                  </a>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <a
                      className={`nav-link text-light ${
                        current === "/login" && "active"
                      }`}
                    >
                      Login
                    </a>
                  </Link>

                  <Link href="/register">
                    <a
                      className={`nav-link text-light ${
                        current === "/register" && "active"
                      }`}
                    >
                      Register
                    </a>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Nav;
