import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default class OrderSummary extends Component {
    
  // Log a message indicating that the component has mounted
  componentDidMount() {
    console.log('OrderSummary component did mount');
  }

  // Log a message if the component is updated
  componentDidUpdate(prevProps) {
    if (prevProps.shoppingCart !== this.props.shoppingCart) {
      console.log('OrderSummary component did update');
    }
  }

  // Log a message indicating that the component unmount
  componentWillUnmount() {
    console.log('OrderSummary component will unmount');
  }

  // This method calculate the total price of item in shopping cart
  calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const item of this.props.shoppingCart) {
      totalPrice += item.product.price * item.quantity;
    }
    return totalPrice.toFixed(2);
  };

  // This method defined how the item in the shopping cart should be rendered
  renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Text>{item.product.productName} x {item.quantity}</Text>
      <Text>RM{(item.product.price * item.quantity).toFixed(2)}</Text>
    </View>
  );

  render() {
    console.log('OrderSummary component rendering');
    const { shoppingCart, totalCartPrice } = this.props;
    return (
        <View style={styles.container}>
          <Text style={styles.title}>Order Summary</Text>
          <FlatList
            data={shoppingCart}
            renderItem={this.renderCartItem}
            keyExtractor={(item) => item.product.id}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.totalAmount}>RM{totalCartPrice.toFixed(2)}</Text>
          </View>
        </View>
      );
  }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      marginBottom: 20,
    },

    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },

    cartItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
    },

    totalContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderTopWidth: 1,
      borderColor: '#ccc',
      marginTop: 10,
      paddingTop: 5,
    },

    totalText: {
      fontWeight: 'bold',
    },

    totalAmount: {
      fontWeight: 'bold',
    },
  });
  

