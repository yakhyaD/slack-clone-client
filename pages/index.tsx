import type { NextPage } from 'next';
import { withApollo } from '../lib/withApollo';
import Navbar from '../components/Navbar';


const Home: NextPage = () => {

  return (
    <div className="flex flex-col w-full h-screen">
      <Navbar />
      <div className="h-full text-center m-auto" >
        Landing Page
      </div>
    </div>
  )
}

export default withApollo({ ssr: true })(Home)
