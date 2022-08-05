<template>
  <main class="main" @scroll="showScrollUp">
  <TheModal />
    <section class="home">
      <div class="home__container container grid">
        <img src="../assets/home.jpg" alt="" class="home__img" />
        <div class="home__data">
          <h1 class="home__title">
            Нарешті! <br />
            Книги українською в Ізраїлі!
          </h1>
          <p class="home__description">
            Літературно-волонтерська ініціатива: читай і допомагай. Весь дохід із продажу книг
            передаємо ЗСУ!
          </p>
          <a href="#about" class="button button--flex">
            Далі <i class="ri-arrow-right-down-line button__icon"></i>
          </a>
          <div class="home__social">
            <span class="home__social-follow">Підпишись</span>

            <div class="home__social-links">
              <a href="https://www.facebook.com/" target="_blank" class="home__social-link">
                <i class="ri-facebook-fill"></i>
              </a>
              <a
                href="https://www.instagram.com/nareshti_il/"
                target="_blank"
                class="home__social-link"
              >
                <i class="ri-instagram-line"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ABOUT -->
    <section class="about section container" id="about">
      <div class="about__container grid">
        <img src="../assets/product1.jpg" alt="" class="about__img" />

        <div class="about__data">
          <h2 class="section__title about__title">{{ aboutSection.header }}</h2>

          <h4 class="about__description">
            {{ aboutSection.subheader }}
          </h4>

          <div class="about__details">
            <p class="about__details-description" v-for="item in aboutSection.list" :key="item.id">
              <i class="ri-checkbox-fill about__details-icon"></i>
              {{ item.text }}
            </p>
          </div>

          <a href="#products" class="button--link button--flex" id="products">
            Замовити <i class="ri-arrow-right-down-line button__icon"></i>
          </a>
        </div>
      </div>
    </section>

    <!-- STEPS -->
    <section class="steps section container">
      <div class="steps__bg">
        <h2 class="section__title-center steps__title">Замовлення та доставка:</h2>
        <div class="steps__container grid">
          <div class="steps__card" v-for="step in stepsSection" :key="step.id">
            <div class="steps__card-number">{{ step.id }}</div>
            <h3 style="class=" steps__card-title>{{ step.title }}</h3>
            <p style="color: #000000" class="steps__card-description">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- PRODUCTS -->
    <section class="product section container">
      <h2 class="section__title-center">Книги українською:</h2>

      <p class="product__description">
        Поєднай приємне та корисне з іще кориснішим... <br />
        Купуй, насолоджуйся українським та допомагай ЗСУ! <br />
        Все буде Україна!
      </p>

      <div class="product__container grid">
        <BookCard v-for="book in books" :key="book.id" :book="book" />
      </div>
    </section>

    <!-- QUESTIONS -->
    <section class="questions section" id="faqs">
      <h2 class="section__title-center questions__title container">
        Відповіді на питання які тебе можуть цікавити:
      </h2>

      <div class="questions__container container grid">
        <div
          class="questions__item"
          v-for="question in questions"
          :key="question.id"
          :class="{ 'accordion-open': question.id === activeQuestionId }"
        >
          <h4 class="questions__header" @click="changeActiveQuestion(question.id)">
            <i class="ri-add-line questions__icon"></i>
            <h3 class="questions__item-title">{{ question.question }}</h3>
          </h4>
          <div v-if="question.id === activeQuestionId" class="questions__content">
            <p class="questions__description">{{ question.answer }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CONTACT -->
    <section class="contact section container" id="contact">
      <div class="contact__container grid">
        <div class="contact__box">
          <h2 class="section__title">
            Маєш ідею чи пропозицію <br />
            повідом нам про це <br />
            вже сьогодні:
          </h2>

          <div class="contact__data">
            <div class="contact__information">
              <h3 class="contact__subtitle">Зателефонуй нам:</h3>
              <span class="contact__description">
                <i class="ri-phone-line contact__icon"></i>
                Телефон
              </span>
            </div>

            <div class="contact__information">
              <h3 class="contact__subtitle">Напиши нам:</h3>
              <span class="contact__description">
                <i class="ri-mail-line contact__icon"></i>
                book.il.nareshti@gmail.com
              </span>
            </div>
          </div>
        </div>

        <TheForm />
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref,computed } from 'vue';

import { booksStore, sectionsStore } from '../store/store';

import TheForm from './TheForm.vue';
import BookCard from './BookCard.vue';
import TheModal from './TheModal.vue';

const bookStore = booksStore();
const sections = sectionsStore();

const books = computed(() => bookStore.books);
const stepsSection = sections.stepsSection;
const aboutSection = sections.aboutSection;
const questions = sections.questions;

const activeQuestionId = ref(null);

const changeActiveQuestion = (id) => {
  if (activeQuestionId.value === id) {
    return (activeQuestionId.value = null);
  }
  activeQuestionId.value = id;
};
</script>

<style scoped>
/* .book-info {
  display: none;
  position: absolute;
  left: 40px;
  top: 140px;
  bottom: 20px;
  right: 20px;
  z-index: 5;
  background-color: white;
  border-radius: 4px;
  border: 2px solid red;
  overflow: hidden;
}

.product__info:hover + .book-info {
  display: block
} */

.btn-container {
  position: relative;
}
</style>
