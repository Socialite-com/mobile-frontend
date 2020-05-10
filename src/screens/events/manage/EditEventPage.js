import React from 'react';
import {StyleSheet} from 'react-native';

import {
  Invite,
  Field,
  Details,
  CountDown,
  Map,
} from 'library/components/Events/EventInvite';

import R from 'res/R';

import CacheImage from 'library/components/General/CacheImage';
import Loading from 'library/components/General/Loading';

import {connect} from 'react-redux';

class EditEventPage extends React.Component {
  componentDidMount() {
    console.log(this.props.eventPage);
  }

  render() {
    const {type, data} = this.props.eventPage;
    const datetime = data.details.startTime.toDate();
    return (
      <>
        <CacheImage
          background={true}
          imageStyle={styles.bgImage}
          style={styles.backgroundView}
          uri={data.details.backgroundImage}
        />
        <Invite data={data} navigator={this.props.navigation}>
          <Field header="Where" body="Marianopolis College, Westmount" />
          <Field
            header="When"
            body={`${datetime.toDateString()} ${datetime.toTimeString()}`}
          />
          {data.details.description ? (
            <Field header="Details" body={data.details.description} />
          ) : null}
          {data.details.paid ? <Field header="Ticket Price" body="5$" /> : null}
        </Invite>
      </>
    );
  }
}

const styles = StyleSheet.create({
  backgroundView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bgImage: {
    width: R.constants.screenWidth * 1.2,
  },
  modalContainer: {
    margin: 0,
    justifyContent: 'flex-start',
  },
});

const mapStateToProps = state => ({
  user: state.user,
  eventPage: state.eventPage,
});

export default connect(mapStateToProps)(EditEventPage);
