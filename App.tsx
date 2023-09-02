// App.js
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './screens/HomeScreen';
import ProductListingScreen from './screens/ProductListingScreen';
import ShoppingCartScreen from './screens/ShoppingCartScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen'
import LogInScreen from './screens/LogInScreen';
import SignUpScreen from './screens/SignUpScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import PaymentSuccessfulScreen from './screens/PaymentSuccessfulScreen';
import CheckOutScreen from './screens/CheckOutScreen';




const Tab = createBottomTabNavigator();
const StackNav = createStackNavigator();

const ProfileStack = () => (
  <StackNav.Navigator>
    <StackNav.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
    <StackNav.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
    <StackNav.Screen name="LogIn" component={LogInScreen} />
    <StackNav.Screen name="SignUp" component={SignUpScreen} />
  </StackNav.Navigator>
);

const ProductStack = () => (
  <StackNav.Navigator>
    <StackNav.Screen name="ProductListingScreen" component={ProductListingScreen} options={{ headerShown: false }} />
    <StackNav.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
    <StackNav.Screen name="CheckOutScreen" component={CheckOutScreen} />
    <StackNav.Screen name="PaymentSuccessfulScreen" component={PaymentSuccessfulScreen} />
  
  </StackNav.Navigator>
);








export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      
     
    };
    
  }

  

  async componentDidMount() {
    try {
      // Check if user is authenticated
      const userDataJSON = await AsyncStorage.getItem('userData');
      if (userDataJSON) {
        const userData = JSON.parse(userDataJSON);
        if (userData && userData.username && userData.password) {
          this.setState({ isLoggedIn: true });
        }
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
    }

    this.setState({ loading: false });
  }
  
  
  render() {
    
    return (
      
      
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let iconSize = focused ? 30 : 24;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Product') {
                iconName = focused ? 'cube' : 'cube-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              } else if (route.name === 'Cart') {
                iconName = focused ? 'cart' : 'cart-outline';
              }

              return <Ionicons name={iconName} size={iconSize} color={color} />;
            },
            tabBarLabelStyle: {
              fontSize: 18,
            },
            tabBarActiveTintColor: '#6AFB92',
            tabBarInactiveTintColor: 'gray',
          })}
        >
       
      
            
              <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
              <Tab.Screen name="Product" component={ProductStack} options={{ headerShown: false }} />
              <Tab.Screen name="Cart" component={ShoppingCartScreen} options={{ headerShown: false }} />
              <Tab.Screen name="Profile" component={ProfileStack} options={{ headerShown: false }} />
            
          
           
             
           
          
         
          

        </Tab.Navigator>
      </NavigationContainer>

      

      
   
    );
  }
}
