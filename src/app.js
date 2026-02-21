const API_KEY = '54251385-6f7a6e7accba74a4972a9b1fa';
const BASE_URL = 'https://pixabay.com/api/';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let searchQuery = '';
let page = 1;
const perPage = 12;
let totalHits = 0;

loadMoreBtn.classList.add('hidden');


form.addEventListener('submit', async (e) => {
  e.preventDefault();

  searchQuery = e.target.elements.query.value.trim();
  if (!searchQuery) return;

  page = 1;
  gallery.innerHTML = '';
  loadMoreBtn.classList.add('hidden');

  await fetchImages();
});


loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  await fetchImages();
});

async function fetchImages() {
  try {
    const response = await fetch(
      `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&page=${page}&per_page=${perPage}`
    );

    if (!response.ok) {
      throw new Error('Помилка отримання');
    }

    const data = await response.json();
    totalHits = data.totalHits;

    if (page === 1 && data.hits.length === 0) {
      PNotify.alert({
        text: 'Зображення не знайдено',
        type: 'помилка'
      });
      return;
    }

    renderImages(data.hits);

    if (page === 1) {
      PNotify.alert({
        text: `знайдено ${totalHits} картинок`,
        type: 'успіх'
      });
    }


    if (page * perPage < totalHits) {
      loadMoreBtn.classList.remove('hidden');
    } else {
      loadMoreBtn.classList.add('hidden');
      PNotify.alert({
        text: 'кінець',
        type: 'інформація'
      });
    }

    smoothScroll();

  } catch (error) {
    PNotify.alert({
      text: 'Щось не так',
      type: 'помилка'
    });
  }
}

function renderImages(images) {
  const markup = images.map(image => `
    <li>
      <div class="photo-card">
        <img 
          src="${image.webformatURL}" 
          data-large="${image.largeImageURL}"
          alt="${image.tags}" 
        />

        <div class="stats">
          <p class="stats-item">
            <i class="material-icons">thumb_up</i>
            ${image.likes}
          </p>
          <p class="stats-item">
            <i class="material-icons">visibility</i>
            ${image.views}
          </p>
          <p class="stats-item">
            <i class="material-icons">comment</i>
            ${image.comments}
          </p>
          <p class="stats-item">
            <i class="material-icons">cloud_download</i>
            ${image.downloads}
          </p>
        </div>
      </div>
    </li>
  `).join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}


function smoothScroll() {
  const firstCard = gallery.firstElementChild;
  if (!firstCard) return;

  const { height: cardHeight } = firstCard.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}


gallery.addEventListener('click', (e) => {
  if (e.target.nodeName !== 'IMG') return;

  const largeImage = e.target.dataset.large;

  const instance = basicLightbox.create(`
    <img src="${largeImage}" width="100%">
  `);

  instance.show();
});