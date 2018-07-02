<template>
    <div class="bookinfo">
        <div class="thumb">
            <img class="back" mode="aspectFill" :src="info.image" alt="">
            <img :src="info.image" mode="aspectFit" class="img" alt="">
            <div class="info">
                <div class="title">{{info.title}}</div>
                <div class="author">{{info.author}}</div>
            </div>
        </div>
        <div class="detail">
            <img :src="userInfo.avatarUrl" alt="" mode="aspectFit" class="avatar">
            {{userInfo.nickName}}
            <div class="right text-primary">
                {{info.rate}}分
                <Rate :value="info.rate"></Rate>
            </div>
        </div>
        <div class="detail">
            {{info.publisher}}
            <div class="right">
                {{info.price}}
            </div>
        </div>
        <div class="tags">
            <div class="badge" :key="tag" v-for="tag in info.tags">{{tag}}</div>
        </div>
        <div class="summary">
            <p :key="index" v-for="(sum,index) in info.summary">{{sum}}</p>
        </div>
    </div>
</template>
<script>
import Rate from '@/components/Rate'
export default {
    props: ['info'],
    components:{
        Rate
    },
    computed: {
        userInfo() {
            return this.info.user_info || {}
        }
    }
}
</script>
<style lang='scss' scoped>
.bookinfo {
    font-size: 14px;
    .right {
        float: right;
    }
    .badge {
        display: inline-block;
        margin: 5px;
        padding: 5px;
        border-radius: 10px;
        border: 1px #EA5A49 solid;
        color: #EA5A49;
    }
    .summary{
        padding: 0 15px;
        margin-top: 10px;
        p {
            text-indent: 2em;
        }
    }
    .detail {
        padding: 5px 10px;
        .avatar {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            vertical-align: middle;
        }
    }
    .thumb {
        width: 750rpx;
        height: 500rpx;
        overflow: hidden;
        position: relative;
        .back {
            filter: blur(15px);
            width: 100%;
        }
        .img {
            position: absolute;
            height: 300rpx;
            left: 0;
            top: 30rpx;
            width: 100%;
        }
        .info {
            color: white;
            position: absolute;
            width: 100%;
            top: 330rpx;
            left: 0;
            text-align: center;
            .title {
                font-size: 20px;
            }
            .author{
                font-size: 14px;
            }
        }
    }
}
</style>
