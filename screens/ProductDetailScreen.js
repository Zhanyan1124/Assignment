import React, {Component} from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class ProductDetailScreen extends Component{

  // Initial Value
  constructor(props){
    super(props)

    this.state = {
      quantity: 1,
      //Dummy Cart
      shoppingCart: [],
      cartItems: []
    };
  }
  
  
  // Increase Quantity Button Function
  increaseQuantity = () => {
    this.setState((prevState) => ({ quantity: prevState.quantity + 1}));
  };

  // Decrease Quantity Button Function
  decreaseQuantity = () => {
    if(this.state.quantity > 1) {
      this.setState((prevState) => ({ quantity: prevState.quantity - 1}));
    }
  };

  // This method handle adding items into shopping cart
  
    handleAddToCart = async () => {
    
      const { product } = this.props.route.params;
      const { quantity } = this.state;
      
    
      try {
        // Retrieve existing cart items from AsyncStorage
        const existingCartItems = await AsyncStorage.getItem('cartItems');
        
        const cartItems = existingCartItems ? JSON.parse(existingCartItems) : [];
    
        // Check if the selected product is already in the cart
        const existingCartItemIndex = cartItems.findIndex(item => item.product.id === product.id);
    
        if (existingCartItemIndex !== -1) {
          console.log('Updating existing cart item');
          // If the product already exists, update the quantity
          cartItems[existingCartItemIndex].quantity += quantity;
        } else  {
          console.log('Adding new cart item');
          // If the product doesn't exist, add it to the cart
          cartItems.push({ product, quantity });
          
    }
  // Store the updated cart items back in AsyncStorage
         await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
        console.log('Cart items stored in AsyncStorage:', cartItems);


        this.setState({ shoppingCart: cartItems }, () => {
          console.log('Shopping cart state updated:', this.state.shoppingCart);
          
          // Navigate to the Cart screen after updating the state
          this.props.navigation.navigate('Cart', { shoppingCart: cartItems });
        });
    
      
        
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    };
  
  render () {

    const { product } = this.props.route.params;

    return (
      <View style={styles.productDetailContainer}>
        {/* Show Product Image, Name, and Price */}
        <View style={styles.productDetail}>
          <Image source={product.image} style={styles.productImage} resizeMode="cover" />
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>RM{product.price.toFixed(2)}</Text>
        </View>

      {/* Shows Quantity and +/- buttons */}
      <View style={styles.productQuantity}>
        <Text style={styles.quantity}>Quantity</Text>
          <View style={styles.quantityView}>
            <TouchableOpacity style={styles.quantityButton} onPress={this.decreaseQuantity}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{this.state.quantity}</Text>
            <TouchableOpacity style={styles.quantityButton} onPress={this.increaseQuantity}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
      </View>

      {/* Add to Cart buttons */}
      <View style={styles.CartButtons}>
          <TouchableOpacity style={styles.addToCartButton} onPress={this.handleAddToCart}>
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
      </View>



      </View>
    );
  }
}



const styles = StyleSheet.create ({
  productDetailContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  
  productDetail: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, 
    marginBottom: 20,
  },
  
  productImage: {
    width: '100%',
    height: 200, 
    borderRadius: 8,
    marginBottom: 10, 
  },
  
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333', 
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#888', 
    textAlign: 'center',
  },
  
  productQuantity: {
    alignItems: 'center', 
    marginBottom: 30,
  },
  
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  quantityView: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 10, 
  },
  
  quantityButton: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 25,
    borderWidth: 1, 
    borderColor: '#ccc', 
  },
  
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    lineHeight: 30,
  },
  
  quantityText: {
    fontSize: 18,
    color: '#333',
  },

  CartButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  buyNowButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },

  buyNowButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  addToCartButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  addToCartButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});