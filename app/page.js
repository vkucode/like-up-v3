import Image from "next/image";
import { getPosts } from "@/_actions/postActions";
import styles from "./page.module.scss";
import Link from "next/link";

export default async function Home() {
  const { data, errMsg } = await getPosts();

  if (errMsg) return <h1>{errMsg}</h1>;

  const res = await getPosts();
  console.log(res);

  return (
    <>
      <main className="mt-5">
        <h1 className="text-2xl font-mono text-center">
          Welcome to test Template Version of Like-Up v3
        </h1>{" "}
        <br />
        <div className="flex flex-row justify-center gap-2 items-center mt-2">
          <Link href="/postform" className={styles.buttonMain}>
            Make a new registration
          </Link>
          <Link href="/data" className={styles.buttonMain}>
            See the registrations
          </Link>
          <Link href="/editPage" className={styles.buttonMain}>
            Edit the registration
          </Link>
        </div>
      </main>
    </>
  );
}
