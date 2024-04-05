import { View } from 'react-native'
import React from 'react'
import TextHeading from '../main/TextHeading'
import CustomText from '../main/CustomText'

const Activity = ({ title, activity }) => {
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

export default Activity