import React, { Component } from 'react';
import {StyleSheet, Input, TextIn, View, FlatList, ActivityIndicator, RadioButton, TextInput, Button, Text, Image, SafeAreaView, ScrollView} from 'react-native';

import { ApolloProvider, Query, InMemoryCache } from "react-apollo";
import ApolloClient from "apollo-boost";
import gql from 'graphql-tag';

import styles from './style.js';

import {client} from './index';

export const AppContext = React.createContext({data:{filterByUserAllCeditCards:null}})

class PaymentOpt extends Component{
    constructor(){

    super()
    } 
    state = {
        creditCardState: null,
    }
    componentDidMount(){
        const creditCardState = this.getPorduct();
        this.setState({
            creditCardState,
        });
    }
    
    getPorduct(){
        return `
        query{
            filterByUserAllCeditCards(userId: 2){
                id
                name
                number
                dateValidade
            }
        }
        `
    }

    render(){
        const { creditCardState } = this.state;
        if (!creditCardState) return null; 
        return(
        <ScrollView style={styles.scrollView}>
            <Text>Selecione a forma de pagamento</Text>
            <ApolloProvider client={client}>
                            <Query query={gql`${creditCardState}`} >
                                {({ loading, error, data }) => {
                                    if (loading || error) return <ActivityIndicator size="large" color="#33CCff" />
                                        //console.log({...data.allCategories})
                                        var creditCardData = [];
                                            for (let prop in data.filterByUserAllCeditCards) {
                                                creditCardData.push(data.filterByUserAllCeditCards[prop]);
                                            }

                                        return (
                                            creditCardData.map(creditCardData => 
                                                <View numColumns={2} key={creditCardData.id} style={styles.categoryCont}>
                                                    <Text>Número</Text>
                                                    <Text style={styles.text}>{creditCardData.number}</Text>
                                                    <Text>Nome</Text>
                                                    <Text style={styles.text}>{creditCardData.name}</Text>
                                                    <Text>Data de Validade</Text>
                                                    <Text style={styles.text}>{creditCardData.dateValidade}</Text>
                                                    <Button title={'Revisar'} onPress={() => this.props.navigation.navigate('review', {productId:this.props.navigation.getParam('productId'), addressId:this.props.navigation.getParam('addressId'), paymentId:creditCardData.id})}></Button>
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

PaymentOpt.navigationOptions = {
    headerTitleStyle: { alignSelf: 'center'},
    title: 'PaymentOpt',
  }

  export default PaymentOpt;