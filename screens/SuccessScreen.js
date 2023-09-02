import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default class SuccessScreen extends Component {

  
  render() {

   
    const { route} = this.props;
    const { username, email } = route.params;

    return (
      <View style={styles.container}>
        <Image style={styles.profileImage} source={require('../img/bailu.jpg')} />
        <Text style={styles.text}>Welcome back {username}!</Text>
        <Text style={styles.username}>@{username}</Text>
        <Text style={styles.email}>Email: {email}</Text>
        {/* Other user information */}
        {/* ... */}
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
    marginBottom: 20,
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
  // Other styles
  // ...
});