import { createClient } from "next-sanity";

const client = createClient({
  projectId: "r3k0614q",
  dataset: "production",
  apiVersion: "2023-05-23",
  useCdn: false
});

export default function IndexPage({ posts, contents }) {
  return (
    <>
      <header>
        <h1>凡学子</h1>
      </header>
      <main>
        <h2>Blogs</h2>
        {console.log("posts:", posts)}
        {posts.length > 0 && (
          <ul>
            {posts.map((post) => (
              <li key={post._id}>{post?.title}</li> //?会抛出undefine，避免程序错误
            ))}
          </ul>
        )}
        {!posts.length > 0 && <p>No posts to show</p>}
        {posts.length > 0 && (
          <div>
            {/*console.log("contents:", contents)*/}
            <ul>
                {contents.map((content) => (
                  <li key={content._key}>{content?.text}</li>
                ))}
            </ul>
            {/* <p>{contents[0].text}</p> */}
          </div>
        )}
        {!posts.length > 0 && (
          <div>
            nothing.
          </div>
        )}
      </main>
    </>
  );
}

export async function getStaticProps() {
  const posts = await client.fetch(`
  *[_type == "post"]{
    title,
  }
  `);;

  const contents = await client.fetch(`
  *[_type == "post"][].body[].children[]
  `);;

  return {
    props: {
      posts,
      contents
    }
  };
}