<template>
  <div class="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true" ref="deleteModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header justify-content-start alert alert-danger mb-0 border-0 border-bottom border-light"
          role="alert">
          <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:">
            <use xlink:href="#exclamation-triangle-fill" />
          </svg>
          <h5 class="modal-title">
            確定要刪除 {{ targetTitle }} 嗎?
            <span class="fs-6 align-middle">(不可復原)</span>
          </h5>
        </div>
        <div class="modal-footer border-0 py-2">
          <button type="button" class="btn btn-outline-natural" @click="closeModal()">
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="emitDeleteTarget">
            刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  props: ['target', 'targetTitle', 'id'],
  data() {
    return {
      modal: null,
    };
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
    emitDeleteTarget() {
      this.$emit('deleteTarget', this.id);
      this.closeModal();
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.deleteModal);
  },
};
</script>
