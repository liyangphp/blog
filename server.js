// server.js

const Koa = require('koa')
const Router = require('koa-router')
const session = require('koa-session')
const next = require('next')
const auth = require('./server/auth')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const PORT = 3001
// 等到pages目录编译完成后启动服务响应请求
app.prepare().then(() => {
    const server = new Koa()
    const router = new Router()

    auth(server)

    router.get('/detail/:id', async ctx => {
        const id = ctx.params.id
        await handle(ctx.req, ctx.res, {
            pathname: '/detail',
            query: {
                id,
            },
        })
        ctx.respond = false
    })

    server.use(router.routes())

    server.use(async (ctx, next) => {
        await handle(ctx.req, ctx.res)
        ctx.respond = false
    })

    server.use(async (ctx, next) => {
        ctx.res.statusCode = 200
        
        await next()
    })

    server.listen(PORT, () => {
        console.log(`koa server listening on ${PORT}`)
    })
})
