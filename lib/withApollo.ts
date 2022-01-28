import { withApollo as createWithApollo } from "next-apollo";
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, Operation } from "@apollo/client"
import { WebSocketLink } from "@apollo/client/link/ws"
import { getMainDefinition } from "@apollo/client/utilities"
import { makeTokenRefreshLink } from "./apolloRefreshToken";

import { getJwtToken } from "./auth";

const getHeaders = () => {
    const headers = {} as HeadersInit
    const token = getJwtToken();
    if (token) headers["Authorization"] = `Bearer ${token}`
    return headers
}

const operationIsSubscription = (operation: Operation): boolean => {
    const definition = getMainDefinition(operation.query)
    const isSubscription = definition.kind === "OperationDefinition" && definition.operation === "subscription"
    return isSubscription
}

let wsLink
const getOrCreateWebsocketLink = () => {
    wsLink ??= new WebSocketLink({
        uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`.replace("http", "ws").replace("https", "wss"),
        options: {
            reconnect: true,
            timeout: 30000,
            connectionParams: () => {
                return { headers: getHeaders() }
            },
        },
    })
    return wsLink
}
const createLink = () => {
    const httpLink = new HttpLink({
        uri: process.env.NEXT_PUBLIC_API_URL + "/graphql",
        credentials: "include"
    })

    const authLink = new ApolloLink((operation, forward) => {
        operation.setContext(({ headers = {} }) => ({
            headers: {
                ...headers,
                ...getHeaders(),
            },
        }))
        return forward(operation)
    })

    const tokenRefreshLink = makeTokenRefreshLink()

    // Only use token refresh link on the client
    if (typeof window !== "undefined") {
        return ApolloLink.from([
            tokenRefreshLink,
            authLink,
            // Use "getOrCreateWebsocketLink" to init WS lazily
            // otherwise WS connection will be created + used even if using "query"
            ApolloLink.split(operationIsSubscription, getOrCreateWebsocketLink, httpLink),
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
