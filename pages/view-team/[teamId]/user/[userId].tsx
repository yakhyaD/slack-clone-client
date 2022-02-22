import { NextPage } from "next";
import { useRouter } from "next/router";

import MessageBox from "../../../../components/MessageBox";
import SendMessage from "../../../../components/SendMessage";
import { Sidebar } from "../../../../components/Sidebar";
import { useTeamsQuery } from "../../../../generated/graphql";
import { withApollo } from "../../../../lib/withApollo";


const DirectMessage: NextPage = () => {
    const router = useRouter();
    const { teamId, userId } = router.query as any;

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
    return (
        <div className="relative flex w-full h-screen">
            <Sidebar teams={data?.teams} currentTeamId={teamId} currentChannelId={userId} />
            <div className="flex flex-col w-full">
                <MessageBox
                    title="Direct Message"
                    currentTeamId={teamId}
                    currentChannelId={userId}
                />
                <SendMessage roomId={teamId} handler={"DirectMessage"} receiverId={userId} />
            </div>

        </div>
    )
}

export default withApollo({ ssr: true })(DirectMessage)
