import React, {Component} from 'react';
import {WebView} from 'react-native-webview';

// import { Container } from './styles';

export default class FavoriteRepository extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('repository').name,
  });

  render() {
    const {navigation} = this.props;
    const repository = navigation.getParam('repository');
    return (
      <>
        <WebView source={{uri: repository.html_url}} style={{flex: 1}} />
      </>
    );
  }
}
