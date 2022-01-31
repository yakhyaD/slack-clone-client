import React from 'react';

const SendMessage = () => {
    return (
        <form className="flex justify-start w-full">
            <input type="text" placeholder="type here ..." className="flex-grow pl-1 outline-none border-t-2 border-secondary" />
            <button type="submit" className="py-2 px-4 bg-secondary text-white text-center border-black">Send</button>
        </form>
    );
};

export default SendMessage;
