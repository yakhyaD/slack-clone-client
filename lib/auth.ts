export function getJwtToken() {
    return sessionStorage.getItem("jid")
}

export function setJwtToken(token) {
    sessionStorage.setItem("jid", token)
}


