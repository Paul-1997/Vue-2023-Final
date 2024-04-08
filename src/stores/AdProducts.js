import FetchData from '@/helper/fetchData';
import { showErrorMsg, showStatusMsgToast } from '@/helper/messageHandler';
import { defineStore } from 'pinia';

const { VITE_APP_API_NAME: path } = import.meta.env;

export default defineStore('AdProductStore', {
  state: () => ({
    allProducts: [],
    products: [],
    pagination: {},
    loadingStatus: false,
  }),
  actions: {
    async getAllProducts() {
      try {
        const { data } = await FetchData(true, 'get', `v2/api/${path}/admin/products/all`);
        if (data.success) this.allProducts = data.products;
      } catch (error) {
        showErrorMsg(error.response.message);
      }
    },
    async getProducts(page = 1, category = '') {
      let param = `page=${page}`;
      if (category) param += `&category=${category}`;
      try {
        const { data } = await FetchData(true, 'get', `v2/api/${path}/admin/products?${param}`);
        if (data.success) {
          this.products = data.products;
          this.pagination = data.pagination;
        }
      } catch (error) {
        showErrorMsg(error.response.message);
      }
    },
    async updateProduct(product) {
      try {
        const { data } = await FetchData(true, 'post', `v2/api/${path}/admin/product`, product);
        if (data.success) {
          showStatusMsgToast();
          this.getProducts();
        }
      } catch (error) {
        showErrorMsg(error.response.message);
      }
    },
    async deleteProduct({ id }) {
      try {
        const { data } = await FetchData(true, 'delete', `v2/api/${path}/admin/product/${id}`);
        if (data.success) this.getProducts();
      } catch (error) {
        showErrorMsg(error.response.message);
      }
    },
  },
});
