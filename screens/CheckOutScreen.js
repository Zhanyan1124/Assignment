import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import OrderSummary from '../component/OrderSummary';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class CheckOutScreen extends Component {
  
  // Initial Value
  constructor(props) {
    super(props);
    this.state = {
      deliveryAddress: '',
      cardNumber: '',
      cardHolder: '',
      expiresDate: '',
      cvv: '',
    };
  }

  validateDeliveryAddress = () => {
    if (this.state.deliveryAddress.trim() === '') {
      Alert.alert('Error', 'Delivery Address is required');
     
      return false;
    }
    return true;
  };


  validateCardNumber = () => {
    const { cardNumber } = this.state;
    // Check if the card number has exactly 16 digits
    if (cardNumber.length !== 16) {
      Alert.alert('Error', 'Please enter a 16-digit card number (no spacing)');
      return false;
    }
    return true;
  };


  validateCardHolder = () => {
    const { cardHolder } = this.state;
    // Remove leading and trailing white spaces
    const cleanedCardHolder = cardHolder.trim();

    // Check if the cardholder name is empty or contains invalid characters
    if (cleanedCardHolder === '' || !/^[a-zA-Z\s]+$/.test(cleanedCardHolder)) {
      Alert.alert('Error', 'Please enter a valid cardholder name');
      return false;
   }
    return true;
  };


  validateExpiresDate = () => {
    const { expiresDate } = this.state;
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY format

    if (!regex.test(expiresDate)) {
      Alert.alert('Error', 'Please enter a valid Expires Date in MM/YY format');
      return false;
    }  
    return true;
  };


  validateCVV = () => {
    const { cvv } = this.state;

    // Remove spaces and non-numeric characters from the CVV
    const cleanedCVV = cvv.replace(/\s+/g, '');

    // Check if the cleaned CVV is numeric and has the correct length (e.g., 3 or 4 digits)
    if (!/^\d+$/.test(cleanedCVV) || (cleanedCVV.length !== 3 && cleanedCVV.length !== 4)) {
      Alert.alert('Error', 'Please enter a valid CVV (3 or 4 digits)');
      return false;
    }
    return true;
  };



  // It will navigate to the 'PaymentSuccessfulScreen' after this method triggered
  handlePlaceOrder = () => {
    // const isDeliveryAddressValid = this.validateDeliveryAddress();
    // const isCardNumberValid = this.validateCardNumber();
    // const isCardHolderValid = this.validateCardHolder();
    // const isExpiresDateValid = this.validateExpiresDate();
    // const isCVVValid = this.validateCVV();

    //// If all fields are valid, navigate to 'PaymentSuccessfulScreen'
    // if (
    //   isDeliveryAddressValid &&
    //   isCardNumberValid &&
    //   isCardHolderValid &&
    //   isExpiresDateValid &&
    //   isCVVValid
    // ) {
      this.props.navigation.navigate('PaymentSuccessfulScreen');
    //}
  };

  

  // This method calculates the total price of the items in the shopping cart
  calculateTotalCartPrice = () => {
    const { shoppingCart } = this.props.route.params;
    let totalCartPrice = 0;

    for (const item of shoppingCart) {
      totalCartPrice += item.product.price * item.quantity;
    }

    return totalCartPrice;
  };

  render() {
    const {
      deliveryAddress,
      cardNumber,
      cardHolder,
      expiresDate,
      cvv,
      deliveryAddressError,
      cardNumberError,
      cardHolderError,
      expiresDateError,
      cvvError,
    } = this.state;
    const totalCartPrice = this.calculateTotalCartPrice();


    return (
      <View style={styles.container}>
        <Text style={styles.title}>Check Out</Text>

        {/* Include the OrderSummary component */}
        <OrderSummary shoppingCart={this.props.route.params.shoppingCart} totalCartPrice={totalCartPrice} />

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.orderDetails}>Enter Your Order Details:</Text>
          
          {/* TextInput for Delivery Address */}
          <TextInput
            style={styles.input}
            placeholder="Delivery Address"
            onChangeText={(text) => this.setState({ deliveryAddress: text })}
            
            value={deliveryAddress}
            multiline
          />
          <Text style={styles.errorText}>{deliveryAddressError}</Text>
          {/* Credit Card Image */}
          <View style={styles.creditCardContainer}>
              <Image source={require('../images/ccard.jpg')} style={styles.creditCardImage} resizeMode="contain" />

          </View>

          {/* TextInput for Card Number */}
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            onChangeText={(text) => this.setState({ cardNumber: text })}
          
            value={cardNumber}
          />

          <Text style={styles.errorText}>{cardNumberError}</Text>

          {/* TextInput for Card Holder */}
          <TextInput
            style={styles.input}
            placeholder="Card Holder"
            onChangeText={(text) => this.setState({ cardHolder: text })}
           
            value={cardHolder}
          />

        <Text style={styles.errorText}>{cardHolderError}</Text>

          {/* TextInput for Expires Date */}
          <TextInput
            style={styles.input}
            placeholder="Expires Date (MM/YY)"
            onChangeText={(text) => this.setState({ expiresDate: text })}
            
            value={expiresDate}
          />

            <Text style={styles.errorText}>{expiresDateError}</Text>

          {/* TextInput for CVV */}
          <TextInput
            style={styles.input}
            placeholder="CVV"
            onChangeText={(text) => this.setState({ cvv: text })}
           
            value={cvv}
          />
            <Text style={styles.errorText}>{cvvError}</Text>

          {/* Place Order Button */}
          <TouchableOpacity style={styles.placeOrderButton} onPress={this.handlePlaceOrder}>
            <Text style={styles.placeOrderButtonText}>Place Order</Text>
          </TouchableOpacity>
        </ScrollView>
        
      </View>
      


      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  orderDetails: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },

  placeOrderButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 20,
  },

  placeOrderButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  creditCardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
  },

  creditCardImage: {
    width: '80%', 
    height: undefined, 
    aspectRatio: 2.5, 
  },

  errorText: {
    color: 'red',
    marginBottom: 10,
  },

});
