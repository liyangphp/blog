const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize'
const SCOPE = 'user'
const client_id = 'a3917a7184a35336f7fd'
module.exports = {
    github: {
    request_token_url: 'https://github.com/login/oauth/access_token',
    client_id,
    client_secret: '4a5108668839c513d287b0b79a9cb006edef3135'
    },
    GITHUB_OAUTH_URL,
    OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${client_id}&scope=${SCOPE}`
}