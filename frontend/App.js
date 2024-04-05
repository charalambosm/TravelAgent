import 'react-native-gesture-handler';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/authentication/LoginScreen';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { auth } from './util/firebase';
import ForgotPasswordScreen from './screens/authentication/ForgotPasswordScreen';
import { StatusBar } from 'expo-status-bar';
import { Colors } from './constants/colors';
import IconButton from './ui/main/IconButton';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { logout } from './util/auth';
import LocationSearchModal from './screens/itinerary/LocationSearchModal';
import ItineraryScreen from './screens/itinerary/ItineraryScreen';
import LoadingScreen from './screens/itinerary/LoadingScreen';
import GeneratorScreen from './screens/itinerary/GeneratorScreen';
import { saveHistory } from './util/database';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/drawer/HomeScreen';
import HistoryScreen from './screens/drawer/HistoryScreen';
import ProfileScreen from './screens/drawer/ProfileScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function UnauthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary[800] },
        headerTintColor: Colors.background,
        contentStyle: { backgroundColor: Colors.background }
      }}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={() => ({
          title: 'Welcome'
        })} />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={(navigation) => ({
          title: 'Forgot Password',
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="arrow-back-outline"
              size={24}
              color={tintColor}
              onPress={() => navigation.navigate('Login')}
            />
          )
        })} />
    </Stack.Navigator>
  )
}

function ItineraryStack() {
  const navigation = useNavigation();

  const handleLogoutButton = () => {
    logout()
      .then(() => {
        Alert.alert('Sign out', 'Signed out successfully!')
      })
      .catch((error) => {
        Alert.alert('Sign out', 'Could not sign out: ' + error);
      })
  }

  const handleCloseButton = (targetScreen, routeParams = {}) => {
    navigation.navigate(targetScreen,
      { ...routeParams },
      merge = true);
  }

  const handleSaveButton = (data) => {
    saveHistory('itinerary', data)
      .then(() => {
        console.log('Itinerary saved')
      })
      .catch((error) => {
        Alert.alert('Error saving itinerary', error)
      })
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: Colors.background,
        },
      }}>
      <Stack.Screen
        name="Generator"
        component={GeneratorScreen}
        options={() => ({
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="logout"
              size={48}
              color={tintColor}
              onPress={handleLogoutButton}
            />
          )
        })} />
      <Stack.Screen
        name="LocationSearch"
        component={LocationSearchModal}
        options={() => ({
          title: 'Search for a destination',
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.primary[800]
          },
          headerTintColor: Colors.background,
          presentation: 'modal',
          headerLeft: ({ tintColor }) => (
            <IconButton
              icon="close"
              size={24}
              color={tintColor}
              onPress={() => handleCloseButton('Generator')}
            />
          )
        })} />
      <Stack.Screen
        name="Itinerary"
        component={ItineraryScreen}
        options={({ route }) => ({
          title: 'Your itinerary!',
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.primary[800]
          },
          headerTintColor: Colors.background,
          presentation: 'modal',
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="save"
              size={24}
              color={tintColor}
              onPress={() => handleSaveButton(route.params?.itinerary)}
            />
          ),
          headerLeft: ({ tintColor }) => (
            <IconButton
              icon="close"
              size={24}
              color={tintColor}
              onPress={() => handleCloseButton('Loading', routeParams = { generate: false })}
            />
          )
        })} />
      <Stack.Screen
        name="Loading"
        component={LoadingScreen}
        options={() => ({
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="logout"
              size={24}
              color={tintColor}
              onPress={handleLogoutButton}
            />
          ),
          gestureEnabled: false,
        })} />
    </Stack.Navigator>
  )
}

function AuthenticatedStack() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary[800]
        },
        headerTintColor: Colors.background,
        sceneContainerStyle: {
          backgroundColor: Colors.background,
        },
        drawerStyle: {
          backgroundColor: Colors.primary[800],
        },
        drawerItemStyle: {
          borderColor: Colors.background,
          borderWidth: 2,
        },
        drawerLabelStyle: {
          fontSize: 16,
          textAlign: 'center',
        },
        drawerActiveTintColor: Colors.primary[800],
        drawerActiveBackgroundColor: Colors.background,
        drawerInactiveTintColor: Colors.background,
        swipeEdgeWidth: 40,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="History"
        component={HistoryScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="time" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Itinerary Stack"
        component={ItineraryStack}
        options={{
          title: 'Itinerary Generator',
          drawerIcon: ({ color }) => (
            <Ionicons name="color-wand" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={() => ({
          drawerIcon: ({ color }) => (
            <Ionicons name="person-circle" size={24} color={color} />
          ),
        })
        }
      />
    </Drawer.Navigator>
  )

}

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    })
  }, [])

  return (
    <>
      <StatusBar style='dark' />
      <NavigationContainer>
        <SafeAreaView
          style={{ flex: 1 }}>
          {!currentUser && <UnauthenticatedStack />}
          {currentUser && <AuthenticatedStack />}
        </SafeAreaView>
      </NavigationContainer>
    </>
  );
}