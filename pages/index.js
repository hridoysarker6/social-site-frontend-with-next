import { useContext, useEffect } from "react";
import { UserContext } from "../context";
import ParallaxBG from "../components/Cards/ParallaxBG";
import axios from "axios";
import PostPublic from "../components/Cards/PostPublic";
import Head from "next/head";
import Link from "next/link";

const head = () => (
  <Head>
    <title>MERNCAMP - A social network for developer</title>
    <meta name="description" content="A social network" />
    <meta property="og:description" content="A social network" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="mernCamp" />
    <meta property="og:url" content="http://merncamp.com" />
    <meta
      property="og:image:secure_url"
      content="http://merncamp.com/image/banner.jpg"
    />
  </Head>
);
function HomePage({ posts }) {
  const [state, setState] = useContext(UserContext);
  useEffect(() => {
    setState(JSON.parse(window.localStorage.getItem("auth")));
  }, []);
  return (
    <>
      {head()}
      <div>
        <ParallaxBG url="/image/banner.jpg" />
        <div className="container py-5">
          <div className="row">
            {posts.map((post) => (
              <div className="col-md-4" key={post._id}>
                <Link href={`/post/view/${post._id}`}>
                  <a>
                    <PostPublic post={post} />
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const { data } = await axios.get("/posts");
  // console.log(data);

  return {
    props: {
      posts: data,
    },
  };
}

export default HomePage;
