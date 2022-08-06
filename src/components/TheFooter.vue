<template>
  <footer class="footer section">
    <div class="footer__container container grid">
      <div class="footer__content">
        <a href="#" class="footer__logo"> <i class="ri-book-mark-fill"></i> Nareshti_il </a>

        <h3 class="footer__title">Підпишись, якщо хочеш дізнатися про наші новини першим!</h3>
        <form ref="subscribe">
          <div class="footer__subscribe">
            <input
              style="color: #000000"
              type="email"
              placeholder="Введи свій email"
              class="footer__input"
              name="from"
              v-model="email"
            />

            <button class="button button--flex footer__button" @click.prevent="subscribeOnNews">
              Підпишись
              <i class="ri-arrow-right-up-line button__icon"></i>
            </button>
            <div>
              <input hidden name="subject" width="5" value="Підписка" />
              <input hidden name="message" width="5" value="Хочу підписку" />
            </div>
          </div>
        </form>
      </div>

      <div class="footer__content">
        <h3 class="footer__title">Адреса</h3>

        <ul class="footer__data">
          <li class="footer__information">Ізраїль</li>
          <li class="footer__information">Тель-Авів</li>
          <li class="footer__information"></li>
        </ul>
      </div>

      <div class="footer__content">
        <h3 class="footer__title">Контакти</h3>

        <ul class="footer__data">
          <li class="footer__information">Телефон</li>

          <div class="footer__social">
            <a href="https://www.facebook.com/" class="footer__social-link">
              <i class="ri-facebook-fill"></i>
            </a>
            <a href="https://www.instagram.com/nareshti_il/" class="footer__social-link">
              <i class="ri-instagram-line"></i>
            </a>
          </div>
        </ul>
      </div>

      <div class="footer__content">
        <h3 class="footer__title">Оплата</h3>

        <div class="footer__cards">
          <img src="https://firebasestorage.googleapis.com/v0/b/nareshti-il.appspot.com/o/main-images%2Fcard1.png?alt=media&token=1cc81000-dbbd-4cf7-be85-b273515a9294" alt="" class="footer__card" />
          <img src="https://firebasestorage.googleapis.com/v0/b/nareshti-il.appspot.com/o/main-images%2Fcard2.png?alt=media&token=73a15af4-f7d1-434e-af6f-1f62634d538e" alt="" class="footer__card" />
        </div>
      </div>
    </div>

    <p class="footer__copy">&#169; Nareshti_il Всі права захищені</p>
  </footer>
</template>

<script setup>
import { ref } from 'vue';
import { sendEmail } from '../email/email';
import { modalStore } from '../store/store';

const email = ref('');
const subscribe = ref(null);
const modStore = modalStore();

const showError = () => {
  modStore.setModalMode('showError');
  modStore.setModalInfo('Будь ласка, введіть коректну email-адресу!')
  modStore.openModal();
  email.value = ''
};

const subscribeOnNews = () => {
  if (
    !email.value ||
    !email.value.length ||
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value) === false
  )
    return showError();
  sendEmail(subscribe.value);
  email.value = '';
};
</script>
