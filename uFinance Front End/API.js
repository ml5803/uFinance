import AWSSignature from 'react-native-aws-signature'
import {HOST, AWS_KEY, AWS_SECRET_KEY, API_STAGE, AWS_REGION } from '@env'

console.log(HOST)
// used this guide for reference : https://www.jsparling.com/use-react-native-to-post-to-secure-aws-api-gateway-endpoint/
class Api {

  static get(stage_path) {
    const verb = 'GET'
    // construct the url and path for our sample API
    const path = '/' + API_STAGE + '/' + stage_path
    const url = 'https://' + HOST + path
    console.log(url)
    let credentials = {
      AccessKeyId: AWS_KEY,
      SecretKey: AWS_SECRET_KEY
    }

    let auth_date = new Date();

    let auth_header = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'dataType': 'json',
      'X-Amz-Date': auth_date.toISOString(),
      'host': HOST
    }

    let auth_options = {
      path: path,
      method: verb,
      service: 'execute-api',
      headers: auth_header,
      region: AWS_REGION,
      body: '',
      credentials
    };

    console.log('credentials', credentials)
    let awsSignature = new AWSSignature();
    awsSignature.setParams(auth_options);

    const authorization = awsSignature.getAuthorizationHeader();

    // Add the authorization to the header
    auth_header['Authorization'] = authorization['Authorization']

    let options = Object.assign({
      method: verb,
      headers: auth_header
    });

    return fetch(url, options).then( resp => {
      let json = resp.json();
      if (resp.ok) {
        return json
      }
      return json.then(err => {throw err});
    })
  }

  static post(stage_path, obj) {
    const verb = 'POST'
    // construct the url and path for our sample API
    const path = '/' + API_STAGE + '/' + stage_path
    const url = 'https://' + HOST + path
    console.log('url:',url)
    let credentials = {
      AccessKeyId: AWS_KEY,
      SecretKey: AWS_SECRET_KEY
    }
    let auth_date = new Date();

    let auth_header = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'dataType': 'json',
      'X-Amz-Date': auth_date.toISOString(),
      'host': HOST,
    }

    let auth_options = {
      path: path,
      method: verb,
      service: 'execute-api',
      headers: auth_header,
      region: AWS_REGION,
      body: '',
      credentials
    };


    let awsSignature = new AWSSignature();
    awsSignature.setParams(auth_options);

    const authorization = awsSignature.getAuthorizationHeader();

    // Add the authorization to the header
    auth_header['Authorization'] = authorization['Authorization']

    console.log('obj:', obj)
    let options = Object.assign({
      method: verb,
      headers: auth_header,
      body: JSON.stringify(obj)
    });

    return fetch(url, options)
      .then((response) => {
        // console.log(response, '----') 
        return response.json()})
      .then((json) => {
        // console.log('json:', json)
        return json;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export default Api