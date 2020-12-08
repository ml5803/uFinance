import React, { Component } from 'react';
import { AppRegistry, CameraRoll, Dimensions, Image, TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Button } from 'react-native-vector-icons/Ionicons';
import { RNS3 } from 'react-native-aws3';
import { connect } from 'react-redux';
import { updateReceipt } from '../store/actions/updateReceipt.js';
import { bindActionCreators } from 'redux';
import Api from '../API.js';

//import S3 from "react-aws-s3";
import {TEST_KEY, TEST_SECRET_KEY, TEST_REGION, TEST_BUCKET, AWS_KEY, AWS_SECRET_KEY, API_STAGE, AWS_REGION } from '@env'


class GroupPayment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      path: null,
      url: null,
      splitURL:null,
      cost: null,
      splitCost:null,
      item: null,
    };
  }



  renderCamera() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          captureAudio={false}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          /*onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}*/
        />


        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('IndividualGroup')} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> Back </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderImage() {
    return (
      <View style={styles.container}>

        <Image
          source={{ uri: this.state.url }}
          style={styles.preview}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => this.setState({ path: null })} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> Back to Camera </Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.path ? this.renderImage() : this.renderCamera()}
      </View>
    );
  }

  takePicture = async () => {
    console.log('***********************************************************************');
    console.log('***********************************************************************');
    if (this.camera) {
      //const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      //console.log(data.uri);
      this.setState({path: data.uri});
      const path = data.uri.split("/"); //splits path into list separated by "/"
      const file = {
        uri: data.uri,
        name: path[path.length - 1] , //returns jpg name
        type: 'image/jpeg'
      };
      console.log('path: ', path)
      const options = {
        keyPrefix: 'photos/',
        bucket: TEST_BUCKET,
        region: TEST_REGION,
        accessKey: TEST_KEY,
        secretKey: TEST_SECRET_KEY,
        successActionStatus: 201
      };

      RNS3.put(file, options).then(response => {
        if (response.status !== 201) {
          console.log("error");
          throw new Error('Failed to upload image to S3', response);
        }
        console.log('*** BODY ***', response.body);
        this.setState({url: response.body.postResponse.location});
        console.log('*** URL ***', this.state.url);

        this.setState({splitURL: this.state.url.split("%2F")})
        this.setState({url: this.state.splitURL[0] + '/' + this.state.splitURL[1]})

        let obj = {
           url: this.state.url
        }
        console.log('*** obj ***', obj);
        Api.post('extract', obj).then(resp => {


          this.setState({splitCost: resp.response.total_cost.split("$")})
          this.setState({cost: this.state.splitCost[this.state.splitCost.length - 1]})
          //this.setState({cost: resp.response.total_cost})
          this.setState({item: resp.response.place})

          console.log('cost: ', this.state.cost)
          console.log('place: ', this.state.item)
          console.log('url: ', this.state.url)

          this.props.updateReceipt(this.state.item, this.props.loginState['userid'], this.state.cost, this.state.url)
          console.log('redux cost: ', this.props.receiptState['cost'])
          console.log('redux place: ', this.props.receiptState['item'])
          console.log('redux url: ', this.props.receiptState['receipt'])
        }).catch(function(e){
          console.log(e)
        })


      });

    }

  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

const mapStateToProps = state => ({
  loginState: state.loggedin,
  memberState: state.members,
  receiptState: state.receipt,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    updateReceipt,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(GroupPayment);