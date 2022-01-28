import Link from "next/link"
import { useRouter } from "next/router";
import { isServer } from "../constants";
import { useMeQuery } from "../generated/graphql";


const Navbar = () => {
    const router = useRouter();

    const { data, loading, error } = useMeQuery({
        skip: isServer(),
    });

    if (loading) {
        return (
            <div className="flex justify-between align-center w-full px-2 py-4 border-b-2 border-primary text-white bg-secondary text-md">
                <div>
                    Slack Clone
                </div>
                <div className="">
                    <Link href="/login">
                        <a className="ml-2 hover:bg-primary p-2">Sign in</a>
                    </Link>
                    <Link href="/register">
                        <a className="ml-2 hover:bg-primary p-2">Register</a>
                    </Link>
                </div>
            </div>
        )
    }
    if (!loading && data?.me) {
        return (
            <div className="flex justify-between align-center w-full px-2 py-4 border-b-2 border-primary text-white bg-secondary text-md">
                <div>
                    Slack Clone
                </div>
                <div className="">
                    <Link href="/view-team">
                        <a className="ml-2 hover:bg-primary p-2">{data!.me!.username} Workspaces</a>
                    </Link>
                    <Link href="/logout">
                        <a className="ml-2 hover:bg-primary p-2">Logout</a>
                    </Link>
                </div>
            </div>

        )
    }


    return (
        <div className="flex justify-between align-center w-full px-2 py-4 border-b-2 border-primary text-white bg-secondary text-md">
            <div>
                Slack Clone
            </div>
            <div className="">
                <Link href="/login">
                    <a className="ml-2 hover:bg-primary p-2">Sign in</a>
                </Link>
                <Link href="/register">
                    <a className="ml-2 hover:bg-primary p-2">Register</a>
                </Link>
            </div>
        </div>
    )
}

export default Navbar;
