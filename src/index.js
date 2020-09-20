import Home from './Home';
import Product from './Product';
import Filter from './Filter';
import Address from './Address';
import PaymentOpt from './PaymentOpt';
import review from './review';
import User from './User';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import ApolloClient from "apollo-boost";
import Review from './review';

export const client = new ApolloClient({ uri: 'http://192.168.0.111:4000/'});

const Routes = createAppContainer(
    createStackNavigator({
        Home: Home,
        Product: Product,
        Filter: Filter,
        Address: Address,
        PaymentOpt: PaymentOpt,
        review: review,
        User:User,
    })
);


export default Routes;