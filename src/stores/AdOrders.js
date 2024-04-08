import FetchData from '@/helper/fetchData';
import { showErrorMsg, showStatusMsgToast } from '@/helper/messageHandler';
import { defineStore } from 'pinia';

const { VITE_APP_API_NAME: path } = import.meta.env;

export default defineStore('AdOrderStore', {
  state: () => ({
    orders: [],
    pagination: {},
    loadingStatus: false,
  }),
  actions: {
    async getOrders() {
      try {
        const { data } = await FetchData(true, 'get', `v2/api/${path}/admin/orders`);
        if (data.success) {
          this.orders = data.orders;
          this.pagination = data.pagination;
        }
      } catch (error) {
        showErrorMsg(error.response.message);
      }
    },
    async updateOrder(order) {
      try {
        const { data } = await FetchData(true, 'post', `v2/api/${path}/admin/order`, order);
        if (data.success) {
          showStatusMsgToast(data.message);
          this.getOrders();
        }
      } catch (error) {
        showErrorMsg(error.response.message);
      }
    },
    async deleteOrder({ id }) {
      try {
        const { data } = await FetchData(true, 'delete', `v2/api/${path}/admin/order/${id}`);
        if (data.success) {
          showStatusMsgToast(data.message);
          this.getOrders();
        }
      } catch (error) {
        showErrorMsg(error.response.message);
      }
    },
    async deleteAllOrder() {
      try {
        const { data } = await FetchData(true, 'delete', `v2/api/${path}/admin/orders/all`);
        if (data.success) {
          showStatusMsgToast(data.message);
          this.getOrders();
        }
      } catch (error) {
        showErrorMsg(error.response.message);
      }
    },
  },
});
