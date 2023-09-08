import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class ShoppingCartScreen extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
      shoppingCart: [],
    };
    
  }
  async fetchCartItems() {
    try {
      const cartItems = await AsyncStorage.getItem('cartItems');
      if (cartItems) {
        const parsedCartItems = JSON.parse(cartItems);
        this.setState({ shoppingCart: parsedCartItems });
      }
      //if the asynstorage is empty
      else{
        this.setState({ shoppingCart: []});
      }
    } catch (error) {
      console.error('Error retrieving cart items:', error);
    }
  }

  componentDidMount() {
    
    this.fetchCartItems();

   
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.fetchCartItems();
    });
  }


  componentWillUnmount() {
    
    this.focusListener && this.focusListener();
  }

  // renderCartItemFunction for FlatList 
  renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
    <Image source={{uri: item.product.image}} style={styles.productImage} />
    <View style={styles.itemContent}>
      <Text style={styles.cartItemName}>{item.product.productName}</Text>
      <Text style={styles.productPrice}>Price: RM{item.product.price.toFixed(2)}</Text>
      <View style={styles.quantityContainer}>
        <Text style={styles.quantityLabel}>Quantity:</Text>
        <TextInput
          style={styles.quantityInput}
          value={item.quantity.toString()}
          onChangeText={(newQuantity) =>
            this.handleQuantityChange(item.product.productId,item.product.stock, newQuantity)
          }
          keyboardType="numeric"
        />
      </View>
    </View>
      <TouchableOpacity
        onPress={() => this.handleRemoveFromCart(item.product.productId)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  // Shows the message when the cart is empty
  renderEmptyCartMessage = () => (
    <View style={styles.emptyCartContainer}>
      <Text style={styles.emptyCartMessage}>The Cart is Currently Empty</Text>
    </View>
  );

  // Navigate to the 'CheckOutScreen'
  handleCheckOut = () => {
    if(this.state.shoppingCart.length != 0){
      this.props.navigation.navigate('Product', {
        screen: 'CheckOutScreen',
        params: {
          shoppingCart: this.state.shoppingCart
        },
      });
    }
  };

  // Removes an item from the shopping cart based on the product ID
  handleRemoveFromCart = async (productId) => {
    this.setState((prevState) => ({
      shoppingCart: prevState.shoppingCart.filter((item) => item.product.productId !== productId),
    }),async()=>{
          try {
            // Update AsyncStorage to reflect the change
            await AsyncStorage.setItem('cartItems', JSON.stringify(this.state.shoppingCart));
          } catch (error) {
            console.error('Error removing item from cart:', error);
          }
        }
    );
  };

  // Updates the quantity of an item in the shopping cart based on the product ID and the new quantity 
  handleQuantityChange = async (productId, productStock, newQuantity) => {
    const parsedQuantity = newQuantity === '' ? '' : parseInt(newQuantity, 10);
  
  
    this.setState((prevState) => ({
      shoppingCart: prevState.shoppingCart.map((item) =>
        item.product.productId === productId ? { ...item, quantity: parsedQuantity } : item
      ),
    }), async()=>{
        try {
          // Update AsyncStorage to reflect the change
          await AsyncStorage.setItem('cartItems', JSON.stringify(this.state.shoppingCart));
        } catch (error) {
          console.error('Error updating item quantity from cart:', error);
        }
      }
    );
  };

  
  // This method calculates the total price of all items in the shopping cart
  calculateTotalPrice = () => {
    const { shoppingCart } = this.state;
    let totalPrice = 0;
    
    for (const item of shoppingCart) {
      totalPrice += item.product.price * item.quantity;
    }
    
    return totalPrice;
  };

  render() {
    const { shoppingCart } = this.state;
    const totalCartPrice = this.calculateTotalPrice();
    console.log('Shopping cart:', shoppingCart);
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>Cart</Text>
        </View>

        <FlatList
          data={shoppingCart}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderCartItem}
        />


        <View style={styles.totalPriceContainer}>
          <Text style={styles.totalPriceText}>Total Price: RM{totalCartPrice.toFixed(2)}</Text>
        </View>

        {/* Checkout button */}
          <TouchableOpacity style={styles.checkOutButton} onPress={this.handleCheckOut}>
            <Text style={styles.checkOutButtonText}>Check Out</Text>
          </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },

  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },

  itemContent: {
    flex: 1,
  },

  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  cartItemQuantity: {
    fontSize: 14,
    color: '#888',
  },

  emptyCartContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyCartMessage: {
    fontSize: 18,
    color: '#888',
  },

  checkOutButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },

  checkOutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignSelf: 'center',
    marginLeft: 10,
  },

  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },

  cartItem: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },

  itemContent: {
    flex: 1, 
  },

  productImage: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    marginRight: 12,
  },

  quantityInput: {
    width: 100,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc', 
    borderRadius: 4,
    paddingHorizontal: 5, 
    paddingVertical: 0,
    textAlign: 'center',
    color: 'black',
    fontSize: 12,
  },
  
  totalPriceText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
});
