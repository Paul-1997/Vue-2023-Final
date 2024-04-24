1. dashboard
   檢查登入 (checkUser),
   確認登入狀態 (token , localStorage)
   component:
   --panel控制板
   切版
   routerlink
   logout slot
   返回首頁
   page :
   --login
   切版
   登入功能
   --HOME
   切版
   訂單資訊 -總訂單數量 -最近10筆訂單
   c3圖表 -銷售總額 -各品項銷售分析 -熱門產品top3
   --ORDER
   切版
   新增/編輯/刪除
   -component引入
   切版
   --PRODUCT
   切版
   新增/編輯/刪除
   -component引入
   切版
   --COUPON
   切版
   新增/編輯/刪除
   -component引入
   切版
2. front
   component:
   -headerNav
   -footer
   -cart
   --product
   --index
   --about
      <!-- --faq 觀望 -->
   --order
   3.router 4.通用component
   -pagination
   -loading
   4.pinia
   5.util/helper
   <!-- test 後面在學 -->

套件一覽
axios
bs5
sweetalert
jscookie
vue router
vue pinia
vue loading
veevalidate
vue datepicker
moment
ckeditor
aos
swiper
vuedraggable

我是使用者可以新增產品到購物車
我是使用者可以編輯購物車內產品的內容(數量、備註etc...)
我是使用者可以填寫產品訂單
我是使用者可以送出訂單
我是使用者可以查詢我的訂單內容

我是管理者可以查看訂單狀況(圖表、訊息)
我是管理者可以查看產品、訂單、優惠卷列表
我是管理者可以新增編輯刪除產品
我是管理者可以新增編輯刪除訂單
我是管理者可以新增編輯刪除優惠卷




bugToFix 
1.adminOrder accordion icon切換過慢