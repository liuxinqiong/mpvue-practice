<template>
    <div class="container">
        <CommentList 
            v-if="userInfo.openId"
            type="user" 
            :comments="comments"></CommentList>
        <div v-if="userInfo.openId">
            <div class="page-title">我的图书</div>
            <Card
                v-for="book in books"
                :key="book.id"
                :book="book"
            ></Card>
            <div v-if="!books.length">暂时还没添加书籍，快去添加几本吧</div>
        </div>
    </div>
</template>
<script>
import CommentList from '@/components/CommentList'
import Card from '@/components/Card'
import { get } from '@/utils'
export default {
    data() {
        return {
            comments: [],
            books: [],
            userInfo: {}
        }
    },
    components: {
        CommentList,
        Card
    },
    onPullDownRefresh() {
        this.init()
        wx.stopPullDownRefresh()
    },
    methods: {
        init() {
            wx.showNavigationBarLoading()
            this.getComments()
            this.getBooks()
            wx.hideNavigationBarLoading()
        },
        async getComments() {
            const comments = await get('/weapp/commentList', {
                openId: this.userInfo.openId
            })
            this.comments = comments.list
        },
        async getBooks() {
            const books = await get('/weapp/booklist', {
                openId: this.userInfo.openId
            })
            this.books = books.list
        }
    },
    onShow() {
        if(!this.userInfo.openId) {
            const userInfo = wx.getStorageSync('userInfo')
            if(userInfo){
                this.userInfo = userInfo
                this.init()
            }
        }
    }
}
</script>
<style>

</style>
