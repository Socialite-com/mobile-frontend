import React from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Toast from 'react-native-root-toast';
import Modal from 'react-native-modal';

import Button from 'library/components/General/Button';
import CustomText from 'library/components/General/CustomText';
import TextInput from 'library/components/General/TextInput';
import Todo from 'library/components/Events/Todo';
import Announcement from 'library/components/Events/Announcement';
import Icon from 'react-native-vector-icons/FontAwesome5';

import R from 'res/R';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {postAnnouncement} from '../../../state/actions/eventPage';

class ManageEvent extends React.Component {
  state = {
    message: '',
    modalVisible: false,
  };

  componentDidMount() {
    console.log(this.props.eventPage.data.announcements);
  }

  sendMessage = () => {
    if (this.state.message.length > 0) {
      const message = {
        text: this.state.message,
        time: Date.now(),
      };

      Promise.all([this.props.actions.postAnnouncement(message)]).then(() => {
        this.setState({message: ''});
        Toast.show('Announcement Posted!', {
          duration: 1500,
          position: -40,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
          opacity: 1,
          backgroundColor: 'white',
          textColor: 'black',
          shadowColor: 'grey',
          containerStyle: {
            width: R.constants.screenWidth * 0.8,
          },
          textStyle: {
            //text-styles
          },
        });
      });
    }
  };

  toggleModal = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  };

  //open new window
  //show announcements

  render() {
    return (
      <View style={styles.mainView}>
        <View>
          <CustomText customStyle={styles.subTitle} label="Announcement" />

          <View>
            <TextInput
              placeholder="Post Public Anouncement"
              customStyle={styles.anouncementField}
              value={this.state.message}
              multiline={true}
              onChangeText={message => {
                this.setState({message});
              }}
            />
            <View style={{flexDirection: 'row'}}>
              <Button
                customStyle={{margin: 5, marginTop: 10}}
                half
                swap
                title="Publish"
                onPress={this.sendMessage}
              />
              <Button
                icon
                grey
                customStyle={{width: 50}}
                onPress={this.toggleModal}>
                <Icon name="list" size={15} color={'black'} />
              </Button>
            </View>
          </View>

          <Modal
            swipeDirection="none"
            backdropOpacity={0.4}
            isVisible={this.state.modalVisible}
            onBackdropPress={() => this.toggleModal()}
            style={styles.modalContainer}>
            <View style={styles.modalView}>
              <View style={styles.exitView}>
                <TouchableOpacity onPress={() => this.toggleModal()}>
                  <Icon name="times" size={25} color={'white'} />
                </TouchableOpacity>
              </View>
              <View style={{flex: 2}}>
                <CustomText
                  customStyle={styles.subTitle}
                  label="Announcements"
                />
              </View>
              {this.props.eventPage.data.announcements ? (
                <View style={{flex: 16}}>
                  {this.props.eventPage.data.announcements
                    .reverse()
                    .map((post, index) => {
                      return (
                        <Announcement
                          key={index}
                          text={post.text}
                          time={post.time}
                        />
                      );
                    })}
                </View>
              ) : (
                <View style={{flex: 16}}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <Icon name="edit" size={30} color={'white'} />

                    <CustomText
                      customStyle={styles.subTitle}
                      label="No Announcements posted"
                      color={'white'}
                    />
                  </View>
                </View>
              )}
            </View>
          </Modal>
        </View>
        <View>
          <CustomText customStyle={styles.subTitle} label="To-do List" />

          {this.props.eventPage.data.details.todos &&
            this.props.eventPage.data.details.todos.map((item, index) => {
              return (
                <Todo
                  key={index}
                  label={item.title}
                  isCompleted={item.completed}
                />
              );
            })}
        </View>

        <View style={styles.chatButton}>
          <Button
            customStyle={{
              shadowOpacity: 0.4,
              elevation: 1,
            }}
            icon
            round
            onPress={() =>
              this.props.navigation.navigate('Chat', {
                screen: 'SelectChat',
              })
            }>
            <Icon name="comment" size={20} color={R.color.primary} />
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
    padding: 10,
  },
  subTitle: {
    color: '#fff',
    fontFamily: R.fonts.comfortaaBold,
    fontSize: 24,
    marginBottom: '5%',
    marginTop: '10%',
  },
  anouncementField: {
    backgroundColor: '#333333',
    borderWidth: 0,
    width: R.constants.screenWidth * 0.925,
    height: 75,
    padding: 15,
    margin: 5,
    color: '#fff',
  },
  chatButton: {
    position: 'absolute',
    padding: '2.5%',
    bottom: 0,
    right: 0,
  },
  modalContainer: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalView: {
    padding: '5%',
    borderRadius: 8,
    backgroundColor: '#1a1a1a',
    height: R.constants.screenHeight * 0.9,
  },
  exitView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

const ActionCreators = {
  postAnnouncement,
};

const mapStateToProps = state => ({
  eventPage: state.eventPage,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageEvent);
