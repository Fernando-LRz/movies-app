import axios from 'axios';

const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: '3d97f4174127a4ec94aeb9586798777c',
        language: 'es-ES'
    }
});

export default movieDB;



