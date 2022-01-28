import { NextPage } from "next";
import { useRouter } from "next/router";
import Modal from "../../components/Modal";

import { Sidebar } from "../../components/Sidebar";
import { useTeamsQuery } from "../../generated/graphql";
import { withApollo } from "../../lib/withApollo";


const ViewTeam: NextPage = () => {
    const router = useRouter();
    let currentTeamId = "";
    let currentChannelId = "";


    const { slug } = router.query;

    if (slug && slug.length) {
        currentTeamId = slug[0];
        if (slug.length > 1) {
            currentChannelId = slug[1];
        }
        currentChannelId = slug[1];
    }

    const { data, loading } = useTeamsQuery({
        fetchPolicy: "network-only"
    });

    if (loading) {
        return (
            <div className="h-screen w-full flex justify-center items-center">
                <svg className="animate-spin h-10 w-10 ml-2 text-primary border-4 rounded-full" viewBox="0 0 24 24"></svg>
            </div>
        )
    }
    // if (error) router.replace('/login?next=' + router.pathname);

    if (data?.teams?.teamsInvited.length < 1 && data?.teams?.teamsOwned.length < 1) {
        router.push('/create-team');
    }

    return (
        <div className="relative flex w-full h-screen">
            <Sidebar teams={data?.teams} currentTeamId={currentTeamId} currentChannelId={currentChannelId} />
            {/* <MessageBox /> */}
            <div>
                Team page
            </div>
        </div>
    )
}

export default withApollo({ ssr: true })(ViewTeam)
