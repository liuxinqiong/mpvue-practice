// function ajax(){
//     setTimeout(()=>{
//         console.log('你好')
//     },1000)
// }
// ajax()

// console.log('执行结束')

//1. callback 回调地域
// function ajax(fn){
//     setTimeout(()=>{
//         console.log('你好')
//         fn()
//     },1000)
// }
// ajax(()=>{
//     console.log('执行结束')
// })

// 2. promise
function delay(word){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(word);
        },2000)
    })
}

// delay('孙大圣').then((word) => {
//     console.log(word)
//     return delay('猪八戒')
// }).then((word) => {
//     console.log(word)
//     return delay('沙悟净')
// }).then((word) => {
//     console.log(word)
// })

// 3. async+await
async function start(){
    const word1 = await delay('孙大圣')
    console.log(word1);
    const word2 = await delay('孙大圣')
    console.log(word2);
    const word3 = await delay('孙大圣')
    console.log(word3);
}
start()