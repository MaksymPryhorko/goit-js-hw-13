import axios from 'axios';

export default class ApiService {
    constructor() {
        this.searchValue = '';
        this.page = 1;
        this.amountData = 0;
        this.totalHits = 0;
    }

    async fetchArticles() {
        const BASE_URL = 'https://pixabay.com/api/';
        const API_KEY = '22710862-ad31ee603fc8e39b27d5b9240';
        const searchParameters = `${this.searchValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
        // const response = await fetch(`${API_KEY}${searchParameters}`);
        // const images = await response.json();
        // return images;
        
        const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${searchParameters}`);
        return response.data;
    }

    incrementPage() {
        this.page += 1;
    };

    resetPage() {
        this.page = 1;
    };

    set query(newQuery) {
        this.searchValue = newQuery;
    };

    set amount(newAmountData) {
        this.amountData = newAmountData;
    };

    incrementAmountData() {
        this.amountData += 40;
    };

    resetAmountData() {
        this.amountData = 0;
    }

    resetTotalHits() {
        this.totalHits = 0;
    };

    set updateTotalHits(newTotalHits) {
        this.totalHits = newTotalHits;
    };

    get returnTotalHits() {
        return this.totalHits;
    };

};

