<template>
  <div class="col-xl-10 mx-auto">
    <h2 class="h2 mb-4 fw-bold text-secondary">所有訂單</h2>
    <div class="accordion accordion-flush" id="orderLists">
      <div class="accordion-item mb-3" v-for="(order, i) in orders" :key="order">
        <h2 class="accordion-header" :id="`orderCollapseHeader${i+1}`">
          <button class="accordion-button collapsed bg-primary fs-5" type="button" aria-expanded="false"
            :aria-controls="`orderCollapseTarget${i}`" @click.prevent="toggleCollapse(i)">
            {{ `訂單${i + 1}號 : ${order.id}` }}
          </button>
        </h2>
        <div :id="`orderCollapseTarget${i+1}`" class="accordion-collapse collapse"
          :aria-labelledby="`orderCollapseHeader${i+1}`" ref="accordionTarget">
          <div class="accordion-body text-secondary">
            <ul class="list-unstyled">
              <li class="mb-3 fs-4">訂單日期 : {{ DoFormatDate(order.create_at * 1000) }}</li>
              <li class="mb-3">
                <h3 class="fw-bold border-bottom border-dark pb-1 mb-2 fs-5">訂購項目</h3>
                <div class="px-2">
                  <ol class="mb-2">
                    <li v-for="item in order.products" :key="item.id"
                      class="d-flex align-items-center justify-content-between border-bottom border-natural-light">
                      <p class="fs-4">{{ item.product.title }} <span class="fs-5 ms-3">{{
                        `${item.qty}${item.product.unit}` }}</span></p>
                      <p>金額:{{ item.total }}</p>
                    </li>
                  </ol>
                  <div>
                    <div v-if="isCouponUse">
                      <p>已啟用優惠卷 <span class="ms-3 text-success fs-5">{{ 'happyEat88' }}</span></p>
                      <p>總計: {{ DoFormatCurrency(order.total) }}</p>
                    </div>
                    <p v-else class="text-muted text-end">優惠卷未啟用</p>
                  </div>
                </div>
              </li>
              <!-- <li class="mb-3">付款狀態 : {{ order.is_paid ? '已付款' : '未付款' }}</li> -->
              <li class="mb-3">
                <h3 class="fs-5 fw-bold border-bottom border-dark pb-1">付款人資訊</h3>
                <div class="ps-2 pt-2">
                  <p class="mb-2"><span class="fw-bold">訂購人姓名:</span> {{ order.user.name }}</p>
                  <p class="mb-2"><span class="fw-bold">訂購人地址:</span> {{ order.user.address }}</p>
                  <p class="mb-2"><span class="fw-bold">訂購人電話:</span> {{ order.user.tel }}</p>
                  <p class="mb-2"><span class="fw-bold">訂購人信箱:</span> {{ order.user.email }}</p>
                  <p class="fw-bold">備註訊息: <span class="ms-1 fw-normal">{{ order.user.message || '無備註訊息' }}</span></p>
                </div>

              </li>
              <li class="text-end">
                <button type="button" class="btn btn-danger me-3" @click.prevent="getDeleteOrder(order)">刪除訂單</button>
                <button type="button" class="btn btn-primary">修改訂單</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- <pre>
      {{ orders }}
    </pre> -->
    <AdminDeleteModal :target='tempOrder' :target-title="tempOrder.id" :id="tempOrder.id"
      @delete-target="deleteOrders" ref="deleteModal" />
  </div>

</template>

<script>
import Collapse from 'bootstrap/js/dist/collapse';
import { formatDate, formatCurrency } from '@/helper/format';
import { mapActions, mapState } from 'pinia';
import AdOrderStore from '@/stores/AdOrders';
import AdminDeleteModal from '@/components/AdminDeleteModal.vue';

export default {
  data() {
    return {
      tempOrder: {},
      accordionTargets: null,
      isCouponUse: false,
    };
  },
  methods: {
    getDeleteOrder(order) {
      this.tempOrder = { ...order };
      this.$refs.deleteModal.openModal();
    },
    DoFormatCurrency(number) {
      return formatCurrency(number);
    },
    DoFormatDate(timeStamp) {
      return formatDate(timeStamp, 'YYYY-MM-DD, HH:mm:ss');
    },
    toggleCollapse(i) {
      this.accordionTargets[i].toggle();
    },
    ...mapActions(AdOrderStore, ['getOrders', 'updateOrders', 'deleteOrders']),
  },
  computed: {
    ...mapState(AdOrderStore, ['orders', 'pagination']),
  },
  mounted() {
    this.getOrders();
  },
  updated() { // 等狀態被資料更新完後再對元素賦值
    this.accordionTargets = this.$refs.accordionTarget.map((target) => {
      const item = new Collapse(target);
      return item;
    });
  },
  components: {
    AdminDeleteModal,
  },
};
</script>

<style scoped>
.accordion-button:not(.collapsed) {
  color: inherit;
  background-color: #adb5bd;
}
</style>
