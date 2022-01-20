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
                  <div className="dropdown">
                    <a
                      className="btn text-light dropdown-toggle"
                      role="button"
                      id="dropdownMenuLink"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {state?.user?.name}
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <li>
                        <Link href="/user/dashboard">
                          <a
                            className={`nav-link dropdown-item ${
                              current === "/user/dashboard" && "active"
                            }`}
                          >
                            Dashboard
                          </a>
                        </Link>
                      </li>

                      <li>
                        <Link href="/user/profile/update">
                          <a
                            className={`nav-link dropdown-item ${
                              current === "/user/profile/update" && "active"
                            }`}
                          >
                            Profile
                          </a>
                        </Link>
                      </li>

                      {state.user.role === "Admin" && (
                        <li>
                          <Link href="/admin/">
                            <a
                              className={`nav-link dropdown-item ${
                                current === "/admin/" && "active"
                              }`}
                            >
                              Admin
                            </a>
                          </Link>
                        </li>
                      )}
                      <li>
                        <a onClick={logout} className="nav-link dropdown-item">
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
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
