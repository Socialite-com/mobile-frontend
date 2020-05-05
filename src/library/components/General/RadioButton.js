import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';

import CustomText from 'library/components/General/CustomText';
import Icon from 'react-native-vector-icons/FontAwesome5';

class RadioButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onSelect}
        disabled={this.props.disabled}>
        <View style={styles.container}>
          {this.props.isSelected ? (
            <Icon
              name={this.props.checkbox ? 'check-square' : 'dot-circle'}
              size={20}
            />
          ) : (
            <Icon name={this.props.checkbox ? 'square' : 'circle'} size={20} />
          )}

          <CustomText
            label={this.props.label}
            customStyle={styles.textContainer}
            subtitle_6
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
  },
  textContainer: {
    paddingLeft: 15,
  },
});

export default RadioButton;
