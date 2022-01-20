import type { NextPage } from 'next';
import { withApollo } from '../lib/withApollo';
import { useMeQuery } from "../generated/graphql";


const Home: NextPage = () => {

  const { data, loading, error } = useMeQuery();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) return <p>Error :{error}</p>;

  return (
    <h1>
      Home page
      <pre>{data.me}</pre>
    </h1>
  )
}

export default withApollo({ ssr: true })(Home)
