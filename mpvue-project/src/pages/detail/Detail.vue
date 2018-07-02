<template>
    <div>
        <BookInfo :info="info"></BookInfo>
        <CommentList :comments="comments"></CommentList>
        <div class="comment" v-if="showAdd">
            <textarea v-model='comment'
                      class='textarea'
                      :maxlength="100"
                      placeholder="请输入图书短评"></textarea>
            <div class="location">
                地理位置：
                <switch color="#EA5A49" :checked="location" @change="getGeo"></switch>
                <span class="text-primary">{{location}}</span>
            </div>
            <div class="phone">
                手机型号
                <switch color="#EA5A49" :checked="phone" @change="getPhone"></switch>
                <span class="text-primary">{{phone}}</span>
            </div>
            <button class="btn" @click="addComment">评论</button>
        </div>
        <div v-else class='text-footer'>
            未登录或已经评论
        </div>
        <button class="btn" open-type="share">转发给好友</button>
    </div>
</template>
<script>
import { get, post, showModal } from '@/utils'
import BookInfo from '@/components/BookInfo'
import CommentList from '@/components/CommentList'
export default {
    data() {
        return {
            bookid:'',
            info:{},
            comment:'',
            location:'',
            phone: '',
            userInfo: {},
            comments: []
        }
    },
    components:{
        BookInfo,
        CommentList
    },
    computed: {
        showAdd() {
            if(!this.userInfo.openId){
                return false;
            }
            if(this.comments.filter(v=>v.openid == this.userInfo.openId).length){
                return false;
            }
            return true
        }
    },
    methods: {
        async getDetail() {
            const info = await get('/weapp/bookdetail',{
                id: this.bookid
            })
            this.info = info
            wx.setNavigationBarTitle({
                title: info.title
            })
        },
        getGeo(e) {
            const ak = 'MDwsFZOSnMojz1ZMWoGPxcPUdUGUZ0R0'
            const url = 'http://api.map.baidu.com/geocoder/v2/'
            if(e.target.value){
                wx.getLocation({
                    success: geo => {
                        wx.request({
                            url,
                            data: {
                                ak,
                                location: `${geo.latitude},${geo.longitude}`,
                                output:'json'
                            },
                            success: res => {
                                if(res.data.status == 0){
                                    console.log(res)
                                    this.location = res.data.result.addressComponent.city;
                                } else {
                                    this.location = '位置地点';
                                }
                            }
                        })
                    }
                })
            } else {
                this.location = ''
            }
        },
        getPhone(e) {
            if(e.target.value){
                this.phone = wx.getSystemInfoSync().model
            } else {
                this.phone = ''
            }
        },
        async addComment() {
            if(!this.comment) {
                return;
            }
            const data = {
                openid: this.userInfo.openId,
                bookid: this.bookid,
                comment: this.comment,
                phone: this.phone,
                location: this.location
            }
            try{
                await post('/weapp/addComment',data)
                this.comment = ''
                this.getComments()
            } catch (e){
                showModal('失败', e.message)
            }
        },
        async getComments() {
            const comments = await get('/weapp/commentList', {
                bookid: this.bookid
            })
            this.comments = comments.list
        }
    },
    mounted() {
        this.bookid = this.$root.$mp.query.id
        this.getDetail()
        this.getComments()
        const userInfo = wx.getStorageSync('userInfo')
        if(userInfo) {
            this.userInfo = userInfo
        }
    }
}
</script>
<style lang="scss" scoped>
.comment {
    margin-top: 10px;
    .textarea {
        background: #eee;
        padding: 10px;
        width: 730rpx;
        height: 200rpx;
    }
    .location {
        margin-top:10px;
    }
    .phone{
        margin-top:10px;
    }
}
</style>
