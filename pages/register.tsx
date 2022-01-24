import React, { useState } from 'react';
import InputField from '../components/InputField';
import { useLoginMutation, useRegisterMutation } from "../generated/graphql"
import { setJwtToken } from '../lib/auth';
import { ToErrorMap } from '../lib/toErrorMap';
import { withApollo } from '../lib/withApollo';
import { useRouter } from "next/router"


const Login: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();

    const [register] = useRegisterMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await register({
                variables: {
                    options: {
                        username,
                        email,
                        password
                    }
                }
            })
            setLoading(false);
            if (response.data.register.errors) {
                setError(ToErrorMap(response.data.register.errors))
                return
            }
            if (response.data.register.user) {
                // register successful
                setJwtToken(response.data.register.access_token);
                await router.push("/login");
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="max-w-md mx-auto h-screen flex flex-col pt-20 ">
            <div className="text-center mb-4">
                <h1 className="font-bold text-3xl text-gray-900">Register</h1>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col w-full">
                <InputField label="Username" type="text" value={username} setValue={setUsername} error={error} />
                <InputField label="Email" type="email" value={email} setValue={setEmail} error={error} />
                <InputField label="Password" type="password" value={password} setValue={setPassword} error={error}
                />

                <div className="flex flex-col justify-start relative">
                    <button className="bg-blue-500 w-1/4 mx-auto py-4 px-4 text-center text-white text-sm hover:bg-blue-400 flex justify-center rounded-xl"
                        type="submit"
                        disabled={loading}
                    >
                        Sign in
                        {loading && <svg className="animate-spin h-5 w-5 ml-3 text-white border-4 rounded-full" viewBox="0 0 24 24"></svg>}
                    </button>
                    <span className="mt-2">
                        Already have account?
                        <a className="text-blue-600 hover:underline" href="forgot-password">
                            {"  "} Sign in here
                        </a>
                    </span>
                </div>
            </form>
        </div>
    )
};

export default withApollo({ ssr: false })(Login);
