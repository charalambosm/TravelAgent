import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Day from '../../ui/itinerary/Day';
import { Dimensions } from 'react-native';
import { LogBox } from 'react-native';
import { Colors } from '../../constants/colors';

LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate` with no listeners registered.']);

const Tab = createMaterialTopTabNavigator();

const ItineraryScreen = ({ route }) => {
    const itineraryObj = route.params?.itinerary;
    const itinerary = itineraryObj.itinerary;
    const maxNumTabs = 4;
    const numDays = itinerary.length;
    const tabWidth = Dimensions.get('window').width / Math.min(numDays, maxNumTabs);

    const renderTabs = () => {
        const tabs = [];

        for (let i = 0; i < numDays; i++) {
            const day = i + 1;
            tabs.push(
                <Tab.Screen
                    key={`day-${day}`}
                    name={`Day ${day}`}>
                    {() => <Day dayData={itinerary[i]} />}
                </Tab.Screen>
            );
        }

        return tabs;
    };

    return (
        <Tab.Navigator
            initialRouteName='day-1'
            screenOptions={{
                tabBarStyle: { backgroundColor: Colors.background },
                tabBarIndicatorStyle: { backgroundColor: Colors.primary[800] },
                tabBarActiveTintColor: Colors.text,
                tabBarScrollEnabled: true,
                tabBarItemStyle: { width: tabWidth },
            }}
        >
            {renderTabs()}
        </Tab.Navigator>
    );
}

export default ItineraryScreen;