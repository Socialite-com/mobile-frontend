import React from 'react';
import {
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import R from 'res/R';

const UserTab = ({item, index}) => {
  return (
    <TouchableOpacity style={styles.container} key={index}>
      <View style={styles.profileView}>
        <TouchableHighlight style={styles.imageContainer}>
          {/* TODO Add profile circle component here using user id */}
          <Image style={styles.image} source={R.images.logo_white} />
        </TouchableHighlight>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.name}>{item.userName}</Text>
        <Text style={styles.status}>{item.status}</Text>
      </View>
      <View style={styles.actionView}>
        <Icon name="edit-2" size={20} color={'#fff'} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    marginBottom: '2%',
    paddingBottom: '1%',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#262626',
    width: R.constants.screenWidth,
  },
  userInfo: {
    flex: 3,
    flexShrink: 1,
    justifyContent: 'center',
    paddingHorizontal: '2%',
  },
  actionView: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '3%',
    justifyContent: 'flex-end',
  },
  profileView: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: '2%',
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: R.color.secondary,
  },
  image: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  name: {
    fontFamily: R.fonts.comfortaaBold,
    color: '#ffffff',
    fontSize: 18,
  },
  status: {
    fontFamily: R.fonts.comfortaaRegular,
    color: '#ffffff',
    marginTop: '2%',
    fontSize: 13,
  },
});

export default UserTab;
