import { StyleSheet, View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { loadHistory, deleteHistory } from '../../util/database';
import CustomText from '../main/CustomText';
import CustomTextInput from '../main/CustomTextInput';
import OutlinedButton from '../main/OutlinedButton';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import TextHeading from '../main/TextHeading'

const LocationStep = ({ locationItem, onLocationSelected }) => {
    const [historyResults, setHistoryResults] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        loadHistory('location')
            .then((historyResults) => {
                setHistoryResults(historyResults);
            })
    }, [])

    const handleTextInputPress = () => {
        navigation.navigate('LocationSearch');
    }

    const handleClearHistoryButton = () => {
        deleteHistory('location')
            .then(() => {
                setHistoryResults([]);
            })
            .catch((error) => {
                console.log('Error deleting history', error)
            })

        setHistoryResults([]);
    }

    return (
        <>
            <CustomTextInput
                showLabel={locationItem.description !== ''}
                label="Your selected destination"
                placeholder="Tap here to search for a destination"
                onPressIn={handleTextInputPress}
                value={locationItem.description}
                showSoftInputOnFocus={false}
                style={styles.textInput}
            />
            <View
                style={styles.historyHeadingContainer}>
                <TextHeading
                    style={styles.historyHeadingText}
                >
                    Recent searches
                </TextHeading>
                <OutlinedButton
                    style={styles.clearHistoryButton}
                    onPress={handleClearHistoryButton}>
                    Delete
                </OutlinedButton>
            </View>
            <FlatList
                style={styles.flatList}
                data={historyResults}
                renderItem={({ item }) =>
                    <Text
                        style={styles.flatListItem}
                        onPress={() => onLocationSelected(item)}
                    >
                        {item.description}
                    </Text>
                }
                keyExtractor={(item) => item.timestamp}
                ListEmptyComponent={() => <CustomText>No history</CustomText>}
            />
        </>

    )
}

export default LocationStep

const styles = StyleSheet.create({
    textInput: {
        width: '100%',
        marginVertical: 8,
    },
    historyHeadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    historyHeadingText: {
        textAlign: 'center',
        margin: 0,
        flex: 3,
    },
    clearHistoryButton: {
        // padding: 0,
        margin: 0,
        flex: 1,
    },
    flatList: {
        width: '100%'
    },
    flatListItem: {
        textAlign: 'center',
        fontSize: 16,
        borderColor: Colors.text,
        borderRadius: 10,
        borderWidth: 1,
        color: Colors.text,
        backgroundColor: Colors.background,
        padding: 8,
        marginVertical: 8,
    }
})