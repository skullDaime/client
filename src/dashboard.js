import React, { Component } from 'react';
import {StyleSheet, View, ActivityIndicator, TextInput, Button, Text, Image, SafeAreaView, ScrollView} from 'react-native';

import { ApolloProvider, Query, InMemoryCache } from "react-apollo";
import ApolloClient from "apollo-boost";
import gql from 'graphql-tag';

import styles from './style.js';

import {client} from './index';

export const AppContext = React.createContext({data:{oneProduct:null}})

class Dashboard extends Component{
    constructor(){
    super()
    } 
    state = {
        stateProduct: null,
    }    
    componentDidMount(){
        const stateProduct = this.getPorduct();
        this.setState({
            stateProduct,
        });
       
    }
    
    getPorduct(){
        return `
        query{
            oneProduct(id: ${this.props.navigation.getParam('ID', 2)}){
                id
                name
                description
            }
        }
        
        `
    }

    render(){
        const { stateProduct } = this.state;
        if (!stateProduct) return null; 
        return(
        <View>
            <Text>Caio</Text>
        </View>
        )
    }
}

Dashboard.navigationOptions = {
    title: 'Dashboard',
  }

  export default Dashboard;