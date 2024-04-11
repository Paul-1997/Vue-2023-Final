import FetchData from '@/helper/fetchData';
import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const userStore = defineStore('userStore', {
  getters: {
    isLogin() {
      return localStorage.getItem('isLogin') ?? false;
    },
  },
  actions: {
    async checkUser() {
      try {
        const { data } = await FetchData(true, 'post', 'v2/api/user/check', {});
        if (data.success) {
          localStorage.setItem('isLogin', true);
        }
      } catch (err) {
        localStorage.removeItem('isLogin');
        const { status } = err.response;
        if (status === 403 || status === 401) {
          const result = await Swal.fire({
            allowOutsideClick: false,
            title: '認證失效，請重新登入',
            icon: 'info',
            showConfirmButton: true,
          });
          if (result.isConfirmed) {
            this.$router.push('/login');
          }
        }
      }
    },
    async logout() {
      try {
        const { data } = await FetchData(true, 'post', 'v2/logout', {});
        if (data.success) this.$router.push('/');
      } catch (error) {
        Swal.fire({
          title: '操作錯誤',
          icon: 'error',
        });
      }
    },
    async login(data) {
      const result = await FetchData(true, 'post', 'v2/admin/signin', data);
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
