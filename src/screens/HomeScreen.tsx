import React, { useContext } from 'react';
import { View, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Carousel from 'react-native-snap-carousel';
import ImageColors from 'react-native-image-colors';

import useMovies from '../hooks/useMovies';
import MoviePoster from '../components/MoviePoster';
import HorizontalSlider from '../components/HorizontalSlider';
import GradientBackground from '../components/GradientBackground';
import getImageColors from '../helpers/getImageColors';
import { GradientContext } from '../context/GradientContext';
import { useEffect } from 'react';

const { width: windowWidth } = Dimensions.get('window');

const HomeScreen = () => {

    const { nowPlaying, popular, topRated, upcoming, isLoading } = useMovies();
    const { top } = useSafeAreaInsets();

    const { setGradientColors } = useContext( GradientContext );

    const getPosterColors = async ( index: number ) => {
        const movie = nowPlaying[index];
        const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

        const [ primary = 'green', secondary = 'orange' ] = await getImageColors( uri );
        setGradientColors({ primary, secondary })
    }

    useEffect(() => {
        if( nowPlaying.length > 0 ) {
            getPosterColors(0)
        } 
    }, [ nowPlaying ]);

    if( isLoading ) {
        return (
            <View 
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            >
                <ActivityIndicator color="red" size={ 100 }/>
            </View>
      )
    }

    return (
        <ScrollView>
            <GradientBackground>
                <View style={{ marginTop: top + 20 }}>
                    {/* Carrusel principal */}
                    <View style={{ height: 440 }} >
                        <Carousel
                            data={ nowPlaying }
                            renderItem={ ({ item }: any) => <MoviePoster movie={ item } /> }
                            sliderWidth={ windowWidth }
                            itemWidth={ 300 }
                            inactiveSlideOpacity={ 0.9 }
                            vertical={ false }
                            onSnapToItem={ index => getPosterColors(index) }
                        />
                    </View>
                </View>
            </GradientBackground>
            <View style={{ backgroundColor: 'white' }}>
                {/* Películas populares */}
                <HorizontalSlider movies={ popular } title="Populares" />
                {/* Películas mejor valoradas */}
                <HorizontalSlider movies={ topRated } title="Mejor valoradas" />
                {/* Películas próximas a estrenar */}
                <HorizontalSlider movies={ upcoming } title="Próximamente..." />
            </View>
        </ScrollView>
    )
};

export default HomeScreen;