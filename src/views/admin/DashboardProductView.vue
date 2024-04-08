<template>
  <h2 class="text-center h2">這是產品</h2>
  <pre>
    {{ allProducts }}
    {{ products }}
    {{ pagination }}
  </pre>
</template>

<script>
import AdProductStore from '@/stores/AdProducts';
import { mapActions, mapState } from 'pinia';

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState(AdProductStore, ['allProducts', 'products', 'pagination']),
  },
  methods: {
    ...mapActions(AdProductStore, ['getAllProducts']),
  },
  mounted() {
    this.getAllProducts();
  },
};
</script>
