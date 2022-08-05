import emailjs from '@emailjs/browser';

export const sendEmail = (data) => {
  // return console.log('email', form.value)
  emailjs.sendForm('service_cg6abrs', 'template_d0zxvwh', data, 'TRfY_y9wbaDPg0AU5')
    .then((result) => {
      console.log('SUCCESS!', result.text);
    }, (error) => {
      console.log('FAILED...', error.text);
    });
}
