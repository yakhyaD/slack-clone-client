import React, { useState } from 'react';
import { useSendMessageMutation } from '../generated/graphql';

const SendMessage = ({ currentChannelId }) => {
    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [sendMessage] = useSendMessageMutation()

    if (!currentChannelId) {
        return null;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!text) {
            setError("Message cannot be empty");
            setIsLoading(false);
            return;
        }
        try {
            const response = await sendMessage({
                variables: {
                    text,
                    channelId: parseInt(currentChannelId)
                },
                update: (cache, { data }) => {
                    cache.evict({ id: 'Channel:' + parseInt(currentChannelId) });
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

    return (
        <form className="flex justify-start w-full" onSubmit={handleSubmit}>
            <input onChange={(e) => setText(e.target.value)} type="text" name="text" placeholder="type here ..." className="flex-grow pl-1 outline-none border-t-2 border-secondary" />
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
