import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';

import CustomText from 'library/components/General/CustomText';
import Icon from 'react-native-vector-icons/FontAwesome5';

import R from 'res/R';

class Todo extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.onComplete}>
          {this.props.isCompleted ? (
            <Icon name="check-circle" size={20} />
          ) : (
            <Icon name="circle" size={20} />
          )}
        </TouchableOpacity>

        <CustomText
          label={this.props.label}
          customStyle={styles.textContainer}
        />
        <View style={styles.iconGroup}>
          <TouchableOpacity onPress={this.props.onRemove}>
            <Icon name="trash" size={20} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.onDrag}>
            <Icon name="grip-lines" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 6,
    padding: 15,
    margin: 5,
  },
  iconGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '15%',
  },
  textContainer: {
    paddingLeft: 10,
    width: '80%',
  },
});

export default Todo;
