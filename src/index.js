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

function onSearch(event) {
    event.preventDefault();
    const inputValue = event.currentTarget.searchQuery.value;

    if (inputValue.trim() === '') {
        Notiflix.Notify.warning('Sorry, but search input not be empty.');
        return;
    };

    clearMarup();
    apiService.query = inputValue;
    apiService.resetPage();
    apiService.resetAmountData();
    fetchData();
};

function fetchData() {
    hideButtonLoadMore()
    apiService.fetchArticles().then((data) => {
        if (data.hits.length === 0) {
            return;
        };
        apiService.incrementAmountData();
        apiService.incrementPage();
        paintMarkup(data.hits);
        if (apiService.amountData >= data.totalHits) {
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
            return;
        };

        displayButtonLoadMore();
    }).catch(error => console.log(error));
};

function hideButtonLoadMore() {
    buttonLoadMoreRef.classList.add('is-hidden');
};

function displayButtonLoadMore() {
    buttonLoadMoreRef.classList.remove('is-hidden');
};



