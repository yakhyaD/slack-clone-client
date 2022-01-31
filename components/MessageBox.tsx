import React from 'react';
import { useChannelQuery } from '../generated/graphql';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";


const MessageBox = ({ currentTeamId, currentChannelId }) => {
    dayjs.extend(relativeTime);

    const { data, loading } = useChannelQuery({
        fetchPolicy: "network-only",
        variables: {
            teamId: parseInt(currentTeamId),
            channelId: parseInt(currentChannelId)
        }
    })

    if (loading) {
        return (
            <div className="h-screen w-full flex justify-center items-center">
                <svg className="animate-spin h-10 w-10 ml-2 text-primary border-4 rounded-full" viewBox="0 0 24 24"></svg>
            </div>
        )
    }
    const formatDate = (date) => {
        const dateFormatted = dayjs(date).fromNow();
        if (dateFormatted.includes("days ago") || dateFormatted.includes("month ago")) {
            return dayjs(date).format("MMM DD, YYYY, HH:mm:ss");
        }
        return dateFormatted;
    }
    return (
        <>
            <div className="w-full py-2 bg-primary text-white text-center border-2 border-t-0 font-medium"># {data?.channel.name ?? "Channel"}</div>
            <div className="flex flex-col justify-between h-full pl-3 mt-3 overflow-y-scroll">
                <ul>
                    {data?.channel.messages ? data?.channel.messages.map(message =>
                        <li key={message.id} className="py-2">
                            <div className="flex align-center">
                                <div className="font-bold text-sm">{message.user.username}</div>
                                <span className="ml-2 my-auto font-normal text-xs">{formatDate(message.createdAt)}</span>
                            </div>
                            <div className="text-sm font-light">{message.text}</div>
                        </li>
                    ) : (
                        <div className="text-center text-gray-500">No messages yet</div>
                    )}
                </ul>
            </div>
        </>
    );
};

export default MessageBox;
