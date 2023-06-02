import React from 'react';
import { Text, View, FlatList } from 'react-native';
import currenyFormatter from 'currency-formatter';

import { FullMovie } from '../interfaces/movieInterface';
import { Cast } from '../interfaces/creditsInterface';
import Icon from 'react-native-vector-icons/Ionicons';
import CastItem from './CastItem';

interface Props {
    fullMovie: FullMovie;
    cast: Cast[];
}

const MovieDetails = ({ fullMovie, cast }: Props) => {
  return (
    <>
        {/* Detalles de la película */}
        <View style={{ marginHorizontal: 20 }}>
            <View style={{ flexDirection: 'row'}}>
                <Icon 
                    name="star-outline"
                    size={ 16 }
                    color="grey"
                />
                <Text> { fullMovie.vote_average }</Text>

                <Text style={{ marginLeft: 5 }}>
                    - { fullMovie.genres.map( g => g.name ).join(', ') }
                </Text>
            </View>

            {/* Resúmen de la película */}
            <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold' }}>
                Historia
            </Text>

            <Text style={{ fontSize: 16, textAlign: 'justify' }}>
                { fullMovie.overview }
            </Text>

            {/* Presupuesto de la película */}
            <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold' }}>
                Presupuesto
            </Text>

            <Text style={{ fontSize: 18 }}>
                { currenyFormatter.format( fullMovie.budget, { code: 'USD' } ) }
            </Text>
        </View>

        {/* Casting */}
        <View style={{ marginTop: 10, marginHorizontal: 20, marginBottom: 100 }}>
            <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold' }}>
                Actores
            </Text>

            <FlatList
                data={ cast }
                keyExtractor={ ( item ) => item.id.toString() }
                renderItem={ ({ item }) => <CastItem actor={ item } /> }
                horizontal={ true }
                showsHorizontalScrollIndicator={ false }
                style={{ marginTop: 10, height: 68 }}
            />
        </View>
    </>
  )
};

export default MovieDetails;