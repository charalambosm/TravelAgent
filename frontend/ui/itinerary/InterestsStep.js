import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomCheckbox from '../main/CustomCheckbox'
import CustomText from '../main/CustomText'

const InterestsStep = ({ interests, onInterestsChanged }) => {
  return (
    <>
      <CustomText>What would you like to do?</CustomText>
      <CustomCheckbox
        onPress={() => onInterestsChanged('art')}
        isChecked={interests.art}
      >
        Visit art galleries and museums
      </CustomCheckbox>
      <CustomCheckbox
        onPress={() => onInterestsChanged('history')}
        isChecked={interests.history}
      >
        Learn about history and culture
      </CustomCheckbox>
      <CustomCheckbox
        onPress={() => onInterestsChanged('architecture')}
        isChecked={interests.architecture}
      >
        See architecture and landmarks
      </CustomCheckbox>
      <CustomCheckbox
        onPress={() => onInterestsChanged('shopping')}
        isChecked={interests.shopping}
      >
        Do shopping
      </CustomCheckbox>
      <CustomCheckbox
        onPress={() => onInterestsChanged('nightlife')}
        isChecked={interests.nightlife}
      >
        Enjoy nightlife
      </CustomCheckbox>
      <CustomCheckbox
        onPress={() => onInterestsChanged('outdoor')}
        isChecked={interests.outdoor}
      >
        Do outdoor activities
      </CustomCheckbox>
    </>
  )
}

export default InterestsStep

const styles = StyleSheet.create({})