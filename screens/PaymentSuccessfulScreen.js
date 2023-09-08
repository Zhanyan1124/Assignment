import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const clearCart = async () => {
  try {
    await AsyncStorage.removeItem('cartItems');
    console.log('Cart items removed successfully.');
  } catch (error) {
    console.error('Error removing cart items:', error);
  }
};

export default class PaymentSuccessfulScreen extends Component {

  //Clear the cart 
  async componentDidMount(){
    await clearCart();
  }

  //Deduct the stock of the product
  


  
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Image source={require('../images/success.jpg')} style={styles.successImage} resizeMode="contain" />
        <Text style={styles.successText}>Payment Successful!</Text>
        <TouchableOpacity style={styles.continueShoppingButton} onPress={() => navigation.navigate('ProductListingScreen')}>
          <Text style={styles.continueShoppingButtonText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  successImage: {
    width: 150,
    height: 150,
  },

  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },

  continueShoppingButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
  },

  continueShoppingButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

});
