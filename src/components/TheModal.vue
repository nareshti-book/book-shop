<template>
  <div class="modal" :class="{ visible: store.showModal }">
    <div class="modal-content flex-col">
      <span class="close" @click="closeModal">&times;</span>
      <div v-if="store.modalMode === 'showInfo' || store.modalMode === 'showError'">
        <h1 class="modal-header">{{ store.modalInfo }}</h1>
      </div>
      <div v-if="store.modalMode === 'showBookInfo'" class="flex-col">
        <h1 class="modal-header">{{ store.modalInfo.title }}</h1>
        <h4 class="modal-header">{{ store.modalInfo.author }}</h4>
        <img class="info-image" :src="store.modalInfo.img" />
        <div class="info-description">{{ store.modalInfo.description }}</div>
      </div>

      <ul v-if="store.modalMode === 'cart'" class="custom-cart">
        <h1 :style="{ textAlign: 'center' }" v-if="!bookStore.cart.length">Кошик порожній</h1>
        <li class="book-section" v-for="book in bookStore.cart" :key="book.id">
          <img :src="book.img" class="book-image" >
          <h4>{{ book.title }}</h4>
          <h4>{{ book.author }}</h4>
          <h4>{{ book.price }} ₪</h4>
          <button
            class="button"
            :style="{ padding: '0', minWidth: '80px', maxHeight: '25px' }"
            @click="deleteFromCart(book.id)"
          >
            Видалити
          </button>
        </li>
        <form ref="cartForm" v-if="bookStore.cart.length" class="book-section form">
          <div class="form-input">
            <h4>Ім'я:</h4> <input name="name" placeholder="Name" v-model="name" />
          </div>
          <div class="form-input">
            <h4>Телефон:</h4> <input name="phone" required placeholder="Phone" v-model="phone" />
          </div>
          <input hidden name="from" :value="from" />
          <input name="subject" hidden value="Замовлення книжок" />
          <input hidden name="message" :value="allText" />
          <div></div>

          <h1 class="form-input">Сума: {{ bookStore.totalCartPrice }} ₪</h1>
        </form>
      </ul>
      <div class="modal-actions">
        <button class="button" v-if="store.modalMode === 'showBookInfo'" @click="addToCart">
          Додати в кошик
        </button>
        <button
          class="button"
          v-if="store.modalMode === 'cart' && bookStore.cart.length"
          @click="makeOrder"
        >
          Замовити
        </button>
        <button class="button" v-if="store.modalMode === 'showInfo'" @click="openCart">До кошика</button>
        <button class="button" @click="closeModal">Назад</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import { modalStore, booksStore } from '../store/store';
import { sendEmail } from '../email/email';

const bookStore = booksStore();
const store = modalStore();

const cartForm = ref(null);

const openCart = () => {
  closeModal();
  store.setModalMode('cart')
  store.openModal()
}

const closeModal = () => {
  store.closeModal();
};

const deleteFromCart = (id) => {
  bookStore.removeFromCart(id);
};

const addToCart = () => {
  const book = { ...store.modalInfo };
  closeModal();
  bookStore.addToCart(book);

  store.setModalMode('showInfo');

  store.setModalInfo(`Книжку "${book.title.toUpperCase()}" додано в кошик`);
  store.openModal();
};
const name = ref('');
const phone = ref('');
const from = computed(() => `${phone.value} - ${name.value}`);
const allText = computed(() => {
  const message = 'Добрий день. Хочу замовити ці книжки: ';
  const list = bookStore.cart.map((book) => `${book.title} (${book.author})`).join(' , ');
  return message + list;
});

const showError = () => {
  store.setModalMode('showError');
  store.setModalInfo(`Будь ласка, вкажіть ім'я та номер телефону!`)
  store.openModal();
}

const makeOrder = () => {
  if (!name.value.length || !phone.value.length) return showError()
  sendEmail(cartForm.value);
  closeModal();
  store.setModalMode('showInfo');
  store.setModalInfo(
    `Замовлення прийняте.
  Ми зателефонуємо Вам найближчим часом!
  Вдалого дня!`
  );
  store.openModal();
  bookStore.resetCart();
  name.value = '';
  phone.value = '';
};
</script>

<style scoped>
.modal {
  position: fixed;
  visibility: hidden;
  opacity: 0;
  z-index: -1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.book-section {
  min-width: 300px;
  display: grid;
  margin: 1rem 0;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  border: 2px solid var(--first-color);
  padding: 1rem;
  border-radius: 0.5rem;
}

.modal-actions {
  align-self: flex-end;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.visible {
  visibility: visible;
  z-index: 9999;
  opacity: 1;
  transition: all 0.4s ease-in-out;
}

.modal-content {
  background-color: #fefefe;
  margin: 6% auto;
  padding: 20px;
  border: 1px solid #888;
  max-width: 90%;
  min-width: 300px;
}

.book-image {
  max-height: 100px;
  max-width: 100px;
}

.close {
  align-self: flex-end;
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.modal-header {
  text-align: center;
  /* font-size: 2rem; */
}

.btn-secondary {
  background: var(--first-color-alt);
}

.btn-secondary:hover {
  background: var(--first-color);
}

.info-description {
  padding: 1rem;
  margin-top: 1rem
}

.flex-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.custom-cart {
  display: flex;
  flex-direction: column;
  /* align-self: center; */
  gap: 1rem;
  position: relative;
  justify-content: center;
}

.info-image {
  max-height: 600px;
}

@media screen and (min-width: 767px) {
  .modal-content {
    width: 50%;
  }
}

@media screen and (max-width: 767px) {
  .modal-header {
    font-size: 1rem;
  }
}

@media screen and (max-width: 576px) {
  .book-section {
    display: flex;
    flex-direction: column;
    min-width: 200px;
    max-width: inherit;
  }
}

@media screen and (max-width: 1200px) {
  .book-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .form-input {
    align-self: flex-end;
  }
}
</style>
