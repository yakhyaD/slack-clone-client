import React from 'react';
import Link from "next/link";


export const Sidebar = ({ teams }) => {
    const allTeams = [...teams.teamsOwned, ...teams.teamsInvited];

    // console.log(allTeams);
    return (
        <div className="h-screen w-1/4 bg-primary flex">
            <div className="flex flex-col w-1/3 py-2 pt-5 mx-auto align-center border-r-2 border-r-white">
                {allTeams.map((team) => (
                    <Link key={team.id} href={`/team/${team.id}`} passHref>
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
                    <div className="py=2 ">Team Name</div>
                    <p className="text-sm font-light">Description aegpmwgwrmg</p>
                </div>
                <div className="pt-5 pl-3">
                    <h3 className="text-md underline mb-4">Channel:</h3>
                    <div className="flex flex-col align-center text-silver">
                        <a href="#" className="pb-4 text-sm font-light hover:underline hover: text-white">
                            # Javas
                        </a>
                        <a href="#" className="pb-4 text-sm font-light hover:underline hover:text-white">
                            # Javas
                        </a>
                        <a href="#" className="pb-4 text-sm font-light hover:underline hover:text-white">
                            # Javas
                        </a>
                        <a href="#" className="pb-4 text-sm font-light hover:underline hover:text-white">
                            # Javas
                        </a>
                        <a href="#" className="pb-4 text-sm font-light hover:underline hover:text-white">
                            # Javas
                        </a>
                        <a href="#" className="pb-4 text-sm font-light hover:underline hover:text-white">
                            # Javas
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
};


