import React, { Component } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
let SQLite = require('react-native-sqlite-storage');

const categories = [
  {
    title: 'Vegetables',
    category: 'vegetable',
    images: [
      require('../img/product1.jpg'),
      require('../img/product1.jpg'),
      require('../img/product1.jpg'),
    ],
  },
  {
    title: 'Fruits',
    category: 'fruit',
    images: [
      require('../images/apple.jpg'),
      require('../images/apple.jpg'),
      require('../images/apple.jpg'),
    ],
  },
  {
    title: 'Snacks',
    category: 'snack',
    images: [
      require('../images/lays.jpg'),
      require('../images/lays.jpg'),
      require('../images/lays.jpg'),
    ],
  },
  {
    title: 'Beverages',
    category: 'beverage',
    images: [
      require('../images/heineken.jpg'),
      require('../images/heineken.jpg'),
      require('../images/heineken.jpg'),
    ],
  },{
    title: 'Chilled and Frozens',
    category: 'snack',
    images: [
      require('../images/cheese.jpg'),
      require('../images/cheese.jpg'),
      require('../images/cheese.jpg'),
    ],
  }
];

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
    };
    this.db = SQLite.openDatabase({ name: 'db.sqlite' }, this.openCallback, this.errorCallback);
  }

 
  componentDidMount() {
    this.startAutoScroll();
    this.db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT , name VARCHAR(20), password VARCHAR(10), email VARCHAR(255), age INTEGER(25))',
              [],  (error) => console.log("faile" + error)
            );
            tx.executeSql('SELECT * FROM users', [], (tx, results) => {
              console.log("User records:", results.rows);
              for (let i = 0; i < results.rows.length; i++) {
                console.log("User " + i + ":", results.rows.item(i));
              }
            }); 
        
      
    });

    
   
    
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
      <Text style={styles.categoryTitle}>{category.title}</Text>
      <TouchableOpacity onPress={() => {
      navigation.navigate('Product');
    }}>
        <Text style={styles.viewAll}>View All</Text>
      </TouchableOpacity>
    </View>
  );

  renderImage = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={item} style={styles.image} resizeMode="cover" />
    </View>
  );

  renderCategory = ({ item }) => (
    <View>
      {this.renderHeader(item, this.props.navigation)}
      <FlatList
        data={item.images}
        renderItem={this.renderImage}
        keyExtractor={(image, index) => index.toString()}
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
        data={categories}
        renderItem={({ item }) => this.renderCategory({ item, navigation })}
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
    fontWeight: '#333333',
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
    width: null,
    height: null,
  },
});
