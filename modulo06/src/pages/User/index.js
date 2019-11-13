import React, {Component} from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  Loading,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('user').name,
  });

  state = {
    stars: [],
    loading: false,
    page: 1,
    loadingMoreStareds: false,
    refreshing: false,
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });

    await this.loadStars(1);

    this.setState({
      loading: false,
    });
  }

  refreshList = async () => {
    this.setState({
      refreshing: true,
      page: 1,
      loading: true,
    });

    await this.loadStars(1);

    this.setState({
      refreshing: false,
      loading: false,
    });
  };

  loadMore = async () => {
    const {page} = this.state;
    const nextPage = page + 1;

    this.setState({
      loadingMoreStareds: true,
      page: nextPage,
    });

    await this.loadStars(nextPage);

    this.setState({
      loadingMoreStareds: false,
    });
  };

  loadStars = async page => {
    const {navigation} = this.props;
    const user = navigation.getParam('user');

    const perPage = 10;
    const {stars} = this.state;
    console.log(page);
    const response = await api.get(
      `/users/${user.login}/starred?page=${page}&per_page=${perPage}`,
    );

    if (page >= 2) {
      this.setState({
        stars: [...stars, ...response.data],
        refreshing: false,
      });
    } else {
      this.setState({
        stars: response.data,
        refreshing: false,
      });
    }
  };

  handleNavigate = repository => {
    const {navigation} = this.props;

    navigation.navigate('FavoriteRepository', {repository});
  };

  static PropTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  static PropTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  render() {
    const {navigation} = this.props;
    const {stars, loading, loadingMoreStareds, refreshing} = this.state;
    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{uri: user.avatar}} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading ? (
          <Loading />
        ) : (
          <>
            <Stars
              onRefresh={this.refreshList}
              refreshing={refreshing}
              onEndReachedThreshold={0.2} // Carrega mais itens quando chegar em 20% do fim
              onEndReached={this.loadMore} // Função que carrega mais itens
              data={stars}
              keyExtractor={star => String(star.id)}
              renderItem={({item}) => (
                <Starred onPress={() => this.handleNavigate(item)}>
                  <OwnerAvatar source={{uri: item.owner.avatar_url}} />
                  <Info>
                    <Title>{item.name}</Title>
                    <Author>{item.owner.login}</Author>
                  </Info>
                </Starred>
              )}
            />
            {loadingMoreStareds ? <Loading /> : <></>}
          </>
        )}
      </Container>
    );
  }
}
