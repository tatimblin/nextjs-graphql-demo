import Head from 'next/head'
import Link from 'next/link'
import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

import { getSortedPostsData } from '../lib/posts'
import { getSpacexLaunches } from '../lib/spacex'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  const launches = await getSpacexLaunches()
  return {
    props: {
      allPostsData,
      launches
    }
  }
}

export default function Home({ allPostsData, launches }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
        <h2>Local files</h2>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
        <h2>GraphQL</h2>
        <ul>
          {launches.map(({ id, mission_name, launch_date_local}) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/launches/${id}`}>
                <a>{mission_name}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={launch_date_local} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
