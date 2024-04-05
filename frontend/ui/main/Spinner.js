import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import IconButton from './IconButton'
import { Colors } from '../../constants/colors'
import CustomText from './CustomText'

const Spinner = ({ minVal, maxVal, step, onValueChanged }) => {
    const [value, setValue] = useState(minVal);

    const incrementValue = () => {
        const newValue = value + step <= maxVal ? value + step : maxVal;
        setValue(newValue);
        onValueChanged(newValue);
    };

    const decrementValue = () => {
        const newValue = value - step >= minVal ? value - step : minVal;
        setValue(newValue);
        onValueChanged(newValue);
    };

    return (
        <View
            style={styles.container}>
            <IconButton
                icon="remove"
                size={28}
                color={Colors.background}
                style={styles.button}
                onPress={decrementValue}
                disabled={value === minVal}
            />
            <CustomText>{value}</CustomText>
            <IconButton
                icon="add"
                size={28}
                color={Colors.background}
                style={styles.button}
                onPress={incrementValue}
                disabled={value === maxVal}
            />
        </View>
    )
}

export default Spinner

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '60%'
    },
    button: {
        backgroundColor: Colors.primary[800],
        borderRadius: 10,
    }
})