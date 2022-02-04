import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MessageAddedDocument, useChannelQuery, useMessageAddedSubscription } from '../generated/graphql';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const MessageBox = ({ currentTeamId, currentChannelId }) => {
    dayjs.extend(relativeTime);
    const subscribeToNewMessages = useRef(() => { });
    const messageList = useRef<HTMLHeadingElement>();

    const { data, loading, subscribeToMore } = useChannelQuery({
        fetchPolicy: "network-only",
        variables: {
            teamId: parseInt(currentTeamId),
            channelId: parseInt(currentChannelId)
        },
    })
    useMessageAddedSubscription({
        variables: {
            channelId: parseInt(currentChannelId)
        },
        onSubscriptionComplete: () => {
            subscribeToNewMessages.current();
        }
    })

    subscribeToNewMessages.current = useCallback(() => {
        subscribeToMore({
            document: MessageAddedDocument,
            variables: {
                teamId: parseInt(currentTeamId),
                channelId: parseInt(currentChannelId)
            },
            updateQuery: (prev, { subscriptionData }: any) => {
                if (!subscriptionData.data) return prev;
                const newFeedItem = subscriptionData.data.messageAdded
                console.log("prev", prev)
                return Object.assign({}, prev, {
                    channel: {
                        ...prev.channel,
                        messages: [
                            ...prev.channel.messages,
                            newFeedItem,
                        ]
                    }
                });
            }
        })
    }, [currentChannelId, subscribeToMore, currentTeamId])


    useEffect(() => {
        if (!loading && data?.channel) {
            messageList.current.scrollTop = messageList.current.scrollHeight;
        }

    }, [loading, data])

    // useEffect(() => {
    //     subscribeToNewMessages.current();
    //     if (messageList.current) {
    //         messageList.current.scrollTop = messageList.current.scrollHeight;
    //     }
    // }, [])

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
            <div ref={messageList} className="flex flex-col justify-between h-full pl-3 mt-3 overflow-y-auto">
                <ul>
                    {!loading && data?.channel.messages.length ? data?.channel.messages.map(message =>
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
