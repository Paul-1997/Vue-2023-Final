<template>
  <div class="col-xl-10 mx-auto">
    <h2 class="h2 mb-4 fw-bold text-secondary">所有商品</h2>
    <div class="position-relative">
      <input type="text" id="searchProduct" placeholder="請輸入想搜尋的產品" class="form-control border-secondary mb-4"
        v-model="textSearch" @input="searchProduct">
      <span
        class="interactive-button material-symbols-outlined position-absolute end-0 top-0 fs-3 pt-1 pe-2 text-secondary">
        search
      </span>
    </div>

    <div class="mb-4">
      <nav class="d-flex align-items-center">
        <ul class="filter list-unstyled d-flex border-bottom border-third">
          <li class="p-3" :class="productType === 'all' ? 'bg-third text-light' : ''">
            <label for="allProductType"><input type="radio" name="productFilter" id="allProductType" class="d-none"
                v-model="productType" value="all" checked> 全部產品</label>
          </li>
          <li class="p-3" :class="productType === 'sellout' ? 'bg-third text-light' : ''"><label
              for="selloutProductType"><input type="radio" name="productFilter" id="selloutProductType" class="d-none"
                v-model="productType" value="sellout"> 已售完</label></li>
          <li class="p-3" :class="productType === 'unable' ? 'bg-third text-light' : ''"><label
              for="unableProductType"><input type="radio" name="productFilter" id="unableProductType" class="d-none"
                v-model="productType" value="unable"> 尚未啟用</label></li>
        </ul>
        <div class="d-flex align-items-center  ms-auto">
          <label for="">
            排序:
            <select name="chooseFilter" id="sortFilter" class="border-0 bg-transparent text-end me-2 ps-2"
              v-model="productSort">
              <option value="category" selected>品項</option>
              <option value="lowPrice">最高價格</option>
              <option value="highPrice">最低價格</option>
              <option value="maxNum">最高數量</option>
              <option value="minNum">最低數量</option>
              <option value="newest">最新</option>
              <option value="oldest">最舊</option>
            </select>
          </label>
          <button class="btn btn-success px-4 py-2 mt-md-1" type="button"
            @click="getModal('productModal')">建立新產品</button>
        </div>
      </nav>
      <ul class="row gy-3 list-unstyled pt-3">
        <li v-for="product in processedProduct" :key="product.id" class="bg-white">
          <div class="grid align-items-center" id="productGrid">
            <figure class="p-4">
              <img :src="product.imageUrl" :alt="`${product.title}首圖`">
            </figure>
            <p class="fs-4 text-secondary">{{ product.title }}</p>
            <p class="fs-4 text-secondary">{{ product.category }}</p>
            <p class="fs-4 text-secondary">{{ product.num }}</p>
            <p class="fs-4 text-secondary">{{ product.price }}</p>
            <div class="button-group">
              <span class="material-symbols-outlined interactive-button me-3"
                @click="getModal('productModal', product)">
                edit
              </span>
              <span class="material-symbols-outlined interactive-button" @click="getModal('deleteModal', product)">
                delete
              </span>
            </div>
          </div>
        </li>
        <li v-if="!processedProduct.length" class="text-center text-secondary fs-2">
          <div class="p-4 ">搜尋不到任何產品捏╮(╯_╰)╭</div>
        </li>
      </ul>
    </div>
    <PaginationComponent :pages="pagination" @emit-pagination="getProducts" />
    <AdminProductModal :temp-product='tempProduct' @submit-product="updateProduct" ref="productModal" />
    <AdminDeleteModal :target='tempProduct' :target-title="tempProduct.title" :id="tempProduct.id"
      @delete-target="deleteProduct" ref="deleteModal" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import AdProductStore from '@/stores/AdProducts';
import PaginationComponent from '@/components/PaginationComponent.vue';
import AdminProductModal from '@/components/AdminProductModal.vue';
import AdminDeleteModal from '@/components/AdminDeleteModal.vue';

export default {
  data() {
    return {
      productSort: 'category',
      productType: 'all',
      textSearch: '',
      productSearch: [],
      tempProduct: {},
    };
  },
  computed: {
    ...mapState(AdProductStore, ['allProducts', 'products', 'pagination']),
    processedProduct() {
      const type = this.productType;
      const data = [...this.products].filter((product) => {
        if (type === 'sellout') return product.num === 0;
        if (type === 'unable') return !product.is_enabled;
        return true;
      });
      const finalData = data.sort((a, b) => {
        if (this.productSort === 'lowPrice') return b.price - a.price;
        if (this.productSort === 'highPrice') return a.price - b.price;
        if (this.productSort === 'maxNum') return b.num - a.num;
        if (this.productSort === 'minNum') return a.num - b.num;
        if (this.productSort === 'newest') return a.createDate - b.createDate;
        if (this.productSort === 'oldest') return b.createDate - a.createDate;
        // default
        return a.category > b.category;
      });
      return this.textSearch === '' ? finalData : finalData.filter((product) => product.title.includes(this.textSearch));
    },
  },
  methods: {
    ...mapActions(AdProductStore, ['getProducts', 'updateProduct', 'deleteProduct']),
    searchProduct() {
      if (this.textSearch.trim() === '') this.productSearch = '';
      else this.productSearch = this.sortProduct.filter((product) => product.title.includes(this.textSearch));
    },
    getModal(target, data) {
      this.tempProduct = {};
      if (data) this.tempProduct = data;
      this.$refs[target].openModal();
    },
  },
  mounted() {
    this.getProducts();
  },
  components: {
    PaginationComponent,
    AdminProductModal,
    AdminDeleteModal,
  },
};
</script>

<style>
#searchProduct::placeholder {
  color: rgb(102, 102, 102);
}

#productGrid {
  display: grid;
  column-gap: 1rem;
  grid-template-columns: 120px repeat(4, 1fr) 100px;
}

#productGrid img {
  aspect-ratio: 1;
  object-fit: cover;
}

.filter li {
  width: 100px;
  text-align: center;
  border: 1px solid;
  border-bottom: 0;
  border-radius: 6px 6px 0 0;
  border-color: rgb(178, 68, 77);
  overflow: hidden;
}
</style>
