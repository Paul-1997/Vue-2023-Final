<template>
  <div ref="productModal" class="modal fade" id="productModal" data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg p-4 p-lg-0">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title fw-semibold fs-4 ps-3">
            {{ product.id ? '產品變更列表' : '建立新的產品' }}
          </h4>
          <button type="button" class="btn-close" @click="closeModal()" aria-label="Close"></button>
        </div>
        <form action="">
          <div class="modal-body">
            <div class="row">
              <div class="col-lg-4 d-flex flex-column mb-4 mb-lg-0">
                <h3 class="fs-5 fw-semibold border-bottom border-dark pb-2 mb-2">
                  產品圖片
                </h3>
                <img :src="product.imageUrl" alt="產品主要圖片" class="primary-image flex-grow-1 mb-auto" />
                <div class="d-flex align-items-center py-2">
                  <h4 class="m-0 text-natural fs-6 flex-grow-1 me-auto">
                    更多圖片
                  </h4>
                  <button class="btn px-2 py-0" :class="onEdit" type="button" @click="showEditImage = !showEditImage">
                    {{ showEditImage ? '完成' : '編輯圖片' }}
                  </button>
                </div>
                <div class="product__imagesUrlGroup py-1 ">
                  <img v-for="img in product.imagesUrl" :src="img" alt="產品圖片" :key="img"
                    :style="{ pointerEvents: img === '' ? 'none' : '' }" />
                </div>
                <Transition name="fadeIn">
                  <div v-if="showEditImage">
                    <div class="form-group mb-2 border border-info border-2 p-2 rounded">
                      <label for="editMainImage" class="form-label">主圖</label>
                      <input type="text" class="form-control" id="editMainImage" v-model="product.imageUrl" />
                    </div>
                    <hr class="my-1" />
                    <template v-for="(images, index) in product.imagesUrl" :key="index + '.' +images">
                      <div class="form-group mb-2 border border-natural-light border-2 p-2 rounded">
                        <label :for="'moreImg' + index" class="form-label d-flex">圖片{{ index + 1 }}
                          <span class="btn btn-close align-middle ms-auto"
                            @click="product.imagesUrl.splice(index, 1)"></span></label>
                        <input type="text" class="form-control" :value="product.imagesUrl[index]"
                          @input="handleImgGroupInput($event.target.value, index)" />
                      </div>
                      <hr class="my-1" />
                    </template>
                    <button type="button" class="btn btn-success btn-sm"
                      @click="product.imagesUrl ? product.imagesUrl = [...product.imagesUrl, ''] : product.imagesUrl = ['']"
                      :disabled="isEnableAddNewImgBtn">
                      新增
                    </button>
                  </div>
                </Transition>
              </div>
              <div class="col-lg-8">
                <h3 class="fs-5 fw-semibold border-bottom border-dark pb-2 mb-3">
                  產品明細
                </h3>
                <div class="px-2 mb-3">
                  <label for="product-title" class="form-label">產品名稱</label><input type="text" id="product-title"
                    class="form-control" v-model="product.title" />
                  <span class="text-danger my-1" v-show="!product.title && isParamEmpty">此欄位必填</span>
                </div>
                <div class="px-2 mb-3">
                  <label for="product-category" class="form-label">產品分類</label>
                  <input type="text" id="product-category" class="form-control" v-model="product.category" />
                  <span class="text-danger my-1" v-show="!product.category && isParamEmpty">此欄位必填</span>
                </div>
                <div class="px-2 mb-3">
                  <label for="product-description" class="form-label">產品描述</label><textarea name=""
                    id="product-description" class="form-control" v-model="product.description">
    </textarea>
                </div>
                <div class="px-2 mb-3">
                  <label for="product-content" class="form-label">產品內容</label><textarea id="product-content" type="text"
                    class="form-control" v-model="product.content"></textarea>
                </div>
                <div class="px-2 mb-3 d-flex">
                  <div class="d-flex align-items-center me-4">
                    <label for="product-num" class="form-label pe-3">產品數量</label>
                    <input id="product-num" type="number" class="form-control" style="max-width: 100px"
                      v-model.number="product.num" />
                  </div>
                  <div class="d-flex align-items-center">
                    <label for="modalProduct-unit" class="form-label pe-3">產品單位</label>
                    <input id="modalProduct-unit" type="text" class="form-control" style="max-width: 100px"
                      v-model="product.unit" />
                    <p class="text-danger m-0 ms-1" v-show="!product.unit && isParamEmpty">
                      此欄位必填
                    </p>
                  </div>
                </div>
                <div class="px-2 mb-3 d-flex">
                  <div>
                    <div class="d-flex align-items-center me-4">
                      <label for="modalProduct-originPrice" class="form-label pe-3">原始售價</label>
                      <input id="modalProduct-originPrice" type="number" class="form-control" style="max-width: 100px"
                        v-model.number="product.origin_price" />
                    </div>
                    <p class="text-danger my-1" v-show="!product.origin_price && isParamEmpty">
                      此欄位必填
                    </p>
                  </div>
                  <div>
                    <div class="d-flex align-items-center">
                      <label for="modalProduct-price" class="form-label pe-3">售價</label>
                      <input id="modalProduct-price" type="number" class="form-control" style="max-width: 100px"
                        v-model.number="product.price" />
                    </div>
                    <p class="text-danger my-1" v-show="!product.price && isParamEmpty">
                      此欄位必填
                    </p>
                  </div>
                </div>
                <div class="form-check px-2 mb-3">
                  <input type="checkbox" name="isEnabled" id="modalProduct-isEnabled" v-model="product.is_enabled"
                    true-value="1" false-value="0" class="me-2" />
                  <label for="modalProduct-isEnabled" class="form-label">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-natural px-3 px-sm-5" @click="closeModal('product')">
              取消
            </button>
            <button type="button" class="btn btn-success px-3 px-sm-5" @click="emitSubmit">
              {{ product.id ? '編輯' : '新增' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped>
img {
  object-fit: contain;
  max-width: 100%;
}

.primary-image {
  height: 300px;
}

.product__imagesUrlGroup {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-top: 1px solid gray;
  gap: 4px;
}

@media (width > 767px) {
  .product__imagesUrlGroup {
    grid-template-columns: repeat(4, 1fr);
  }
}

.product__imagesUrlGroup>img {
  aspect-ratio: 1;
  object-fit: cover;
}
</style>
<!-- eslint-disable consistent-return -->
<!-- eslint-disable no-param-reassign -->
<script>
import Modal from 'bootstrap/js/dist/modal';
import { debounce } from '@/helper/helper';

export default {
  props: ['tempProduct'],
  data() {
    return {
      product: {},
      productModal: null,
      // statement
      isParamEmpty: false,
      showEditImage: false,
    };
  },
  methods: {
    openModal() {
      if (this.isParamEmpty) this.isParamEmpty = false;
      this.productModal.show();
    },
    closeModal() {
      this.productModal.hide();
    },
    isEmpty() {
      this.isParamEmpty = ['title', 'category', 'origin_price', 'price', 'unit'].some((param) => this.product[param] === '' || this.product[param] === undefined);
      return this.isParamEmpty;
    },
    emitSubmit() {
      this.isEmpty();
      if (this.isParamEmpty) return false;
      this.$emit('submitProduct', this.product);
      this.closeModal();
    },
    // 更多圖片 -- debounce
    debounceInputRenderImg: debounce((v, i, target) => {
      target.imagesUrl[i] = v;
    }),
    handleImgGroupInput(value, index) {
      this.debounceInputRenderImg(value, index, this.product);
    },
  },
  computed: {
    onEdit() {
      return this.showEditImage ? 'btn-success' : 'btn-outline-natural';
    },
    isEnableAddNewImgBtn() {
      if (!this.tempProduct.imagesUrl || !this.tempProduct?.imagesUrl.length) return false;
      const lastOne = this.tempProduct.imagesUrl.slice(-1)[0];
      // 等於空字串
      if (!lastOne) return true;
      return false;
    },
  },
  watch: {
    tempProduct() {
      this.product = { ...this.tempProduct };
    },
  },
  mounted() {
    this.productModal = new Modal(this.$refs.productModal);
    this.product = this.tempProduct;
  },
};
</script>
