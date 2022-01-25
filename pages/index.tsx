import type { NextPage } from 'next';
import { withApollo } from '../lib/withApollo';
import { Sidebar } from '../components/Sidebar';
import { useTeamsQuery } from '../generated/graphql';
import { useRouter } from 'next/router';
import { IsAuth } from '../lib/isAuth';


const Home: NextPage = () => {
  const router = useRouter();

  // IsAuth();

  const { data, loading, error } = useTeamsQuery();

  if (error) router.replace('/login?next=' + router.pathname);

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <svg className="animate-spin h-10 w-10 ml-2 text-primary border-4 rounded-full" viewBox="0 0 24 24"></svg>
      </div>
    )
  }
  console.log(data.teams)

  if (data.teams.teamsInvited.length < 1 && data.teams.teamsOwned.length < 1) {
    router.push('/create-team');
  }

  return (
    <div className="flex w-full h-screen">
      <Sidebar teams={data!.teams} />
      {/* <Feed /> */}
    </div>
  )
}

export default withApollo({ ssr: true })(Home)
