import React, { Component } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
let SQLite = require('react-native-sqlite-storage');

const bannerImages = [
  require('../img/banner6.jpg'),
  require('../img/banner3.jpg'),
  require('../img/banner5.jpg'),
  require('../img/banner3.jpg'),
  require('../img/banner2.jpg'),
  require('../img/banner1.jpg'),

];

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.scrollViewRef = React.createRef();
    this.state = {
      currentIndex: 0,
      isFetching: false,
      categories: ["Vegetable","Fruit","Snack","Beverage","Frozen"],
      products: []
    };

    this.db = SQLite.openDatabase({ name: 'db.sqlite' }, this.openCallback, this.errorCallback);
    this._load = this._load.bind(this);
  }

  _load() {
    let url = "https://j6eak3fzel.execute-api.us-east-1.amazonaws.com/getProducts";
    let params = "operation=getProducts"
    let urlwithparams = url +"?" + params;
    this.setState({isFetching: true});

    fetch(urlwithparams)
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
        this.setState({products: products});
      })
      .catch(error => {
        console.log(error);
      });
  }

 
  componentDidMount() {
    this.startAutoScroll();
    this.db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTO_INCREMENT , name VARCHAR(20), password VARCHAR(10), email VARCHAR(255), age INTEGER(25))',
              [],  (error) => console.log("faile" + error)
            );
            tx.executeSql('SELECT * FROM users', [], (tx, results) => {
              console.log("User records:", results.rows);
              for (let i = 0; i < results.rows.length; i++) {
                console.log("User " + i + ":", results.rows.item(i));
              }
            });    
    });
    this._load();
    
  }
  
    
  openCallback() {
    console.log('database open ');
  }
  errorCallback(err) {
    console.log('Error in opening the database: ' + err);
  }
  componentWillUnmount() {
    this.stopAutoScroll();
  }

  startAutoScroll = () => {
    this.interval = setInterval(this.scrollBanner, 2500);
  };

  stopAutoScroll = () => {
    clearInterval(this.interval);
  };

  scrollBanner = () => {
    const { currentIndex } = this.state;
    const nextIndex = (currentIndex + 1) % bannerImages.length;
    this.scrollViewRef.current.scrollTo({
      x: nextIndex * Dimensions.get('window').width,
      animated: true,
    });
    this.setState({ currentIndex: nextIndex });
  };  

  renderBanner = () => {
    return (
      <ScrollView
        ref={this.scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScrollBeginDrag={this.stopAutoScroll}
        onScrollEndDrag={this.startAutoScroll}
        contentContainerStyle={{ width: Dimensions.get('window').width * bannerImages.length }}
      >
        {bannerImages.map((image, index) => (
          <Image key={index} source={image} style={styles.bannerImage} resizeMode="cover" />
        ))}
      </ScrollView>
    );
  };

  renderHeader = (category, navigation) => (
    <View style={styles.header}>
      <Text style={styles.categoryTitle}>{category}</Text>
      <TouchableOpacity onPress={() => {
          navigation.navigate('Product');
        }}>
        <Text style={styles.viewAll}>View All</Text>
      </TouchableOpacity>
    </View>
  );

  renderImage = (item) => (
    <View style={styles.imageContainer}>
      <TouchableOpacity style = {{width: '100%', height: '100%'}} onPress = {()=>{
        this.props.navigation.navigate('Product',{
          screen:'ProductListingScreen',
          params:{
            productID: item.productId
          }
        });
      }}>
        <Image source={{uri: item.image}} style={styles.image} resizeMode="cover" />
      </TouchableOpacity>
    </View>
  );

  renderCategory = (category) => (
    <View>
      {this.renderHeader(category, this.props.navigation)}
      <FlatList
        data={this.state.products.filter((product)=>{return product.category===category.toLowerCase()})}
        renderItem={({item}) => this.renderImage(item)}
        keyExtractor={(item) => item.productId}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        {this.renderBanner()}
        <FlatList
        data={this.state.categories}
        renderItem={({ item }) => this.renderCategory(item)}
        keyExtractor={(category, index) => index.toString()}
        showsVerticalScrollIndicator={false}
       />  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bannerImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 0.5, 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 5,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black', 
  },
  viewAll: {
    fontSize: 16,
    color: '#757575', 
    fontWeight: 'bold',
  },
  imageContainer: {
    width: 140, 
    height: 100, 
    margin: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: '70%',
    height: 50,
  },
});
