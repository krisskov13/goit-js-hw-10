import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const selectBreed = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');
const error = document.querySelector('.error');

fetchBreeds()
  .then(response => {
    selectBreed.classList.remove('is-hidden');
    const fragment = createOptionCat(response);
    selectBreed.insertAdjacentHTML(
      'beforeend',
      `<option>Сhoose a breed of cat<option/>`
    );
    selectBreed.appendChild(fragment);
  })
  .catch(err => {
    console.log(err)
    error.classList.remove('is-hidden');
  })
  .finally(() => {
    loader.classList.add('is-hidden');
  });

  function createOptionCat(response) {
    const fragment = document.createDocumentFragment();
    response.forEach(item => {
      const option = document.createElement('option');
      option.value = item.id;
      option.textContent = item.name;
      fragment.appendChild(option);
    })
    return fragment;
  }

  function createMarkup(item) {
    return `
    <div class="cat-card">
    <div class="img-wrapper">
      <img src="${item.url}" alt="${item.breeds[0].name}" class="cat-img">
    </div>
    <p class="cat-name">${item.breeds[0].name}</p>
    <p class="cat-description">${item.breeds[0].description}</p>
    <p class="cat-temperament">${item.breeds[0].temperament}</p>
    </div>
    `
  }

selectBreed.addEventListener('change', () => {
  loader.classList.remove('is-hidden');
  catInfo.classList.add('is-hidden');
  const choiseOfCat = selectBreed.value;
  fetchCatByBreed(choiseOfCat)
    .then(response => {
      catInfo.classList.remove('is-hidden');
      const card = createMarkup(response[0]);
      catInfo.innerHTML = card;
    })
    .catch(err => {
      console.log(err)
      error.classList.remove('is-hidden');
    })
    .finally(() => {
      loader.classList.add('is-hidden');
    });
})  
         

