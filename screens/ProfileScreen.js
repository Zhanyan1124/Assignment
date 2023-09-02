import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
let SQLite = require('react-native-sqlite-storage');



const neonGreen = '#39FF14';

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      username: '',
      password: '',
      email: '', 
      age: ''
    };
    this.db = SQLite.openDatabase({ name: 'db.sqlite' }, this.openCallback, this.errorCallback);
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', this.loadUserData);
  
    
  }

  

  loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      console.log('Retrieved userData:', userData);
      if (userData) {
        this.setState({ userData: JSON.parse(userData) });
      }
    } catch (error) {
      console.log('Error retrieving user data:', error);
    }
  };

  navigateToLogIn = () => {
    this.props.navigation.navigate('LogIn');
  };

  navigateToSignUp = () => {
    this.props.navigation.navigate('SignUp');
  };

  handleLogout = async () => {
    // Clear the user data in AsyncStorage and navigate back to the original profile screen
    try {
      await AsyncStorage.removeItem('userData');
      await AsyncStorage.removeItem('cartItems');
      this.setState({ userData: null });
    } catch (error) {
      console.log('Error clearing user data:', error);
    }
  };

  navigateToEditProfile = () => {
    this.props.navigation.navigate('EditProfile');
  };


  render() {
    const { userData } = this.state;
   
  

    // Check if user data exists and display user information if available
    if (userData) {
      const { age,email,username } =userData;
      return (
        <View style={styles.container}>
          <Image style={styles.profileImage} source={require('../img/bailu.jpg')} />
         
          <Text style={styles.text}>Welcome back {username}!</Text>
          <View style={styles.usercontainer}>
           <Text style={styles.username}>@{username}</Text>
           <Image style={styles.verifyImage} source={require('../img/tick.jpg')} />
          </View>
          
          <View style={styles.userInfoContainer}>
            <Text style={styles.userInfoLabel}>UserName:</Text>
            <Text style={styles.userInfoText}>{username}</Text>

            <Text style={styles.userInfoLabel}>Email:</Text>
            <Text style={styles.userInfoText}>{email}</Text>

            <Text style={styles.userInfoLabel}>Age:</Text>
            <Text style={styles.userInfoText}>{age}</Text>
           
            <TouchableOpacity style={styles.editProfileButton} onPress={this.navigateToEditProfile}>
              <Text style={styles.editProfileButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={this.handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      );
    }


    // Otherwise, show the default profile screen with buttons to log in or sign up
    return (
      <View style={styles.container}>
        <Text style={styles.title}>ACCOUNT</Text>

        <TouchableOpacity style={styles.button} onPress={this.navigateToSignUp}>
          <View style={styles.buttonContent}>
            <Ionicons name={'person'} size={24} color={'black'} style={styles.icon} />
            <Text style={styles.buttonText}>Sign Up</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={this.navigateToLogIn}>
          <View style={styles.buttonContent}>
            <Ionicons name={'lock-closed'} size={24} color={'black'} style={styles.icon} />
            <Text style={styles.buttonText}>Log In</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
  },
  usercontainer: {
    flexDirection: 'row', // Align items in a row
    alignItems: 'center', // Align vertically centered
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
    marginBottom: 20,
  },
  verifyImage: {
    width: 30,
    height: 30,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
    marginTop: 10 ,
    marginLeft: 10
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  userInfoContainer: {
    backgroundColor: '#F1F1F1', 
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    marginVertical: 20,
    width: '100%',
  },
  userInfoLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'black',
    marginBottom: 5,
  },
  userInfoText: {
    fontSize: 18,
    color: 'black',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  editProfileButton: {
    backgroundColor: neonGreen,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  editProfileButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
  },
});