import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Children } from "react";
import Link from "next/link";
const Home = ({ posts }) => {
  return (
    <div>
      {Children.toArray(
        posts?.map((post) => {
          const { title, desc } = post.frontMatter;
          return (
            <Link href={`/blog/${post.slug}`} passHref>
              <div>
                {title}
                <br />
                {desc}
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join("src", "posts"));

  const posts = files.map((fileName) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("src", "posts", fileName)
    );
    const { data: frontMatter } = matter(markdownWithMeta);
    return {
      frontMatter,
      slug: fileName.split(".")[0],
    };
  });

  return {
    props: {
      posts,
    },
  };
  // fetch
};

export default Home;
