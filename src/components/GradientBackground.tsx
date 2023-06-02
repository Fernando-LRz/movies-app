import React, { useContext } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GradientContext } from '../context/GradientContext';
import { useEffect } from 'react';
import useFade from '../hooks/useFade';

interface Props {
    children: JSX.Element | JSX.Element[];
};

const GradientBackground = ({ children }: Props) => {

    const { colors, prevColors, setPrevGradientColors } = useContext( GradientContext );
    const { opacity, fadeIn, fadeOut } = useFade();

    useEffect(() => {
        fadeIn( () => {
            setPrevGradientColors(colors);
            fadeOut();
        })
    }, [ colors ]);

    return (
        <View style={{ flex: 1  }}>
            <LinearGradient 
                colors={[ prevColors.primary, prevColors.secondary, "white" ]}
                style={{ ...StyleSheet.absoluteFillObject }}
                start={{ x: 0.33, y: 0.33 }}
                end={{ x: 0.3, y: 0.9 }}
            />

            <Animated.View
                style={{ ...StyleSheet.absoluteFillObject, opacity }}
            >
                <LinearGradient 
                colors={[ colors.primary, colors.secondary, "white" ]}
                style={{ ...StyleSheet.absoluteFillObject }}
                start={{ x: 0.33, y: 0.33 }}
                end={{ x: 0.3, y: 0.9 }}
                />
            </Animated.View>

            { children }
        </View>
    )
};

export default GradientBackground;