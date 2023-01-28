import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import SyntaxHighlighter from "react-syntax-highlighter";
import { MDXRemote } from "next-mdx-remote";
import Button from "@/src/MDXComponents/Button";
import Head from "next/head";

const components = {
  SyntaxHighlighter,
  Button,
};

const PostPage = ({ frontMatter, mdxSource }) => {
  const { title, desc } = frontMatter;

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta property="blog:title" content={title} key={title} />
      </Head>
      <div>
        <h1>{title}</h1>
        <p>{desc}</p>
        <MDXRemote {...mdxSource} components={components} />
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join("src", "posts"));

  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(".mdx", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const markdownWithMeta = fs.readFileSync(
    path.join("src", "posts", slug + ".mdx"),
    "utf-8"
  );

  const { data: frontMatter, content } = matter(markdownWithMeta);
  const mdxSource = await serialize(content);

  return {
    props: {
      frontMatter,
      slug,
      mdxSource,
    },
  };
};

export default PostPage;
