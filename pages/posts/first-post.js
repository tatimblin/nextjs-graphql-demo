import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../../components/layout'

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>My first post</title>
      </Head>
      <h1>First Post</h1>
      <Image
        src="/images/profile-pic.jpg"
        height={144}
        width={144}
        alt="Tristan Timblin"
      />
      <h2>
        <Link href="/">
          <a>Back home</a>
        </Link>
      </h2>
    </Layout>
  );
}
