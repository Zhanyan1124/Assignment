import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import OrderSummary from '../component/OrderSummary';

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

  
  
  

  // It will navigate to the 'PaymentSuccessfulScreen' after this method triggered
  handlePlaceOrder = () => {
    const { deliveryAddress, cardNumber, cardHolder, expiresDate, cvv } = this.state;
    this.props.navigation.navigate('PaymentSuccessfulScreen');
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
    const { deliveryAddress, cardNumber, cardHolder, expiresDate, cvv } = this.state;
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

          {/* TextInput for Card Holder */}
          <TextInput
            style={styles.input}
            placeholder="Card Holder"
            onChangeText={(text) => this.setState({ cardHolder: text })}
            value={cardHolder}
          />

          {/* TextInput for Expires Date */}
          <TextInput
            style={styles.input}
            placeholder="Expires Date (MM/YY)"
            onChangeText={(text) => this.setState({ expiresDate: text })}
            value={expiresDate}
          />

          {/* TextInput for CVV */}
          <TextInput
            style={styles.input}
            placeholder="CVV"
            onChangeText={(text) => this.setState({ cvv: text })}
            value={cvv}
          />

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

});
