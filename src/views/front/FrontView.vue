<template>
  <HeaderComponent />
  <RouterView />
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';

export default {
  components: {
    HeaderComponent,
  },
};
</script>
