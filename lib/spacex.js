import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export async function getSpacexLaunches() {
  const client = new ApolloClient({
    uri: 'https://api.spacex.land/graphql/',
    cache: new InMemoryCache()
  });

  const { data } = await client.query({
    query: gql`
      query GetLaunches {
        launchesPast(limit: 10) {
          id
          mission_name
          launch_date_local
          launch_site {
            site_name_long
          }
          links {
            article_link
            video_link
            mission_patch
          }
          rocket {
            rocket_name
          }
        }
      }
    `
  });

  return data.launchesPast
}

export async function getAllPostIds() {
  const client = new ApolloClient({
    uri: 'https://api.spacex.land/graphql/',
    cache: new InMemoryCache()
  });

  const { data } = await client.query({
    query: gql`
      query GetLaunches {
        launchesPast(limit: 10) {
          id
        }
      }
    `
  });

  return data.launchesPast.map((launch) => {
    return {
      params: {
        id: launch.id
      }
    }
  })
}

export async function getPostData(id) {
  const client = new ApolloClient({
    uri: 'https://api.spacex.land/graphql/',
    cache: new InMemoryCache()
  });

  const { data } = await client.query({
    query: gql`
      query($id: ID!) {
        launch(id: $id) {
          mission_name
        }
      }
    `,
    variables: { id },
  });

  return {
    id,
    mission_name: data.launch.mission_name
  }
}
