import { Alert, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import Container from '../../ui/main/Container'
import { ProgressStep, ProgressSteps } from 'react-native-progress-steps'
import { Colors } from '../../constants/colors'
import LocationStep from '../../ui/itinerary/LocationStep'
import DurationStep from '../../ui/itinerary/DurationStep'
import InterestsStep from '../../ui/itinerary/InterestsStep'
import { saveHistory } from '../../util/database'
import { initialize } from '../../util/http'

const GeneratorScreen = ({ navigation, route }) => {
    const [error, setError] = useState(false);
    const [data, setData] = useState({
        location: {
            id: '',
            description: '',
            timestamp: ''
        },
        duration: 1,
        date: new Date(),
        interests: {
            art: false,
            history: false,
            architecture: false,
            shopping: false,
            nightlife: false,
            outdoor: false
        }
    })

    useEffect(() => {
        if (route.params?.location) {
            onLocationSelected(route.params?.location);
        }
    }, [route.params?.location]);

    const onLocationSelected = (locationItem) => {
        const newData = {
            ...data,
            location: locationItem
        };
        setData(newData);
        saveHistory('location', locationItem)
            .catch(() => {});
    }

    const onDurationChanged = (duration) => {
        const newData = {
            ...data,
            duration: duration
        };
        setData(newData);
    }

    const onArrivalDateChanged = (event, date) => {
        const newData = {
            ...data,
            date: date
        }
        setData(newData);
    }

    const onInterestsChanged = (interest) => {
        setData((prevData) => {
            return {
                ...prevData,
                interests: {
                    ...prevData.interests,
                    [interest]: !prevData.interests[interest],
                }
            }
        })
    }

    const onLocationStepComplete = () => {
        if (data.location.description === '') {
            setError(true);
            Alert.alert('Invalid location', 'Please select a valid location');
        } else {
            setError(false);
        }
    }

    const onDurationStepComplete = () => {

    }

    const onInterestsStepSubmit = () => {
        const interests = Object.values(data.interests);
        const isEmpty = interests.every((interest) => interest === false);
        if (isEmpty) {
            setError(true);
            Alert.alert('Invalid interests', 'Please select at least one interest');
            return;
        } else {
            setError(false);
        }

        const parsedData = parseData();

        initialize(parsedData)
            .then((statusCode) => {
                if (statusCode == 201) {
                    navigation.push('Loading', { generate: true });
                } else {
                    console.error('Could not initialize itinerary: #%d', statusCode);
                }
            })
            .catch((error) => {
                console.error('Could not initialize itinerary: #%s', error);
            })
    }

    const parseData = () => {
        return {
            location: data.location,
            duration: data.duration.toString(),
            date: data.date.toLocaleDateString(),
            interests: data.interests
        }
    }

    return (
        <Container
            style={{ justifyContent: 'flex-start' }}
        >
            <ProgressSteps
                activeStepIconBorderColor={Colors.primary[800]}
                activeLabelColor={Colors.primary[800]}
                activeStepNumColor={Colors.background}
                activeStepIconColor={Colors.primary[800]}
                completedStepIconColor={Colors.primary[800]}
                completedProgressBarColor={Colors.primary[800]}
            >
                <ProgressStep
                    label="Location"
                    onNext={onLocationStepComplete}
                    viewProps={{
                        style: {
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }
                    }}
                    scrollable={false}
                    nextBtnStyle={styles.button}
                    nextBtnTextStyle={styles.buttonText}
                    errors={error}
                >
                    <LocationStep
                        locationItem={data.location}
                        onLocationSelected={onLocationSelected}
                    />
                </ProgressStep>
                <ProgressStep
                    label="Duration"
                    onNext={onDurationStepComplete}
                    previousBtnStyle={styles.button}
                    previousBtnTextStyle={styles.buttonText}
                    nextBtnStyle={styles.button}
                    nextBtnTextStyle={styles.buttonText}
                    scrollViewProps={{
                        contentContainerStyle: {
                            flexGrow: 1,
                            width: '100%',
                            justifyContent: 'space-around',
                            alignItems: 'center'
                        }
                    }}
                >
                    <DurationStep
                        date={data.date}
                        onDurationChanged={onDurationChanged}
                        onArrivalDateChanged={onArrivalDateChanged}
                    />
                </ProgressStep>
                <ProgressStep
                    label="Interests"
                    onSubmit={onInterestsStepSubmit}
                    previousBtnStyle={styles.button}
                    previousBtnTextStyle={styles.buttonText}
                    nextBtnStyle={styles.button}
                    nextBtnTextStyle={styles.buttonText}
                    errors={error}
                >
                    <InterestsStep
                        interests={data.interests}
                        onInterestsChanged={onInterestsChanged}
                    />
                </ProgressStep>
            </ProgressSteps>
        </Container >
    )
}

export default GeneratorScreen

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary[800],
        borderRadius: 10,
        width: '120%',
        height: 48
    },
    buttonText: {
        fontSize: 16,
        color: Colors.background,
    }

})