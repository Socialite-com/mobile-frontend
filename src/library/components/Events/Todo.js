import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';

import CustomText from 'library/components/General/CustomText';
import Icon from 'react-native-vector-icons/FontAwesome5';

import R from 'res/R';

class Todo extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.isCompleted ? (
          <Icon style={{color: '#fff'}} name="check-circle" size={20} />
        ) : (
          <Icon style={{color: '#fff'}} name="circle" size={20} />
        )}

        <CustomText
          label={this.props.label}
          customStyle={styles.textContainer}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 6,
    padding: 15,
    margin: 5,
    backgroundColor: '#333333',
  },
  iconGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '15%',
  },
  textContainer: {
    paddingLeft: 10,
    width: '80%',
    color: '#fff',
  },
});

export default Todo;
