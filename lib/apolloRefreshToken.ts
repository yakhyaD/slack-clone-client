import { TokenRefreshLink } from "apollo-link-token-refresh"
import decodeJWT, { JwtPayload } from "jwt-decode"
import { getJwtToken, setJwtToken } from "./auth"

export const makeTokenRefreshLink = () => {
    return new TokenRefreshLink({
        // Indicates the current state of access token expiration
        // If token not yet expired or user doesn't have a token (guest) true should be returned
        isTokenValidOrUndefined: () => {
            console.log("isTokenValidOrUndefined")
            const token = getJwtToken()

            // If there is no token, the user is not logged in
            // We return true here, because there is no need to refresh the token
            if (!token) return true

            // Otherwise, we check if the token is expired
            const claims: JwtPayload = decodeJWT(token)
            const expirationTimeInSeconds = claims.exp * 1000
            const now = new Date()
            const isValid = expirationTimeInSeconds >= now.getTime()

            // Return true if the token is still valid, otherwise false and trigger a token refresh
            return isValid
        },
        fetchAccessToken: async () => {
            const base_url = process.env.NEXT_PUBLIC_API_URL;

            const response = await fetch(`${base_url}/refresh_token`, {
                method: "POST"
            })

            const result = await response.json();
            console.log(result)
            return result.access_token;
        },
        handleFetch: (accessToken) => {
            console.log(accessToken);
            const claims = decodeJWT(accessToken)
            console.log("handleFetch", { accessToken, claims })
            setJwtToken(accessToken)
        },
        handleResponse: (operation, accessTokenField) => (response) => {
            console.log("handleResponse", { operation, accessTokenField, response })
            return { access_token: response.access_token }
        },
        handleError: (err) => {
            console.warn("Your refresh token is invalid. Try to reauthenticate.")
            console.error(err)
            // Remove invalid tokens
            sessionStorage.removeItem("jwt");
        }
    })
}
