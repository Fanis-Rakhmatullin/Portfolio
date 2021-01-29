const hamburger = document.querySelector('.hamburger-btn');
const close = document.querySelector('.hamburger__close');
const modal = document.querySelector('.hamburger');
// const hamburger = document.querySelector('.hamburger__menu');

hamburger.addEventListener('click', (evt) => {
  evt.preventDefault();
  modal.style.display = 'block';
});

close.addEventListener('click', (evt) => {
  evt.preventDefault();
  modal.style.display = 'none';
});

window.addEventListener('click', (evt) => {
  if (modal.style.display === 'block'
    && !hamburger.contains(evt.target)) {
      modal.style.display = 'none';
  }
})