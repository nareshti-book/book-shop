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
import { modalStore } from '../store/store';
const modStore = modalStore();

const message = reactive({
  subject: '',
  from: '',
  text: '',
});

const form = ref(null);

const showError = (textData) => {
  modStore.setModalMode('showError');
  modStore.setModalInfo(`Будь ласка, ${textData}!`)
  modStore.openModal();
}


const tryToSendEmail = () => {
  if (!message.from.trim().length || !message.subject.trim().length || !message.text.trim().length) return showError('заповніть всі поля')
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(message.from) === false) return showError('введіть коректну email-адресу')
  sendEmail(form.value);
  message.subject = '';
  message.from = '';
  message.text = '';
};
</script>
