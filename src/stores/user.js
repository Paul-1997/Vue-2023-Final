import FetchData from '@/helper/fetchData';
import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

const userStore = defineStore('userStore', {
  actions: {
    async checkUser() {
      const result = await FetchData('post', 'v2/api/user/check', {});
      return result;
    },
    async logout() {
      const result = await FetchData('post', 'v2/logout', {});
      return result;
    },
    async login(data) {
      const result = await FetchData('post', 'v2/admin/signin', data);
      if (result.data.success) {
        const { token, expired } = result.data;
        // 寫入資訊後跳轉頁面
        Cookies.set('accessToken', token, { expires: expired });
        localStorage.setItem('isLogin', true);
        this.$router.push('/admin');
      }
      return result;
    },
  },
});

export default userStore;
