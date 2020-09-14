/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Routes from "./src";

AppRegistry.registerComponent(appName, () => Routes);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link:({
        uri: "http://localhost:4000/graphql",
    })
  });
  
  const App = () => (
    <ApolloProvider client={client}>
      <MyRootComponent />
    </ApolloProvider>
  );
  
  AppRegistry.registerComponent('MyApplication', () => App);