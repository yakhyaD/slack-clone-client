import { ApolloClient, InMemoryCache } from "@apollo/client";
import { withApollo as createWithApollo } from "next-apollo";

export const createClient = new ApolloClient({
    uri: process.env.PUBLIC_API_URL as string,
    cache: new InMemoryCache(),
    credentials: "include"
});

export const withApollo = createWithApollo(createClient);
