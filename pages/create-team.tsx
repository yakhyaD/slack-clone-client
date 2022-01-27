import React, { useState } from 'react';
import { NextPage } from 'next';
import InputField from '../components/InputField';
import { useCreateTeamMutation } from '../generated/graphql';
import { useRouter } from 'next/router';
import { withApollo } from '../lib/withApollo';
import { IsAuth } from '../lib/isAuth';

const CreateTeam: NextPage = () => {

    IsAuth();

    const [name, setName] = useState<string>("");
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const [createTeam] = useCreateTeamMutation()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const response = await createTeam({
            variables: {
                name
            },
            update: (cache) => {
                cache.evict({ fieldName: "teams" });
            }
        })
        if (response.data.createTeam === false) {
            setError({ name: "Invalid team name" })
            setLoading(false)
            return
        }
        setLoading(true);
        await router.push("/")
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-1/3 mx-auto my-20">
            <InputField required={true} label="Team Name" type="text" value={name} setValue={setName} error={error} />
            <button className="bg-lighblue w-1/4 mx-auto py-2 px-4 text-center text-white text-xlhover:bg-blue hover:cursor-pointer flex justify-center rounded-xl"
                type="submit"
                disabled={loading}
            >
                {!loading ? " Create" : <svg className="animate-spin h-5 w-5 ml-2 text-white border-4 rounded-full" viewBox="0 0 24 24"></svg>}
            </button>
        </form>
    );
};

export default withApollo({ ssr: false })(CreateTeam);
