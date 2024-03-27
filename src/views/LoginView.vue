<template>
  <div class="wrap">
    <img class="login__img mx-auto" src="/logo.png" alt="logo">
    <h1 class="login__title h1 mb-4 text-center text-secondary">管理者登入</h1>
    <form id="loginForm" action="post" class="p-4 mx-auto">
      <div class="form-floating mb-3">
        <input type="email" class="form-control" id="userEmail" placeholder="請輸入帳號" v-model="user.email"
          @input="clearErrMsg" :class="{ 'is-invalid': isEmptyInvalid && user.email === '' }">
        <label for="userEmail" class="text-secondary">Email address</label>
      </div>
      <div class="form-floating mb-4">
        <input type="password" class="form-control" id="userPassword" placeholder="請輸入密碼" v-model="user.password"
          @input="clearErrMsg" :class="{ 'is-invalid': isEmptyInvalid && user.password === '' }">
        <label for="userPassword" class="text-secondary">Password</label>
      </div>
      <div class="text-center mb-4">
        <button type="button" class="login__btn btn btn-primary text-secondary col-8 px-3 mb-3" @click="login">
          登入
        </button>
        <div class="backToFront">
          <RouterLink to="./">返回前台</RouterLink>
        </div>
      </div>
      <div>
        <div class="mx-auto" :class="{ loader: onLoading && errMsg === '' }">
          <p class="text-danger fs-5 text-center" v-if="errMsg">
            {{ errMsg }}
          </p>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
input {
  width: min(380px, calc(100vw - 24px));

  &:is(:hover, :focus) {
    box-shadow: none;
  }
}

.wrap {
  --secondary: rgb(132, 32, 41);
  display: grid;
  place-content: center;
  min-height: 100dvh;
  background: linear-gradient(to bottom, rgb(254, 203, 161) 7%, rgb(243, 227, 211));
}

.login {
  &__img {
    height: 300px;
  }

  &__title {
    text-shadow: .1rem 0 currentColor;
    font-weight: 900;
  }

  &__btn {
    border-color: var(--secondary);
  }
}

.backToFront a {
  color: var(--secondary);

  &:hover {
    text-underline-offset: .2em;
    text-decoration: underline;
  }
}

.loader {
  width: 48px;
  aspect-ratio: 1;
  border-radius: 100vw;
  border: 8px solid transparent;
  border-top-color: gray;
  animation: spin .8s infinite linear;
}

@keyframes spin {
  to {
    rotate: 360deg;
  }
}
</style>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';

const { VITE_APP_API_URL: base } = import.meta.env;

export default {
  data() {
    return {
      onLoading: false,
      isEmptyInvalid: false,
      errMsg: '',
      user: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    clearErrMsg() {
      this.isEmptyInvalid = false;
      if (this.errMsg !== '') this.errMsg = '';
    },
    async login() {
      const { email, password } = this.user;
      if (email === '' || password === '') {
        this.isEmptyInvalid = true;
        this.errMsg = '請輸入信箱或密碼！';
        return;
      }
      try {
        this.onLoading = true;
        const result = await axios.post(`${base}/v2/admin/signin`, { username: email, password });
        if (result.data.success) {
          const { token, expired } = result.data;
          this.onLoading = false;
          // 寫入資訊後跳轉頁面
          Cookies.set('accessToken', token, { expires: expired });
          localStorage.setItem('isLogin', true);
          this.$router.push('/admin');
        }
      } catch (err) {
        this.onLoading = false;
        const { status } = err.response;

        if (status === 400) this.errMsg = '信箱或密碼有誤！';
      }
    },
  },
};
</script>
