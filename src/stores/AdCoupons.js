import FetchData from '@/helper/fetchData';
import { showErrorMsg, showStatusMsgToast } from '@/helper/messageHandler';
import { defineStore } from 'pinia';

const { VITE_APP_API_NAME: path } = import.meta.env;

export default defineStore('AdCouponStore', {
  state: () => ({
    coupons: [],
    pagination: {},
    loadingStatus: false,
  }),
  actions: {
    async getCoupons() {
      try {
        const { data } = await FetchData(true, 'get', `v2/api/${path}/admin/coupons`);
        if (data.success) {
          this.coupons = data.coupons;
          this.pagination = data.pagination;
        }
      } catch (error) {
        showErrorMsg(error.response.message);
      }
    },
    async updateCoupon(coupon) {
      try {
        const { data } = await FetchData(true, 'post', `v2/api/${path}/admin/coupon`, coupon);
        if (data.success) {
          showStatusMsgToast(data.message);
          this.getCoupons();
        }
      } catch (error) {
        showErrorMsg(error.response.message);
      }
    },
    async deleteCoupon({ id }) {
      try {
        const { data } = await FetchData(true, 'delete', `v2/api/${path}/admin/coupon/${id}`);
        if (data.success) {
          showStatusMsgToast(data.message);
          this.getCoupons();
        }
      } catch (error) {
        showErrorMsg(error.response.message);
      }
    },
    async deleteAllCoupon() {
      try {
        const { data } = await FetchData(true, 'delete', `v2/api/${path}/admin/coupons/all`);
        if (data.success) {
          showStatusMsgToast(data.message);
          this.getCoupons();
        }
      } catch (error) {
        showErrorMsg(error.response.message);
      }
    },
  },
});
