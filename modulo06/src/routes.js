import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Main from './pages/Main';
import User from './pages/User';
import FavoriteRepository from './pages/FavoriteRepository';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      User,
      FavoriteRepository,
    },
    {
      headerLayoutPreset: 'center',
      headerBackTitleVisible: false,
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#7159c1',
        },
        headerTintColor: '#FFF',
      },
    },
  ),
);

export default Routes;
