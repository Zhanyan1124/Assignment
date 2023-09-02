import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
let SQLite = require('react-native-sqlite-storage');
const neonGreen = '#39FF14';

export default class EditProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
        username:'',
        fullName: '',
        email: '',
        password: '',
        
    };
    
    this.db = SQLite.openDatabase({ name: 'db.sqlite' }, this.openCallback, this.errorCallback);
  }
  openCallback() {
    console.log('database open success');
  }
  errorCallback(err) {
    console.log('Error in opening the database: ' + err);
  }
  componentDidMount() {
    // Fetch the current user data from AsyncStorage and set it in the component state
    this.loadUserData();
  }

  loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const parsedData = JSON.parse(userData);
        this.setState({
            username: parsedData.username,
            fullName: parsedData.fullName,
            email: parsedData.email,
            password: parsedData.password,
            deliveryAddress: parsedData.deliveryAddress,
        });
      }
    } catch (error) {
      console.log('Error retrieving user data:', error);
    }
  };

  handleSaveChanges = async () => {
    // Get the updated profile information from the component state
    const { userId, username, fullName, email, password } = this.state;
    this.db.transaction((tx) => {
      tx.executeSql(
        'UPDATE users SET name = ? , email = ?, password = ? WHERE id = ?',
        [username, email, password, userId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
         
          
          // Navigate back to the profile screen after saving the changes
          this.props.navigation.goBack();
        },
        (error) => {
          console.log('Error updating user data in SQLite:', error);
        }
      );
    });

    try {
      // Fetch the existing user data from AsyncStorage
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        // Parse the existing data and update the profile information
        const parsedData = JSON.parse(userData);
        parsedData.username = username;
        parsedData.fullName = fullName;
        parsedData.email = email;
        parsedData.password = password;
        

        // Save the updated data back into AsyncStorage
        await AsyncStorage.setItem('userData', JSON.stringify(parsedData));

       
        
        // Navigate back to the profile screen after saving the changes
        this.props.navigation.goBack();
      }
    } catch (error) {
      console.log('Error updating user data:', error);
    }
  };

  render() {
    const { userId,username, email, password } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Edit Profile</Text>

        <Image
        source={require('../img/edit.jpg')} 
        style={styles.profileImage}
      />

        <TextInput
          style={styles.input}
          placeholder="UserId"
          value={userId}
          onChangeText={(text) => this.setState({ userId: text })}
          keyboardType='default'
        />

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => this.setState({ username: text })}
          keyboardType='default'
        />

       

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => this.setState({ email: text })}
          keyboardType='email-address'
        />


        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => this.setState({ password: text })}
          keyboardType='default'
        />

        

        <TouchableOpacity style={styles.saveButton} onPress={this.handleSaveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 30,
  },

  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: neonGreen,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 20,
    marginBottom: 30,
    fontSize: 20,
  },
  saveButton: {
    backgroundColor: neonGreen,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
