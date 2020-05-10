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

class EventPage extends React.Component {
  state = {
    isLoading: false,
  };

  componentDidMount() {
    console.log(this.props.eventPage);
  }

  render() {
    const {type, data} = this.props.eventPage;
    const datetime = data.details.startTime.toDate();
    return (
      <>
        <Loading loading={this.state.isLoading} />
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
  paymentModalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalPaymentView: {
    width: R.constants.screenWidth,
    backgroundColor: 'white',
    borderRadius: 8,
    height: R.constants.screenHeight * 0.9,
    padding: 20,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  priceDataContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(162,162,162,0.46)',
  },
  field: {
    width: R.constants.screenWidth * 0.8,
    color: '#000e78',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
  },
  disabledField: {
    color: '#cfcfcf',
    borderColor: '#cfcfcf',
    backgroundColor: '#ebebeb',
  },
  centerContainer: {
    alignItems: 'center',
  },
  topBottomBorder: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(162,162,162,0.46)',
    marginTop: 20,
    marginBottom: 20,
  },
});

const mapStateToProps = state => ({
  user: state.user,
  eventPage: state.eventPage,
});

export default connect(mapStateToProps)(EventPage);
