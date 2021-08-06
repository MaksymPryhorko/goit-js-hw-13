import './css/styles.css';
import galleryTpl from './gallery.hbs'
import ApiService from './api-service'
import Notiflix from 'notiflix';


const searchFormRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const buttonLoadMoreRef = document.querySelector('.load-more');

const apiService = new ApiService();

searchFormRef.addEventListener('submit', onSearch);
buttonLoadMoreRef.addEventListener('click', fetchData);

function clearMarup() {
    galleryRef.innerHTML = '';
};

function paintMarkup(hits) {
    const imagesList = hits.map(galleryTpl).join('');
    galleryRef.insertAdjacentHTML('beforeend', imagesList);
};

async function onSearch(event) {
    event.preventDefault();
    const inputValue = event.currentTarget.searchQuery.value;

    if (inputValue.trim() === '') {
        Notiflix.Notify.warning('Sorry, but search input not be empty.');
        return;
    };

    clearMarup();
    apiService.query = inputValue;
    apiService.resetPage();
    apiService.resetTotalHits();
    apiService.resetAmountData();
    await fetchData();
    Notiflix.Notify.success(`Hooray! We found ${apiService.totalHits} images.`);
};

async function fetchData() {
    hideButtonLoadMore()
    try {
        const images = await apiService.fetchArticles();

        if (images.hits.length === 0) {
            Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');
        return;
        };

        apiService.updateTotalHits = images.totalHits;
        apiService.incrementAmountData();
        apiService.incrementPage();
        paintMarkup(images.hits);
        apiService.updateTotalHits = images.totalHits;

        if (apiService.amountData >= images.totalHits) {
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
            return;
        };

        displayButtonLoadMore();
       
    } catch (error) {
        console.log(error)
    };
};

function hideButtonLoadMore() {
    buttonLoadMoreRef.classList.add('is-hidden');
};

function displayButtonLoadMore() {
    buttonLoadMoreRef.classList.remove('is-hidden');
};



