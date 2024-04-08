<template>
  <div class="d-flex min-vh-100" style="background-color: #faebd7">
    <DashboardPanel />
    <div class="container-fluid p-md-4">
      <RouterView />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import userStore from '@/stores/user';
import DashboardPanel from '../../components/DashboardPanel.vue';

export default {
  components: {
    DashboardPanel,
  },
  methods: {
    ...mapActions(userStore, ['checkUser']),
  },
  mounted() {
    this.checkUser();
  },
};
</script>
