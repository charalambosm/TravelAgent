import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import TextHeading from '../main/TextHeading'
import CustomText from '../main/CustomText'
import Container from '../main/Container'
import { Colors } from '../../constants/colors'

const Day = ({ dayData }) => {
    const activityCard = (title, activity) => {
        return (
            <View>
                <TextHeading>{title}</TextHeading>
                <CustomText>{`Activity: ${activity['Activity']}`}</CustomText>
                <CustomText>{`Address: ${activity['Address']}`}</CustomText>
                <CustomText>{`Activity Type: ${activity['Activity type']}`}</CustomText>
                <CustomText>{`Recommended Visit Duration: ${activity['Recommended Visit Duration']}`}</CustomText>
            </View>
        )
    }
    return (
        <Container
            useKeyboardAvoidingView={false}
            style={styles.container}>
            <ScrollView>
                {activityCard('Morning', dayData['Morning'])}
                {activityCard('Lunch', dayData['Lunch'])}
                {activityCard('Afternoon', dayData['Afternoon'])}
                {activityCard('Dinner', dayData['Dinner'])}
                {activityCard('Evening', dayData['Evening'])}
            </ScrollView>
        </Container>
    )
}

export default Day

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.background
    }
})