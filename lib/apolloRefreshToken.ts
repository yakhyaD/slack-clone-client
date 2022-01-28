import { TokenRefreshLink } from "apollo-link-token-refresh"
import jwtDecode, { JwtPayload } from "jwt-decode"
import { getJwtToken, setJwtToken } from "./auth"

export const makeTokenRefreshLink = () => {
    return new TokenRefreshLink({
        // Indicates the current state of access token expiration
        // If token not yet expired or user doesn't have a token (guest) true should be returned
        isTokenValidOrUndefined: () => {
            console.log("isTokenValidOrUndefined")
            const token = getJwtToken()

            try {
                const { exp }: JwtPayload = jwtDecode(token);
                if (Date.now() >= exp * 1000) {
                    return false;
                } else {
                    return true;
                }
            } catch {
                return false;
            }
        },
        fetchAccessToken: async () => {
            const base_url = process.env.NEXT_PUBLIC_API_URL;

            const response = await fetch(`${base_url}/refresh_token`, {
                method: "POST",
                credentials: "include"
            })
            const result = await response.json();
            if (result.ok === false) {
                throw new Error("invalid refresh token")
            }
            console.log("fetchAccessToken", result)
            return result.accessToken;
        },
        handleFetch: (accessToken) => {
            console.log("handleFetch", accessToken)
            setJwtToken(accessToken)
        },
        handleResponse: (operation, accessTokenField) => (response) => {
            console.log("handleResponse", response)
            return { access_token: response }
        },
        handleError: (err) => {
            console.warn("Your refresh token is invalid. Try to reauthenticate.")
            console.error(err)
            // Remove invalid tokens
            sessionStorage.removeItem("jwt");
        }
    })
}
