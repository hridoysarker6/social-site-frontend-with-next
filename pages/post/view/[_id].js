import ParallaxBG from "../../../components/Cards/ParallaxBG";
import axios from "axios";
import PostPublic from "../../../components/Cards/PostPublic";
import Head from "next/head";

function SinglePost({ post }) {
  const head = () => (
    <Head>
      <title>MERNCAMP - A social network for developer</title>
      <meta name="description" content={post.content} />
      <meta property="og:description" content="A social network" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="mernCamp" />
      <meta
        property="og:url"
        content={`http://merncamp.com/post/view/${post._id}`}
      />
      <meta property="og:image:secure_url" content={imageSource(post)} />
    </Head>
  );

  const imageSource = (post) => {
    if (post.image) {
      return post.image.url;
    } else {
      return "/image/banner.jpg";
    }
  };

  return (
    <>
      {head()}
      <div>
        <ParallaxBG url="/image/banner.jpg" />
        <div className="container py-5">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <PostPublic post={post} key={post._id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { data } = await axios.get(`/post/${ctx.params._id}`);
  // console.log(data);

  return {
    props: {
      post: data,
    },
  };
}

export default SinglePost;
