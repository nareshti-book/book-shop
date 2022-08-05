<template>
  <form class="contact__form" ref="form">
    <div class="contact__inputs">
      <div class="contact__content">
        <input type="email" name="from" class="contact__input" v-model="message.from" />
        <label class="contact__label">Email</label>
      </div>

      <div class="contact__content">
        <input type="text" name="subject" class="contact__input" v-model="message.subject" />
        <label class="contact__label">Тема</label>
      </div>

      <div class="contact__content contact__area">
        <textarea
          name="message"
          placeholder=" "
          class="contact__input"
          v-model="message.text"
        ></textarea>
        <label for="" class="contact__label">Повідомлення</label>
      </div>
    </div>
    <button href="#" class="button button--flex" @click.prevent="tryToSendEmail">
      Відправити
      <i class="ri-arrow-right-up-line button__icon"></i>
    </button>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { sendEmail } from '../email/email';

const message = reactive({
  subject: '',
  from: '',
  text: '',
});
const form = ref(null);
const tryToSendEmail = () => {
  sendEmail(form.value);
  message.subject = '';
  message.from = '';
  message.text = '';
};
</script>
