<template>
  <header class="header" :class="{ 'scroll-header': headerScrolled }">
    <nav class="nav container">
      <a href="#" class="nav__logo" @click="setActive('#')">
        <i class="ri-book-mark-fill"></i> Nareshti_il
      </a>
      <div class="nav__menu" :class="{ 'show-menu': showMenu }">
        <ul class="nav__list">
          <li v-for="link in NAV_LINKS" :key="link.href" class="nav__item">
            <a
              :href="link.href"
              class="nav__link"
              :class="{
                'active-link': link.href === activeLink,
              }"
              @click="setActive(link.href)"
            >
              {{ link.name }}</a
            >
          </li>
        </ul>

        <div class="nav__close" @click="changeShowMenu">
          <i class="ri-close-line"></i>
        </div>
      </div>

      <div class="nav__btns">

        <div class="nav__shop" id="cart-shop">

          <button class="shop__btn" @click="openCart">
            <div class="cart__size" v-if="store.cart.length">
            <p class="cart__size-text">{{ store.cart.length }}</p>
          </div>
            <i class="ri-shopping-bag-line"></i>
          </button>
        </div>

        <div class="nav__toggle" @click="changeShowMenu">
          <i class="ri-menu-line"></i>
        </div>
      </div>
    </nav>
    <a
      href="#"
      class="scrollup"
      :class="{
        'show-scroll': showScrollUp || (activeLink !== '#' && !showScrollUp),
      }"
      @click="setActive('#')"
    >
      <i class="ri-arrow-up-fill scrollup__icon"></i>
    </a>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { booksStore, modalStore } from '../store/store.js'

const store = booksStore()
const cartStore = modalStore()
const showMenu = ref(false);
const changeShowMenu = () => {
  showMenu.value = !showMenu.value;
};

const openCart = () => {
  cartStore.setModalMode('cart')
  cartStore.openModal()
}

const headerScrolled = ref(false);
const showScrollUp = ref(false);

const handleScrolling = () => {
  showScrollUp.value = window.scrollY > 400 ? true : false;
  headerScrolled.value = window.scrollY > 80 ? true : false;
};

onMounted(() => {
  window.addEventListener('scroll', handleScrolling);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScrolling);
});

const NAV_LINKS = [
  { name: 'Головна', href: '#' },
  { name: 'Про нас', href: '#about' },
  { name: 'Книги', href: '#products' },
  { name: 'Запитання', href: '#faqs' },
  { name: 'Контакти', href: '#contact' },
];

const activeLink = ref('#');
const setActive = (val) => {
  activeLink.value = val;
  if (showMenu.value) changeShowMenu();
};
</script>

<style scoped>
.nav__shop {
  position: relative;
}

.cart__size {
  width: 20px;
  height: 20px;
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: var(--first-color);
  color: white;
  border-radius: 50%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.shop__btn {
  background-color: white;
}
</style>
