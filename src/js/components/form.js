//------------------------------------------------------------------------Обработка формы
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('form').forEach(form => {

    const emailTest = input => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(input.value);
    const phoneTest = input => /^\+7\s?\d{10}$/.test(input.value);

    const formAddError = input => {
      input.classList.add('_error');
      input.parentElement.classList.add('_error');
      const errorSpan = input.parentElement.querySelector('.form__error');
      if(errorSpan) errorSpan.classList.add('view');
    };

    const formRemoveError = input => {
      input.classList.remove('_error');
      input.parentElement.classList.remove('_error');
      const errorSpan = input.parentElement.querySelector('.form__error');
      if(errorSpan) errorSpan.classList.remove('view');
    };

    const formValidate = form => {
      let error = 0;
      form.querySelectorAll('._req').forEach(input => {
        formRemoveError(input);

        if(input.classList.contains('_email') && !emailTest(input)) error++, formAddError(input);
        else if(input.classList.contains('_number') && !phoneTest(input)) error++, formAddError(input);
        else if(input.type === 'checkbox' && !input.checked) error++, formAddError(input);
        else if(input.value.trim() === '') error++, formAddError(input);
      });
      return error;
    };

    const formSend = async e => {
      e.preventDefault();
      const error = formValidate(form);
      if(error) return;

      const formData = new FormData(form);
      form.classList.add('_sending');

      try {
        const response = await fetch('send.php', { method: 'POST', body: formData });
        if(response.ok) {
          form.style.display = 'none';
          const successMessage = document.createElement('div');
          successMessage.classList.add('success-message');
          successMessage.textContent = 'Форма успешно отправлена! Спасибо за ваш отклик.';
          form.parentElement.appendChild(successMessage);
          form.reset();
        } else alert('Ошибка при отправке формы');
      } catch(e) {
        alert('Ошибка при отправке формы');
      } finally {
        form.classList.remove('_sending');
      }
    };

    form.addEventListener('submit', formSend);
  });
});
////------------------------------------------------------------------------Обработка форм

