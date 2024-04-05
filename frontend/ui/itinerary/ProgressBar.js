import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomText from '../main/CustomText';
import { Colors } from '../../constants/colors';

const ProgressBar = ({ currentStep }) => {
    const titles = ['Location', 'Duration', 'Interests']
    const numberOfSteps = 3;

    return (
        <View style={styles.container}>
            {Array.from({ length: numberOfSteps }, (_, index) => (
                <View
                    key={index}
                    style={styles.stepContainer}>
                    <View
                        key={index}
                        style={[
                            styles.step,
                            currentStep >= index && styles.activeStep,
                        ]}
                    >
                        <CustomText
                            style={[
                                styles.stepText,
                                currentStep >= index && styles.activeStepText,
                            ]}
                        >
                            {index + 1}
                        </CustomText>
                    </View>
                    <CustomText
                        style={currentStep === index && styles.activeStepTitle}
                    >
                        {titles[index]}
                    </CustomText>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stepContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    step: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: Colors.primary[800],
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeStep: {
        backgroundColor: Colors.primary[800],
    },
    stepText: {
        margin: 0
    },
    activeStepText: {
        color: Colors.background,
        fontWeight: 'bold',
    },
    activeStepTitle: {
        color: Colors.primary[800],
        fontWeight: 'bold',
    },
});

export default ProgressBar;