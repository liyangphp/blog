const axios = require('axios')
const config = require('../config')

const { client_id, client_secret, request_token_url } = config.github

module.exports = server => {
    server.use(async (ctx, next) => {
        
        if (ctx.path === '/auth') {
            const code = ctx.query.code
            if (!code) {
                ctx.body = 'code not exist'
                return
            }

            console.log('path', ctx.path)

            const result = await axios({
                method: 'POST',
                url: request_token_url,
                data: {
                    client_id,
                    client_secret,
                    code
                },
                headers: {
                    Accept: 'application/json'
                }
            })

            console.log('result', result)


            if (result.status === 200 && (result.data && !result.data.error)) {

                const { access_token, token_type } = result.data

                const userInfoResp = await axios({
                    method: 'GET',
                    url: 'https://api.github.com/user',
                    headers: {
                        Authorization: `${token_type} ${access_token}`
                    }
                })

                console.log('userInfoResp',userInfoResp)

                const userInfo = userInfoResp.data;
                
                const token = await axios({
                    method: 'POST',
                    url: 'http://borentang.net/api/v1/user/github',
                    data:{
                        email:userInfo['email'],
                        nickname:userInfo['nickname'],
                        avatar:userInfo['avatar'],
                    }
                })

                console.log('token',token.data)

                ctx.redirect('/?token='+token.data)

            } else {
                const errorMsg = result.data && result.data.error
                ctx.body = `request token failed ${errorMsg}`
            }
        } else {
            await next()
        }
    })
}