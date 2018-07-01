<template>
    <div class="container">
        <div class="userinfo" @click="login">
            <img :src="userInfo.avatarUrl" alt="">
            <p>{{userInfo.nickName}}</p>
        </div>
        <YearProgress></YearProgress>
        <button class="btn" v-if="userInfo.openId" @click="scanCode">添加图书</button>
    </div>
</template>
<script>
import YearProgress from '@/components/YearProgress'
import qcloud from 'wafer2-client-sdk'
import { showModal, showSuccess, post } from '@/utils'
import config from '@/config'
export default {
    data() {
        return {
            userInfo: {
                avatarUrl: '../../../static/img/me-active.png',
                nickName: '点击登录'
            }
        }
    },
    components:{
        YearProgress
    },
    methods: {
        async addBook(isbn) {
            const res = await post('/weapp/addbook', {
                isbn,
                openid: this.userInfo.openId
            })
            showModal('添加成功', `${res.title}添加成功`)
        },
        scanCode(){
            wx.scanCode({
                success: (res) => {
                    if(res.result) {
                        this.addBook(res.result)
                    }
                }
            })
        },
        login() {
            qcloud.setLoginUrl(config.loginUrl)
            const user = wx.getStorageSync('userInfo')
            if(!user){
                qcloud.login({
                    success: (userInfo) => {
                        // 如今其实有openId了
                        console.log('登录成功', userInfo)
                        qcloud.request({
                            url: config.userUrl,
                            login: true,
                            success: (userRes) => {
                                console.log(userRes)
                                showSuccess('登录成功')
                                this.userInfo = userRes.data.data
                                wx.setStorageSync('userInfo', userRes.data.data)
                            }
                        })
                    },
                    fail: function(err){
                        console.log('登录失败', err)
                    }
                })
            }
        }
    },
    onShow() {
        const userInfo = wx.getStorageSync('userInfo')
        if(userInfo){
            this.userInfo = userInfo
        }
    }
}
</script>
<style lang='scss' scoped>
.container{
    padding: 0 30rpx;
    .userinfo{
        margin-top: 100rpx;
        text-align: center;
        img {
            width: 150rpx;
            height: 150rpx;
            margin: 30rpx;
            border-radius: 50%;
        }
    }
}
</style>
