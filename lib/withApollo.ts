import { withApollo as createWithApollo } from "next-apollo";
import { ApolloClient, InMemoryCache, split, createHttpLink, ApolloLink } from "@apollo/client"
import { WebSocketLink } from "@apollo/client/link/ws"
import { getMainDefinition } from "@apollo/client/utilities"
import { makeTokenRefreshLink } from "./apolloRefreshToken";
import { setContext } from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error";


import { getJwtToken } from "./auth";

const getHeaders = () => {
    const headers = {} as HeadersInit
    const token = typeof window === "undefined" ? null : getJwtToken();
    if (token) headers["Authorization"] = `Bearer ${token}`
    return headers
}

const operationIsSubscription = ({ query }) => {
    const definition = getMainDefinition(query);
    return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
    );
}

// let wsLink;
const getOrCreateWebsocketLink = () => new WebSocketLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`.replace("http", "ws").replace("https", "wss"),
    options: {
        reconnect: true,
        timeout: 30000,
        connectionParams: () => {
            return { headers: getHeaders() }
        },
    },
})
const createLink = () => {
    const httpLink = createHttpLink({
        uri: process.env.NEXT_PUBLIC_API_URL + "/graphql",
        credentials: "include"
    })
    const authLink = new ApolloLink((operation, forward) => {
        operation.setContext(({ headers }) => ({
            headers: {
                ...headers,
                ...getHeaders()
            }
        }))
        return forward(operation)
    })
    const errorLink = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
            graphQLErrors.map(({ message, locations, path }) =>
                console.log(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                )
            )
        if (networkError) console.log(`[Network error]: ${networkError}`)
    })
    const tokenRefreshLink = makeTokenRefreshLink()

    // Only use token refresh link on the client
    if (typeof window !== "undefined") {
        return ApolloLink.from([
            tokenRefreshLink,
            authLink,
            errorLink,
            // Use "getOrCreateWebsocketLink" to init WS lazily
            // otherwise WS connection will be created + used even if using "query"
            split(operationIsSubscription, getOrCreateWebsocketLink(), httpLink),
        ])
    } else {
        return ApolloLink.from([authLink, httpLink])
    }
}

export const createClient = new ApolloClient({
    link: createLink(),
    cache: new InMemoryCache()
});

export const withApollo = createWithApollo(createClient);
