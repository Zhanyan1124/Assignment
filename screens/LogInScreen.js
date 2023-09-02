import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import styles from '../stylesheet/SignUpLoginStyles'; // Import the styles from SignInStyles.js

let SQLite = require('react-native-sqlite-storage');


export default class LoginScreen extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      email: '',
      password: '',
      age: '',
      loginError: false, // State variable to track login errors
    };
    this.handleLogIn = this.handleLogIn.bind(this);
    this.db = SQLite.openDatabase({ name: 'db.sqlite' }, this.openCallback, this.errorCallback);
  }
  openCallback() {
    console.log('database open success');
  }
  errorCallback(err) {
    console.log('Error in opening the database: ' + err);
  }

  componentDidMount() {
    // Add a focus event listener
    this.focusListener = this.props.navigation.addListener('focus', this.resetState);

    //this.resetState;
    
    this.props.navigation.setOptions({
      title: "Welcome Back!",
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

  componentWillUnmount() {
    // Remove the focus event listener to avoid memory leaks
    this.focusListener();
  }

  resetState = () => {
    this.setState({
      email: '',
      password: '',
      isLoggedIn: false,
      
    });
  }
  

  handleLogIn = async () => {
    
  
   
const {username, password} = this.state;
    this.db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM users WHERE name = ? AND password = ?',
        [username, password],
        (tx, results) => {
          if (results.rows.length > 0) {
           let row = results.rows.item(0)
           
            this.setState({
              username : row.name,
              password : row.password,
              email: row.email,
              age: row.age   
            })
            try {
              const user={
                username : row.name,
                password : row.password,
                email:row.email,
                age: row.age
              };
              
             AsyncStorage.setItem('userData', JSON.stringify(user))
              .then(() => {
                console.log('User data saved:', user);
                this.setState({ successfulSignUp: true }); // Update successfulSignUp state
              })      
            } catch (error) {
              console.error('Error saving user data:', error);
            }
            
            this.props.navigation.navigate('ProfileScreen')

            
           

           
            
          } else{
            this.setState({ loginError: true });
          }
         
        },
        (error) => {
          console.log('Error during login:', error)
         
        }
      );
    });
    
   
    
  };

  navigateToSignUp = () => {
    this.props.navigation.navigate('SignUp');
  }

  render() {
    const { username, password, loginError } = this.state;

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
            placeholder="Password"
            value={password}
            onChangeText={(text) => 
            this.setState({ password: text })}
            secureTextEntry={true}
            keyboardType="default"S
          />

          <TouchableOpacity style={styles.button} onPress={this.handleLogIn}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>

          

           {/* Error message popup */}
           {loginError && (
            <View style={{ backgroundColor: 'red', borderRadius: 5, padding: 10, marginTop: 10, alignItems: 'center' }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Invalid username or password. Please try again.</Text>
            </View>
          )}

          <TouchableOpacity style={styles.signInLinkContainer} onPress={this.navigateToSignUp}>
            <Text style={styles.signInText}>Do not have account? </Text>
            <Text style={styles.signInLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
