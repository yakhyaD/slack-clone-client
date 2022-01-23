import React, { useState } from 'react';
import InputField from '../components/InputField';
import { useLoginMutation } from "../generated/graphql"
import { setJwtToken } from '../lib/auth';
import { ToErrorMap } from '../lib/toErrorMap';
import { withApollo } from '../lib/withApollo';
import { useRouter } from "next/router"
import Spinner from '../components/spinner';


const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const [login] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login({
        variables: {
          username,
          password
        }
      })
      setLoading(false);
      if (response.data.login.errors) {
        setError(ToErrorMap(response.data.login.errors))
        return
      }
      if (response.data.login.user) {
        // login successful
        setJwtToken(response.data.login.access_token);
        await router.push("/");
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col  pt-20 ">
      <div className="text-center mb-4">
        <h1 className="font-bold text-3xl text-gray-900">SIGN IN</h1>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col w-full">
        <InputField required={true} label="Username" type="text" value={username} setValue={setUsername} error={error} />
        <InputField required={true} label="Password" type="password" value={password} setValue={setPassword} error={error}
        />
        <div className="flex flex-col justify-start">
          {loading ? <Spinner width={4} height={4} /> : (
            <button className="bg-blue-500 w-50 mx-auto py-2 px-4 text-white text-xs rounded-sm   hover:bg-blue-400"
              type="submit"
              disabled={loading}
            >
              Signin
            </button>
          )
          }
          <a className="text-black hover:underline" href="#">
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  )
};

export default withApollo({ ssr: false })(Login);
