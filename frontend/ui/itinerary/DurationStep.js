import { StyleSheet, View } from 'react-native'
import React from 'react'
import Spinner from '../../ui/main/Spinner'
import CustomText from '../../ui/main/CustomText'
import DateTimePicker from '@react-native-community/datetimepicker';

const DurationStep = ({ date, onDurationChanged, onArrivalDateChanged }) => {
  return (
    <>
      <View
        style={styles.container}
      >
        <CustomText>How many days are you planning to go?</CustomText>
        <Spinner
          minVal={1}
          maxVal={10}
          step={1}
          onValueChanged={onDurationChanged}
        />
      </View>
      <View
        style={styles.container}
      >
        <CustomText>When are you planning to arrive?</CustomText>
        <DateTimePicker
          value={date}
          minimumDate={new Date()}
          onChange={onArrivalDateChanged}
        />
      </View>
    </>
  )
}

export default DurationStep

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})