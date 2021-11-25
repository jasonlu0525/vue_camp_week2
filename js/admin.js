import {
    createApp
} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.22/vue.esm-browser.min.js';

createApp({
    data() {
        return {
            products: [],
            showDetailData:[]

        }
    },
    methods: {
        checkLogin() {
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            axios.defaults.headers.common['Authorization'] = token;
            axios.post("https://vue3-course-api.hexschool.io/v2/api/user/check").then((res) => {

                    console.log(res)
                    return axios.get("https://vue3-course-api.hexschool.io/v2/api/jason/admin/products"); // Promise 鏈接

                }).catch((err) => {
                    console.dir(err);
                    if (!err.response.data.success) {
                        alert(err.response.data.message);
                        location = "index.html"
                    }

                })
                .then((res) => { // 驗證登入狀態後取得產品資料
                    console.log(res.data.products);
                    this.products = res.data.products

                })
        },
        showDetail(e) {

            // this.showDetailData =  this.products[e.target.dataset.id]; // 層拷貝
            this.showDetailData = Object.assign({},this.products[e.target.dataset.id-1])  // 淺層拷貝
            console.log( this.showDetailData);
 
         },
         isActiveChange(e){
             this.products[e.target.dataset.id-1].is_enabled = ! this.products[e.target.dataset.id-1].is_enabled;
         }
    },
    created() {
        this.checkLogin();
    }
}).mount("#app");