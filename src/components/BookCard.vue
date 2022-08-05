<template>
  <article class="product__card">
    <img :src="props.book.img" :alt="props.book.description" class="product__img" />

    <h3 class="product__title">
      {{ props.book.author }} <br />
      {{ props.book.title }}
    </h3>
    <span class="product__price">{{ book.price }} ₪</span>

    <p class="product-info" v-if="activeBookId === props.book.id">
      {{ props.book.description }}
    </p>
    <div class="btn-c">
      <button class="button-2" @click="showInfo(props.book.id)">
        <i class="ri-information-line"></i>
      </button>
      <button class="button-1" @click="addToCart">
        <i class="ri-shopping-bag-line"></i>
      </button>
    </div>
  </article>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { booksStore, modalStore } from '../store/store';
const props = defineProps(['book']);

const activeBookId = ref(null);
const store = booksStore()
const modalState = modalStore()
const addToCart = () => {
  modalState.setModalMode('addToCart')
  store.addToCart(props.book)

  modalState.setModalInfo(`Книжку "${props.book.title.toUpperCase()}" додано в кошик`)
  modalState.openModal()
}
const showInfo = () => {
  modalState.setModalMode('showBookInfo')
  modalState.setModalInfo(props.book)
  modalState.openModal()
};
</script>

<style>
.btn-c {
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.btn-c button {
  background-color: var(--first-color);
  color: #fff;
  padding: 0.25rem;
  border-radius: 0.35rem;
  font-size: 1.15rem;
  margin: 0 0.35rem;
}

.product-info {
  overflow: hidden;
}
</style>
