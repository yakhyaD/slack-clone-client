import React, { useState } from 'react';
import Link from "next/link";
import AddChannelModal from './AddChannelModal';
import AddMemberModal from './AddMemberModal';

import { useMembersQuery, useMeQuery } from '../generated/graphql';


export const Sidebar = ({ teams, currentTeamId, currentChannelId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [openAddMemberModal, setOpenAddMemberModal] = useState(false);

    const { data: members, loading: membersLoading } = useMembersQuery({
        variables: {
            teamId: parseInt(currentTeamId)
        },
        fetchPolicy: "network-only"
    });

    const { data, loading } = useMeQuery({
        fetchPolicy: "network-only"
    })

    const getFirstCharacter = (name) => {
        if (!name) {
            return "N";
        }
        return name.charAt(0).toUpperCase();
    }
    const currentTeam = !!currentTeamId && teams?.length > 1 ? teams.find(team => team.id === parseInt(currentTeamId)) : teams[0];

    return (
        <div className="h-full w-1/3 bg-primary flex">
            <div className="flex flex-col w-1/3 py-2 pt-5 mx-auto align-center border-r-2 border-r-white">
                {teams.map((team) => (
                    <Link key={team.id} href={`/view-team/${team.id}`} passHref>
                        <div className="w-[50px] h-[50px] bg-secondary mx-auto   mb-5 rounded-xl border-2 border-white text-white text-2xl text-center flex justify-center align-center hover:cursor-pointer">
                            <span className="my-auto">{getFirstCharacter(team.name)}</span>
                        </div>
                    </Link>
                ))}
                <Link href="/create-team" passHref>
                    <div className="w-[50px] h-[50px] bg-secondary mx-auto   mb-5 rounded-xl border-2 border-white text-white text-2xl text-center flex justify-center align-center hover:cursor-pointer">
                        <span className="my-auto">+</span>
                    </div>
                </Link>
            </div>
            <div className="flex flex-col w-2/3 text-white">
                <div className="w-full border-b-2 border-b-white py-2 text-center">
                    <div className="py=2 ">{currentTeam.name}</div>
                    {/* <p className="text-sm font-light">created by</p> */}
                </div>
                <div className="pt-5 pl-3">
                    {!loading && data?.me.id === currentTeam.ownerId ? (
                        <div className="flex justify-between w-full align-center hover:cursor-pointer"
                            onClick={() => setIsOpen(state => !state)}
                        >
                            <h3 className="text-md underline mb-4">Channel:</h3>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>) : null
                    }
                    <div className="flex flex-col align-center text-silver">
                        {currentTeam.channels && currentTeam.channels.map((channel) => (
                            <Link key={channel.id} href={`/view-team/${currentTeam.id}/${channel.id}`}>
                                <a className={`pb-4 text-sm  hover:underline hover: text-white
                                    ${currentChannelId && channel.id === parseInt(currentChannelId) ? "font-bold" : "font-light"}`}
                                >
                                    # {channel.name}
                                </a>
                            </Link>
                        ))}
                    </div>
                    {!loading && data?.me.id === currentTeam.ownerId &&
                        <button className="py-2 text-bold text-md text-lightblue hover:underline hover:cursor-pointer "
                            onClick={() => setOpenAddMemberModal(state => !state)}
                        >
                            Invite People
                        </button>
                    }
                    <div className="flex flex-col py-4">
                        <div className="text-xl text-black font-bold">Direct messages:</div>
                        <ul>
                            {!membersLoading && members?.members.map((member) => (
                                <li key={member.id} className="flex justify-between">
                                    <div className="flex align-center pt-3">
                                        <span className="w-2 h-2 m-auto rounded-full bg-green"></span>
                                        <Link href={`/view-team/${currentTeamId}/user/${member.id}`}>
                                            <a className="text-sm font-light text-center ml-2 hover:underline">
                                                {member.username}
                                            </a>
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
            {<AddChannelModal isOpen={isOpen} setIsOpen={setIsOpen} currentTeamId={currentTeamId} />}
            {<AddMemberModal isOpen={openAddMemberModal} setIsOpen={setOpenAddMemberModal} currentTeamId={currentTeamId} />}
        </div>
    );
};


