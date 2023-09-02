import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

export default class mytext extends Component {
  render() {
    return (
      <Text style={styles.text}>
        {this.props.text}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#111825',
    fontSize: 18,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
  },
});

