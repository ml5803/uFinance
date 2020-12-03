import React, { Component } from 'react';
import { AppRegistry, CameraRoll, Dimensions, Image, TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Button } from 'react-native-vector-icons/Ionicons';
import { RNS3 } from 'react-native-aws3';
import { TEST_KEY, TEST_SECRET_KEY, TEST_BUCKET, TEST_REGION } from '@env'

//import S3 from "react-aws-s3";
//import {TEST_KEY, TEST_SECRET_KEY, TEST_REGION, TEST_BUCKET } from '@env'

class GroupPayment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      path: null,
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
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderImage() {
    return (
      <View>
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => this.setState({ path: null })} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> { this.state.path } </Text>
          </TouchableOpacity>
        </View>
        <Image
          source={{ uri: this.state.path }}
          style={styles.preview}
        />


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
    if (this.camera) {
      //const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
      this.setState({path: data.uri});
      const path = data.uri.split("/") //splits path into list separated by "/"
      const file = {
        uri: data.uri,
        name: path[path.length - 1] , //returns jpg name
        type: 'image/jpeg'
      };

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

export default GroupPayment;