import Link from "next/link";
export function Nav() {
  return (
    <>
      <div className="container-fluid bg-primary ">
        <div className="container">
          <nav className="d-flex justify-content-between">
            <Link href="/" className="nav-item">
              <a className="nav-link text-light">Home</a>
            </Link>
            <div className="d-flex">
              <Link href="/login">
                <a className="nav-link text-light">Login</a>
              </Link>

              <Link href="/register">
                <a className="nav-link text-light">Register</a>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Nav;
