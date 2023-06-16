import { createContext, useState } from 'react';

interface ImageColors {
    primary: string;
    secondary: string;
}

interface ContextProps {
    colors: ImageColors;
    prevColors: ImageColors;
    setGradientColors: (colors: ImageColors) => void;
    setPrevGradientColors: (colors: ImageColors) => void;
}

export const GradientContext = createContext( {} as ContextProps ); 

export const GradientProvider = ({ children }: any) => {

    const [ colors, setColors ] = useState<ImageColors>({
        primary: 'transparent',
        secondary: 'transparent'
    }); 

    const [ prevColors, setPrevColors ] = useState<ImageColors>({
        primary: 'transparent',
        secondary: 'transparent'
    }); 

    const setGradientColors = ( colors: ImageColors ) => {
        setColors(colors);
    };

    const setPrevGradientColors = ( colors: ImageColors ) => {
        setPrevColors(colors);
    };

    return (
        <GradientContext.Provider
            value={{
                colors,
                prevColors,
                setGradientColors,
                setPrevGradientColors
            }}
        >
            { children }
        </GradientContext.Provider>
    )
}