<template>
  <div style="display: flex; gap: 100px;">
    <DashboardPanel />
    <RouterView />
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
