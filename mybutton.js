import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default class mybutton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={this.props.customClick}>
        <Text style={styles.text}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#f05555',
    color: '#ffffff',
    padding: 10,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
  },
  text: {
    color: '#ffffff',
  },
});

