<template>
  <div class="d-flex min-vh-100" style="background-color: #faebd7;">
    <DashboardPanel />
    <div class="container-fluid p-md-4">
      <RouterView />
    </div>
  </div>
</template>

<script>
import DashboardPanel from '../../components/DashboardPanel.vue';

export default {
  components: {
    DashboardPanel,
  },
};
</script>
