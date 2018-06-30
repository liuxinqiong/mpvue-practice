const Koa = require('koa')
const koaLog = require('./koa-logger')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

router.get('/',async(ctx,next)=>{

})

app.use(koaLog)
app.use(router.routes()).use(router.allowedMethods())

function delay(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve();
        },1000)
    })
}

app.use(async(ctx,next)=>{
    ctx.body = '1'
    // setTimeout(()=>{
    //     next()
    // },2000)
    await next()
    ctx.body +='2'
})

app.use(async(ctx,next)=>{
    ctx.body += '3'
    await delay()
    await next()
    ctx.body +='4'
})

app.use(async(ctx,next)=>{
    ctx.body += '5'
    await next()
    ctx.body +='6'
})

app.listen(3000)