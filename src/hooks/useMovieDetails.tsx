import { useState, useEffect } from 'react';
import movieDB from '../api/movieDB';
import { FullMovie } from '../interfaces/movieInterface';
import { Cast, CreditsResponse } from '../interfaces/creditsInterface';

interface MovieDetails {
    isLoading: boolean;
    fullMovie?: FullMovie;
    cast: Cast[];
};

const useMovieDetails = ( movieId: number ) => {
    const [ state, setState ] = useState<MovieDetails>({
        isLoading: true,
        fullMovie: undefined,
        cast: []
    });

    const getMovieDetails = async () => {
        const movieDetailsPromise = movieDB.get<FullMovie>(`/${movieId}`);
        const movieCreditsPromise = movieDB.get<CreditsResponse>(`/${movieId}/credits`);

        const [ movieDetailsResponse, movieCreditsResponse ] = await Promise.all([      
            movieDetailsPromise, 
            movieCreditsPromise 
        ]);

        setState({
            isLoading: false,
            fullMovie: movieDetailsResponse.data,
            cast: movieCreditsResponse.data.cast
        })
    }

    useEffect(() => {
        getMovieDetails();
    }, []);

    return {
        ...state
    }
}

export default useMovieDetails;