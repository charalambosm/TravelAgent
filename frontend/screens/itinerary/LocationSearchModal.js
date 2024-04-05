import { StyleSheet, ActivityIndicator, View, FlatList, Text, Alert } from 'react-native'
import { React, useState } from 'react';
import Container from '../../ui/main/Container'
import CustomTextInput from '../../ui/main/CustomTextInput'
import OutlinedButton from '../../ui/main/OutlinedButton'
import { searchLocation } from '../../util/http';
import { Colors } from '../../constants/colors'
import TextHeading from '../../ui/main/TextHeading';

const LocationSearchModal = ({ navigation }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [text, setText] = useState('');

    const handleTextChange = (text) => {
        setText(text);
        setSearchResults([]);

        if (text.trim() === '') return;

        setLoading(true);

        searchLocation(text)
            .then((searchResults) => {
                if (searchResults) {
                    setSearchResults(searchResults);
                    setLoading(false);
                }
            })
            .catch((error) => {
                Alert.alert('Search error', error.message);
            })
    };

    const handleClearButton = () => {
        setText('');
    }

    // const handleCloseButton = () => {
    //     navigation.navigate('Generator',
    //         merge = true)
    // }

    const Item = ({ item }) => (
        <Text
            style={styles.flatListItem}
            onPress={() => handleItemPress(item)}>{item.description}</Text>
    );

    const handleItemPress = (item) => {
        navigation.navigate('Generator',
            params = { location: item },
            merge = true
        );
    };

    return (
        <Container
            useKeyboardAvoidingView={true}
            style={{ justifyContent: 'flex-start' }}>
            <View style={styles.inputContainer}>
                <CustomTextInput
                label="Select a destination from below"
                    placeholder="Start typing your destination"
                    onChangeText={handleTextChange}
                    value={text}
                    autoFocus={true}
                />
                <OutlinedButton
                    style={styles.clearButton}
                    onPress={handleClearButton}>Clear</OutlinedButton>
            </View>
            {isLoading && <ActivityIndicator size="large" color={Colors.text} />}
            <FlatList
                style={styles.flatList}
                data={searchResults}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={(item) => item.id}
            />
        </Container>
    )
}

export default LocationSearchModal

const styles = StyleSheet.create({
    inputContainer: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    clearButton: {
        width: '20%'
    },
    flatList: {
        width: '90%'
    },
    flatListItem: {
        textAlign: 'center',
        fontSize: 16,
        borderColor: Colors.placeholder,
        borderWidth: 1,
        color: Colors.text,
        backgroundColor: Colors.background,
        padding: 10,
        marginVertical: 10,
    }
});