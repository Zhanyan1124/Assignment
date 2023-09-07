import React, {Component} from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

let config = require('../Config');
export default class ProductListingScreen extends Component{
  
  // Initial  Value
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: '',
      searchQuery: '',
      products: [],
      isFetching : false,
      image:''
    };
    this._load = this._load.bind(this);
  }

  _load() {
    let url = config.settings.serverPath + '/api/products';
    this.setState({isFetching: true});
    fetch(url)
      .then(response => {
        console.log(response);
        if (!response.ok) {
          Alert.alert('Error:', response.status.toString());
          throw Error('Error ' + response.status);
        }
        this.setState({isFetching: false});
        return response.json();
      })
      .then(products => {
        console.log(products);
        this.setState({products: products});
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this._load();
  }


// renderProductFunction for FlatList 
renderProduct = ({item}) => {

  return (
    <View style={styles.productItem}>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductDetailScreen', { productID: item.productId })}>
        <Image  source={{uri: item.image}} style={styles.productImage} resizeMode="cover" /> 
        <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.productName}</Text>
        <Text style={styles.productPrice}>RM{item.price.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}
  // For Search Function
  handleSearch = (text) => {
    this.setState({ searchQuery: text });
  };

  render () {
    // To filter the products that match both the selected category and the search query
    const { selectedCategory, searchQuery, products } = this.state;


    const filteredProducts = products.filter((product) => {
      const categoryMatch = !selectedCategory || product.category === selectedCategory;
      const nameMatch = product.productName.toLowerCase().startsWith(searchQuery.toLowerCase());
      return categoryMatch && nameMatch;
    });

    return (
      
      <View style={styles.container}>
        {/* Header with Shop logo */}
        <View style={styles.header}>
            <Image source={require('../images/logo.jpg')} style={styles.logo} resizeMode="contain" />
        </View>

        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search for products..."
            placeholderTextColor="#888"
            onChangeText={this.handleSearch}
            value={this.state.searchQuery}
          />
        </View>

        {/* Filter Categorization */}
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>

            {/* Vegetable Filter */}
            <TouchableOpacity style={[styles.filterButton, selectedCategory === 'vegetable' && styles.selectedFilter]} onPress={() => this.setState((prevState) => prevState.selectedCategory === 'vegetable' ? { selectedCategory: ''} : { selectedCategory: 'vegetable'})}>
              <Text style={styles.filterButtonText}>Vegetable</Text>
            </TouchableOpacity>

            {/* Fruit Filter */}
            <TouchableOpacity style={[styles.filterButton, selectedCategory === 'fruit' && styles.selectedFilter]} onPress={() => this.setState((prevState) => prevState.selectedCategory === 'fruit' ? { selectedCategory: ''} : { selectedCategory: 'fruit'})}>
              <Text style={styles.filterButtonText}>Fruit</Text>
            </TouchableOpacity>

            {/* Snacks  Filter */}
            <TouchableOpacity style={[styles.filterButton, selectedCategory === 'snack' && styles.selectedFilter]} onPress={() => this.setState((prevState) => prevState.selectedCategory === 'snack' ? { selectedCategory: ''} : { selectedCategory: 'snack'})}>
              <Text style={styles.filterButtonText}>Snacks</Text>
            </TouchableOpacity>

            {/* Beverages  Filter */}
            <TouchableOpacity style={[styles.filterButton, selectedCategory === 'beverage' && styles.selectedFilter]} onPress={() => this.setState((prevState) => prevState.selectedCategory === 'beverage' ? { selectedCategory: ''} : { selectedCategory: 'beverage'})}>
              <Text style={styles.filterButtonText}>Beverages</Text>
            </TouchableOpacity>

            {/* Chilled and Frozen Filter */}
            <TouchableOpacity style={[styles.filterButton, selectedCategory === 'frozen' && styles.selectedFilter]} onPress={() => this.setState((prevState) => prevState.selectedCategory === 'frozen' ? { selectedCategory: ''} : { selectedCategory: 'frozen'})}>
              <Text style={styles.filterButtonText}>Chilled and Frozen</Text>
            </TouchableOpacity>

          </ScrollView>
        </View>

      {/* Product Listing */}
        <View style={styles.ProductListContainer}>
          <View style={styles.ProductContainer}>
            <FlatList 
              data={filteredProducts}
              renderItem={this.renderProduct}
              keyExtractor={(item) => item.productId}
              numColumns={3}
              columnWrapperStyle={styles.productList}
            />
          </View>
        </View>


      </View>
    );
  }
}
const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 200,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  logo: {
    width: 100,
    height: 40,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  searchBarContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },

  searchBar: {
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingLeft: 15,
    fontSize: 16,
    color: 'black', 
  },

  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },

  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f0f0f0',
  },

  filterButtonText: {
    fontSize: 16,
    color: 'black',
  },

  selectedFilter: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
  },

  productItem: {
    width: '32%', 
    marginVertical: 20,
    marginHorizontal: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },

  productImage: {
    width: '80%',
    marginLeft: '10%',
    height: 90, 
    borderRadius: 8,
    marginBottom: 5, 
  },

  productInfo: {
    alignItems: 'center',
  },

  productName: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#888',
  },

  productPrice: {
    fontSize: 10,
    color: '#888',
    textAlign: 'center',
  },

  productListContainer: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'flex-start', 
  },

  productContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },

});