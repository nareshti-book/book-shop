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
          <img src="../assets/card1.png" alt="" class="footer__card" />
          <img src="../assets/card2.png" alt="" class="footer__card" />
          <img src="../assets/card3.png" alt="" class="footer__card" />
        </div>
      </div>
    </div>

    <p class="footer__copy">&#169; Nareshti_il Всі права не захищено</p>
  </footer>
</template>

<script setup>
import { ref } from 'vue';
import { sendEmail } from '../email/email';

const email = ref('');
const subscribe = ref(null);

const subscribeOnNews = () => {
  sendEmail(subscribe.value);
  email.value = '';
};
</script>
