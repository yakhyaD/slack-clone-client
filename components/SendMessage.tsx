import React, { useState } from 'react';
import { useSendMessageMutation } from '../generated/graphql';
import { useSendDirectMessageMutation } from '../generated/graphql';

type SendMessageProps = {
    roomId: string
    handler: "ChannelMessage" | "DirectMessage"
    receiverId?: string;
}

const SendMessage = ({ roomId, handler, receiverId }: SendMessageProps) => {
    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [sendMessage] = useSendMessageMutation()
    const [sendDirectMessage] = useSendDirectMessageMutation()

    if (!roomId) {
        return null;
    }
    const handleSumbit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!text.trim()) {
            setError("Message cannot be empty");
            setIsLoading(false);
            return;
        }
        if (handler === "ChannelMessage") {
            submitChannelMessage()
        } else if (handler === "DirectMessage") {
            submitDirectMessage()
        }
        return;

    }
    const submitChannelMessage = async () => {
        try {
            const response = await sendMessage({
                variables: {
                    text,
                    channelId: parseInt(roomId)
                },
                update: (cache, { data }) => {
                    cache.evict({ id: 'Channel:' + parseInt(roomId) });
                }
            })
            if (response.data.sendMessage === false) {
                throw new Error("Could not send message");
            } else {
                setText("");
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    const submitDirectMessage = async () => {
        try {
            const response = await sendDirectMessage({
                variables: {
                    text,
                    teamId: parseInt(roomId),
                    receiver: parseInt(receiverId)
                },
                update: (cache, { data }) => {
                    cache.evict({ id: 'Channel:' + parseInt(roomId) });
                }
            })
            if (response.data.sendDirectMessage === false) {
                throw new Error("Could not send message");
            } else {
                setText("");
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    return (
        <form className="flex justify-start w-full" onSubmit={handleSumbit}>
            <input type="text" name="text" placeholder="type here ..."
                className="flex-grow pl-1 outline-none border-t-2 border-secondary"
                onChange={(e) => setText(e.target.value)}
                value={text}
            />
            <button type="submit" className="py-2 px-4 bg-secondary text-white text-center border-black">
                {isLoading ? (
                    <svg className="animate-spin h-5 w-5 ml-2 text-white border-4 rounded-full" viewBox="0 0 24 24"></svg>
                ) : "Send"
                }
            </button>
        </form>
    );
};

export default SendMessage;
