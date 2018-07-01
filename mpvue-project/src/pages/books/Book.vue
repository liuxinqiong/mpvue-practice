<template>
    <div>
        <TopSwiper :tops='tops'></TopSwiper>
        <Card :key="book.id" v-for='book in books' :book='book'></Card>
        <p class="text-footer" v-if="!more">
            没有更多数据
        </p>
    </div>
</template>
<script>
import { get } from '@/utils'
import Card from '@/components/Card' 
import TopSwiper from '@/components/TopSwiper'
export default {
    data() {
        return {
            books: [],
            tops: [],
            page: 0,
            more: true
        }
    },
    components: {
        Card,
        TopSwiper
    },
    methods: {
        async getlist(init) {
            if(init){
                this.page = 0;
                this.more = true;
            }
            wx.showNavigationBarLoading()
            const books = await get('/weapp/booklist',{
                page: this.page
            })
            if(books.list.length<10 && this.page>0) {
                this.more = false;
            }
            if(init){
                this.books = books.list
                wx.stopPullDownRefresh()
            } else {
                this.books = this.books.concat(books.list)
            }
            wx.hideNavigationBarLoading()
        },
        async getTop(){
            const tops = await get('/weapp/top')
            this.tops = tops.list
        }
    },
    onReachBottom() {
        if(!this.more){
            return false
        }
        this.page = this.page + 1;
        this.getlist()
    },
    onPullDownRefresh() {
        this.getlist(true)
        this.getTop()
    },
    mounted(){
        this.getlist(true)
        this.getTop()
    }
}
</script>
<style>

</style>
