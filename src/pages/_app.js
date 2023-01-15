import "@/styles/globals.css";
import Head from "next/head";
import Navbar from "../Components/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Blog Site</title>
      </Head>
      <div className="flex justify-center w-full">
        <div className="w-3/4">
          <Navbar />
          <main>
            <Component {...pageProps} />
          </main>
        </div>
      </div>
    </>
  );
}
