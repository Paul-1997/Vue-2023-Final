<template>
  <div class="panel d-none d-md-flex flex-column bg-primary align-items-center" style="min-width: 200px;">
    <img src="/logo.png" class="mb-4">
    <nav class="h-100 w-100">
      <ul class="nav__link list-unstyled fs-4 text-center">
        <li class="mb-4">
          <RouterLink to="/admin">總覽</RouterLink>
        </li>
        <li class="mb-4">
          <RouterLink to="/admin/products">產品列表</RouterLink>
        </li>
        <li class="mb-4">
          <RouterLink to="/admin/orders">訂單列表</RouterLink>
        </li>
        <li class="mb-4">
          <RouterLink to="/admin/coupons">優惠一覽</RouterLink>
        </li>
        <li class="mb-5">
          <RouterLink to="/">返回前台</RouterLink>
        </li>
      </ul>
    </nav>
    <div class="flex-grow-1 mt-auto pb-3 w-100 px-5">
      <div class="d-flex justify-content-between align-items-center">
        <RouterLink to="/">
          <span class="material-symbols-outlined fs-2">
            home
          </span>
        </RouterLink>
        <a href="#" @click.prevent="logout">
          <span class="material-symbols-outlined fs-2">
            logout
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import userStore from '@/stores/user';

export default {
  methods: {
    ...mapActions(userStore, ['logout']),
  },
};
</script>

<style scoped lang="scss">
.panel {
  position: sticky;
  max-height: 100vh;
  top: 0;

  img {
    width: 200px;
  }

  li:has(.link--active) {
    a {
      padding-inline-end: .75rem;
    }

    // nuxt已支援 vue還沒
    // view-transition-name: 'active__Link';

    position: relative;
    padding-block: .25rem;
    margin-inline-start: 1.5rem;
    border-radius: 16px 0 0 16px;
    background-color: #faebd7;

    --size: 8px;

    &::after,
    &::before {
      content: '';
      position: absolute;
      width: var(--size);
      height: var(--size);
      right: 0;
    }

    &::before {
      top: calc(var(--size) * -1);
      border-radius: 0 0 100vw 0;
      box-shadow: calc(var(--size) * .5) calc(var(--size) * .5) 0 calc(var(--size) * .5) #faebd7;
    }

    &::after {
      bottom: calc(var(--size) * -1);
      border-radius: 0 100vw 0 0;
      box-shadow: calc(var(--size) * .5) calc(var(--size) * -.5) 0 calc(var(--size) * .5) #faebd7;
    }
  }

  .material-symbols-outlined:hover {
    scale: 1.1;
  }
}
</style>
