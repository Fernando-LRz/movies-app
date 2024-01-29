import axios from 'axios';
import { movieDBApiKey } from '@env';

const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: movieDBApiKey,
        language: 'es-ES'
    }
});

export default movieDB;



