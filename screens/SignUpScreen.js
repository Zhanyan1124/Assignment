import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image,  } from 'react-native';
import styles from '../stylesheet/SignUpLoginStyles'; // Import the styles from SignInStyles.js
import AsyncStorage from '@react-native-async-storage/async-storage';
let SQLite = require('react-native-sqlite-storage');

import Mytextinput from '../mytextinput';
import Mybutton from '../mybutton';
export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      fullName: '',
      email: '',
      password: '',
      age:'',
      confirmPassword: '',
      errorIndex: -1, // Index of the current error
      successfulSignUp: false,
      signUpClicked: false, // Track whether the sign-up button was clicked
      successfulSignUp: false,
    
     
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
    this.focusListener = this.props.navigation.addListener('focus', this.resetState);
    
   
    this.props.navigation.setOptions({
      title: "Sign Up Account",
      headerStyle: {
        backgroundColor: "#52D017", // Set the header background color to neon green
      },
      headerTintColor: "white", // Set the header text color to white
      headerTitleStyle: {
        fontWeight: "bold",
      },
      headerTitleAlign: "center", // Center the header title text (Alternative to 'alignSelf')
    });

    
  }

  resetState = () => {
    this.setState({
      username: '',
      password: '',
      fullName: '',
      email: '',
      age:'',
      confirmPassword: '',
      signUpClicked: false, // Track whether the sign-up button was clicked
      successfulSignUp: false,
    });
  }
  

  handleSignUp = async () => {
    
    const { username, age, fullName, email, password, confirmPassword } = this.state;

     // Set signUpClicked to true when the sign-up button is clicked
     this.setState({ signUpClicked: true });

    // Check for empty fields
    if (username === '') {
      this.setState({ errorIndex: 0 });
      return;
    } else if (fullName === '') {
      this.setState({ errorIndex: 1 });
      return;
    } else if (email === '') {
      this.setState({ errorIndex: 2 });
      return;
    } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      this.setState({ errorIndex: -3 }); // Invalid email format error
      return;
    }else if (password === '') {
      this.setState({ errorIndex: 3 });
      return;
    } else if (password !== confirmPassword){
      this.setState({ errorIndex: -2 }); 
      return;
    }

    this.db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO users(name, password, email, age) VALUES (?,?,?,?)',
        [this.state.username, this.state.password, this.state.email,this.state.age],
  
        (tx, results) => {
          
         if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => this.props.navigation.navigate('LoginScreen'),
                },
              ],
              { cancelable: false }
            );
         } 
        },
        (error)=> console.log("Error" ,error)
      );
    });
     
    // Assuming the passwords match (you can add validation logic here)
    const user = {
      username,
      fullName,
      email,
      password,
      age
    };
  
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(user))
      .then(() => {
        console.log('User data saved:', user);
        this.setState({ successfulSignUp: true }); // Update successfulSignUp state
      })      
    } catch (error) {
      console.error('Error saving user data:', error);
    }

    this.props.navigation.navigate('LogIn');

  };
  
      
    
  

    
  

  navigateToLogIn = () => {
    if(this.state.successfulSignUp){
      this.props.navigation.navigate('LogIn');
    }
  };

  render() {
    const { username,age, fullName, email, password, confirmPassword } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.image} source={require('../img/logo.jpg')} />
          <Text style={styles.logoText}>BERJAYA GROCERY</Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(text) => this.setState({ username: text })}
            autoCapitalize="none"
            keyboardType="default"
          />

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={fullName}
            onChangeText={(text) => this.setState({ fullName: text })}
            autoCapitalize="words"
            keyboardType="default"
          />

            <TextInput
            style={styles.input}
            placeholder="Age"
            value={age}
            onChangeText={(text) => this.setState({ age: text })}
            autoCapitalize="words"
            keyboardType="default"
          />

          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={email}
            onChangeText={(text) => this.setState({ email: text })}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={(text) => this.setState({ password: text })}
            secureTextEntry={true}
            keyboardType="default"
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={(text) => this.setState({ confirmPassword: text })}
            secureTextEntry={true}
            keyboardType="default"
          />

         
          {(this.state.signUpClicked && this.state.errorIndex === 0) && (
            <View style={{ backgroundColor: 'red', borderRadius: 5, padding: 10, marginTop: 5 }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                Username is required.
              </Text>
            </View>
          )}

          {(this.state.signUpClicked && this.state.errorIndex === 1) && (
            <View style={{ backgroundColor: 'red', borderRadius: 5, padding: 10, marginTop: 5 }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                Name is required.
              </Text>
            </View>
          )} 
          
          {(this.state.signUpClicked && this.state.errorIndex === 2) && (
            <View style={{ backgroundColor: 'red', borderRadius: 5, padding: 10, marginTop: 5 }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                Email is required.
              </Text>
            </View>
          )}

          {(this.state.signUpClicked && this.state.errorIndex === -3) && (
            <View style={{ backgroundColor: 'red', borderRadius: 5, padding: 10, marginTop: 5 }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                Invalid Email Format.
              </Text>
            </View>
          )}
          
           {(this.state.signUpClicked && this.state.errorIndex === 3) && (
            <View style={{ backgroundColor: 'red', borderRadius: 5, padding: 10, marginTop: 5 }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                Password is required.
              </Text>
            </View>
          )}

          {(this.state.signUpClicked && this.state.errorIndex === -2) && (
            <View style={{ backgroundColor: 'red', borderRadius: 5, padding: 10, marginTop: 5 }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                Password Not Match.
              </Text>
            </View>
          )}

      


          <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          

          <TouchableOpacity style={styles.signInLinkContainer} onPress={this.navigateToLogIn}>
            <Text style={styles.signInText}>Having an account? </Text>
            <Text style={styles.signInLink}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}