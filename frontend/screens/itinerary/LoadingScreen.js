import { ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Container from '../../ui/main/Container';
import { Colors } from '../../constants/colors';
import CustomText from '../../ui/main/CustomText';
import { generateItinerary } from '../../util/http';
import Button from '../../ui/main/Button';
import OutlinedButton from '../../ui/main/OutlinedButton';

const LoadingScreen = ({ navigation, route }) => {
    const abortControllerRef = useRef(new AbortController());
    const [isGenerating, setIsGenerating] = useState(true);
    const [itinerary, setItinerary] = useState({})

    useEffect(() => {
        if (route.params?.generate) {
            generate()
        } else {
            setIsGenerating(false);
        }
    }, [])

    const generate = () => {
        setIsGenerating(true);
        generateItinerary(abortControllerRef.current.signal)
            .then((itinerary) => {
                setItinerary(itinerary);
                setIsGenerating(false);
                navigation.navigate('Itinerary', { itinerary })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleCancelButton = () => {
        abortControllerRef.current.abort();
        navigation.push('Generator');
    }

    const handleOpenButton = () => {
        navigation.navigate('Itinerary', { itinerary })
    }

    const handleGenerateAgainButton = () => {
        setItinerary({});
        generate();
    }

    const handleGenerateNewButton = () => {
        navigation.push('Generator');
    }

    return (
        <Container>
            {isGenerating && <>
                <ActivityIndicator size={'large'} color={Colors.text} />
                <CustomText>Generating itinerary ...</CustomText>
                <Button onPress={handleCancelButton}>Cancel</Button>
            </>}
            {!isGenerating && <>
                <CustomText>Your itinerary has been generated</CustomText>
                <Button onPress={handleOpenButton}>Open Itinerary</Button>
                <OutlinedButton onPress={handleGenerateAgainButton}>Generate with the same parameters</OutlinedButton>
                <OutlinedButton onPress={handleGenerateNewButton}>Generate with new parameters</OutlinedButton>
            </>}
        </Container>
    )
}

export default LoadingScreen