import React, { Component } from 'react';
import { View, TextInput } from 'react-native';

export default class mytextinput extends Component {
  render() {
    return (
      <View
        style={{
          marginLeft: 35,
          marginRight: 35,
          marginTop: 10,
          borderColor: '#007FFF',
          borderWidth: 1,
        }}>
        <TextInput
          underlineColorAndroid="transparent"
          placeholder={this.props.placeholder}
          placeholderTextColor="#007FFF"
          keyboardType={this.props.keyboardType}
          onChangeText={this.props.onChangeText}
          returnKeyType={this.props.returnKeyType}
          numberOfLines={this.props.numberOfLines}
          multiline={this.props.multiline}
          onSubmitEditing={this.props.onSubmitEditing}
          style={this.props.style}
          blurOnSubmit={false}
          value={this.props.value}
        />
      </View>
    );
  }
}

