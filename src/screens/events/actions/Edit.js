import React from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import EventCard from '../../../library/components/Events/EventCard';
import TextForm from '../../../library/components/General/TextInput';
import CustomText from '../../../library/components/General/CustomText';

import R from 'res/R';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {parseDateTime} from '../../../state/selectors';

class EditEvent extends React.Component {
  state = {
    data: this.props.eventPage.data,
  };

  changeData(value, type) {
    switch (type) {
      case 'title':
        this.setState(prevState => ({
          data: {
            ...prevState.data,
            details: {
              ...prevState.data.details,
              [type]: value,
            },
          },
        }));
    }
  }

  render() {
    const {data} = this.state;
    const startTime = parseDateTime(data.details.startTime.toDate());
    const endTime = 'Add end time';
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => this.props.navigation.pop()}>
          <Icon name="x" size={25} />
        </TouchableOpacity>
      ),
    });
    return (
      <ScrollView>
        <View style={[styles.textInput, {marginVertical: '0%'}]}>
          <EventCard data={data} edit />
        </View>
        <View style={{flex: 1, paddingTop: '3%', paddingBottom: '10%'}}>
          <View style={[styles.formView, styles.textInput, styles.row]}>
            <View style={{flex: 10}}>
              <TextForm
                empty
                value={data.details.title}
                onChangeText={title => this.changeData(title, 'title')}
              />
            </View>
            <TouchableOpacity style={{flex: 1, alignItems: 'flex-end'}}>
              <Icon name="camera" size={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.textInput}>
            <CustomText pad subtitle_3 label="Time and Location" />
            <TouchableOpacity style={[styles.formView, sticky.top]}>
              <Text style={[styles.text, styles.bold]}>Start</Text>
              <Text style={styles.text}>{startTime}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.formView, sticky.middle]}>
              <Text style={[styles.text, styles.bold]}>End</Text>
              <Text style={styles.text}>{endTime}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.formView, sticky.bottom]}>
              <Text style={[styles.text, styles.bold]}>Location</Text>
              <Text style={styles.text}>Add Location</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.textInput}>
            <CustomText pad subtitle_3 label="Party Type" />
            <TouchableOpacity style={[styles.formView, sticky.top]}>
              <Text style={[styles.text, styles.bold]}>
                {data.details.size.capitalize()}
              </Text>
              <Text style={styles.text}>{data.details.attendance}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.formView, sticky.middle]}>
              <Text style={[styles.text, styles.bold]}>Privacy</Text>
              <Text style={styles.text}>
                {data.details.private ? 'private' : 'public'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.formView, sticky.bottom]}>
              <Text style={[styles.text, styles.bold]}>Paid</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.textInput}>
            <CustomText pad subtitle_3 label="Details" />
            <TouchableOpacity style={[styles.formView, sticky.top]}>
              <Text style={[styles.text, styles.bold]}>Description</Text>
              <Text style={styles.text}>Add a description</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.formView, sticky.bottom]}>
              <Text style={[styles.text, styles.bold]}>Options</Text>
              <Icon name="chevron-right" size={25} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.formView, styles.textInput, styles.button]}>
            <Text style={styles.text}>Cancel Party</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.formView, styles.textInput, styles.button]}>
            <Text style={[styles.text, styles.red]}>Delete Party</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const sticky = {
  top: {
    marginTop: 8,
    marginBottom: 0,
    borderBottomWidth: 1,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  middle: {
    borderRadius: 0,
    marginVertical: 0,
    borderBottomWidth: 1,
  },
  bottom: {
    marginTop: 0,
    marginBottom: 8,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
};

const styles = StyleSheet.create({
  textInput: {
    alignSelf: 'center',
    marginVertical: '2%',
    width: R.constants.screenWidth * 0.85,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  formView: {
    height: 40,
    width: '100%',
    borderWidth: 0,
    borderRadius: 12,
    marginVertical: 8,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderColor: '#dcdcdc',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
    fontFamily: R.fonts.comfortaaRegular,
  },
  red: {color: '#db4a4a'},
  button: {justifyContent: 'center'},
  bold: {fontFamily: R.fonts.comfortaaBold},
});

const ActionCreators = {};

const mapStateToProps = state => ({
  user: state.user,
  eventPage: state.eventPage,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);
