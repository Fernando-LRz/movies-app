import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { View, Image, StyleSheet, Dimensions, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { RootStackParams } from '../navigation/Navigation';
import { ScrollView } from 'react-native-gesture-handler';
import useMovieDetails from '../hooks/useMovieDetails';
import MovieDetails from '../components/MovieDetails';
import Icon from 'react-native-vector-icons/Ionicons';

const screenHeight = Dimensions.get('screen').height;

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'>{};

const DetailScreen = ( { route, navigation }: Props ) => {

    const movie = route.params;
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    const { isLoading, fullMovie, cast } = useMovieDetails( movie.id );

    return (
        <ScrollView>
            <View style={ styles.imageContainer }>
                <View style={ styles.imageBorder }>
                    <Image 
                        source={{ uri }}
                        style={ styles.image }
                    />
                </View>
            </View>

            <View style={ styles.marginContainer }>          
                <Text style={ styles.subtitle }>{ movie.original_title }</Text>
                <Text style={ styles.title }>{ movie.title }</Text>
            </View>
        
            {
                isLoading 
                    ? <ActivityIndicator size={ 30 } color="grey" style={{ marginTop: 20 }} />
                    : <MovieDetails fullMovie={ fullMovie! } cast={ cast }/>
            }

            {/* Botón para regresar */}
            <TouchableOpacity 
                style={ styles.backButton }
                onPress={ () => navigation.goBack() }
            >
                <Icon 
                    name="arrow-back-outline"
                    size={ 50 }
                    color="white"
                />
            </TouchableOpacity>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: screenHeight * 0.7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,

        elevation: 9,

        borderBottomStartRadius: 25,
        borderBottomEndRadius: 25,
    },
    imageBorder: {
        flex: 1,
        overflow: 'hidden',
        borderBottomStartRadius: 25,
        borderBottomEndRadius: 25,
    },
    image: {
        flex: 1,
    },
    marginContainer: {
        marginHorizontal: 20,
        marginTop: 20
    },
    subtitle: {
        fontSize: 16,
        opacity: 0.8
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 5
    }
});

export default DetailScreen;