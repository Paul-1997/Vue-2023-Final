<template>
  <nav>
    <ul style="flex-direction: column;">
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
</template>
