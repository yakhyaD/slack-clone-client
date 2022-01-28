import React from 'react';
import Link from "next/link";


export const Sidebar = ({ teams, currentTeamId, currentChannelId }) => {
    const allTeams = [...teams.teamsOwned, ...teams.teamsInvited];

    const currentTeam = !!currentTeamId && allTeams.length > 1 ? allTeams.find(team => team.id === parseInt(currentTeamId)) : allTeams[0];

    console.log("allTeams", allTeams);
    console.log("currentTeam", currentTeam)
    return (
        <div className="h-screen w-1/4 bg-primary flex">
            <div className="flex flex-col w-1/3 py-2 pt-5 mx-auto align-center border-r-2 border-r-white">
                {allTeams.map((team) => (
                    <Link key={team.id} href={`/view-team/${team.id}`} passHref>
                        <div className="w-[50px] h-[50px] bg-secondary mx-auto   mb-5 rounded-xl border-2 border-white text-white text-2xl text-center flex justify-center align-center hover:cursor-pointer">
                            <span className="my-auto">{team.name[0].toUpperCase()}</span>
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
                    <div className="flex justify-between w-full align-center">
                        <h3 className="text-md underline mb-4">Channel:</h3>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="flex flex-col align-center text-silver">
                        {currentTeam.channels && currentTeam.channels.map((channel) => (
                            <Link key={channel.id} href={`/view-team/${currentTeam.id}/${channel.id}`}>
                                <a className={`pb-4 text-sm  hover:underline hover: text-white
                                    ${channel.id === parseInt(currentChannelId) ? "font-bold" : "font-light"}`}
                                >
                                    # {channel.name}
                                </a>
                            </Link>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};


