import React, { Component } from 'react';
import {StyleSheet, Input, TextIn, AsyncStorage, View, FlatList, ActivityIndicator, RadioButton, TextInput, Button, Text, Image, SafeAreaView, ScrollView} from 'react-native';

import { ApolloProvider, Query, InMemoryCache } from "react-apollo";
import ApolloClient from "apollo-boost";
import gql from 'graphql-tag';

import styles from './style.js';

import {client} from './index';

export const AppContext = React.createContext({data:{filterByUserAllAddresses:null}})

class Address extends Component{

    constructor(){  
    super()
    } 

    state = {
        stateAddress: null,
    }  
      
    componentDidMount(){
        const stateAddress = this.getPorduct();
        this.setState({
            stateAddress,
        });
       
    }
    
    getPorduct(){
        return `
        query{
            filterByUserAllAddresses(userId: 2){
                id
                type
                logr
                number
                neighborhood
                city
                state
                country
            }
        }
        `
    }

    render(){
        const { stateAddress } = this.state;
        if (!stateAddress) return null; 
        return(
        <ScrollView style={styles.scrollView}>
            <Text>Selecione o Endereço de entrega</Text>
            <ApolloProvider client={client}>
                            <Query query={gql`${stateAddress}`} >
                                {({ loading, error, data }) => {
                                    if (loading || error) return <ActivityIndicator size="large" color="#33CCff" />
                                        //console.log({...data.allCategories})
                                        var addressData = [];
                                            for (let prop in data.filterByUserAllAddresses) {
                                                addressData.push(data.filterByUserAllAddresses[prop]);
                                            }

                                        return (
                                            addressData.map(addressData => 
                                                <View numColumns={2} key={addressData.id} style={styles.categoryCont}>
                                                    <Text style={styles.text}>{addressData.type} {addressData.logr} {addressData.number} {addressData.neighborhood} {addressData.city} {addressData.state}</Text>
                                                    <Button title={'Prosseguir'} onPress={() => this.props.navigation.navigate('PaymentOpt',{productId:this.props.navigation.getParam('productId'), addressId:addressData.id})}></Button>
                                                </View>
                                                )

                                        )
                                }}
                            </Query>
                            </ApolloProvider>
                            
                            
        </ScrollView>
        )
    }
}

Address.navigationOptions = {
    headerTitleStyle: { alignSelf: 'center'},
    title: 'Address',
  }

  export default Address;