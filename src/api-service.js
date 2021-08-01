export default class ApiService {
    constructor() {
        this.searchValue = '';
        this.page = 1;
        this.amountData = 0;
    }

    fetchArticles() {
        const API_KEY = 'https://pixabay.com/api/?key=22710862-ad31ee603fc8e39b27d5b9240';
        const searchParameters = `&q=${this.searchValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`

        return fetch(`${API_KEY}${searchParameters}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            };
            throw new Error(response.status)
        })
            .then(images => {
            return images;
        })
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
};

