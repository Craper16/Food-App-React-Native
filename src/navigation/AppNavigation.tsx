import React, {useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {useAppSelector} from '../redux/hooks';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthScreenStack} from './auth/AuthNavigation';
import {BottomRootStack} from './bottomRootStack/BottomNavigator';
import {Badge, Icon} from '@rneui/themed';
import {View} from 'react-native';
import OrderOverlay from '../components/orders/OrderOverlay';

export type RootStackParams = {
  AuthStack: undefined;
  BottomRootStack: undefined;
};

const RootStack = createStackNavigator<RootStackParams>();

const AppNavigation = () => {
  const isAuth = useAppSelector(state => !!state.auth.access_token);

  const [openOverlay, setOpenOverlay] = useState(false);
  const [comments, setComments] = useState('');

  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="AuthStack"
        screenOptions={{headerShown: false}}>
        {!isAuth && (
          <RootStack.Screen
            name="AuthStack"
            component={AuthScreenStack}
            options={{headerShown: false}}
          />
        )}
        {isAuth && (
          <RootStack.Screen
            options={{
              headerShown: true,
              headerTitle: 'Saad Eats',
              headerRight: () => (
                <View>
                  <Icon
                    type="material-community"
                    name="cart"
                    style={{margin: 12}}
                    onPress={() => setOpenOverlay(true)}
                  />
                  <Badge
                    status="success"
                    value={1}
                    containerStyle={{position: 'absolute', top: -6, right: 5}}
                  />
                  <OrderOverlay
                    isVisible={openOverlay}
                    toggleOverlay={() =>
                      setOpenOverlay(prevOpenOverlay => !prevOpenOverlay)
                    }
                    comments={comments}
                    onCommentTextChange={(text) => setComments(text)}
                  />
                </View>
              ),
            }}
            name="BottomRootStack"
            component={BottomRootStack}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
