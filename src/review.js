import React, { Component } from 'react';
import {StyleSheet, Input, TextIn, View, FlatList, ActivityIndicator, RadioButton, TextInput, Button, Text, Image, SafeAreaView, ScrollView} from 'react-native';

import { ApolloProvider, Query, InMemoryCache } from "react-apollo";
import ApolloClient from "apollo-boost";
import gql from 'graphql-tag';

import styles from './style.js';

import {client} from './index';

export const AppContext = React.createContext({data:{oneUser:null, oneProduct:null, oneAddress:null, oneCreditCard:null}})

class Review extends Component{
    constructor(){
    super()
    } 
    state = {
        stateUser: null,
        stateProduct: null,
        creditCardState: null,
        stateAddress: null,
    }
    componentDidMount(){
        const stateUser = this.getUser();
        const stateProduct = this.getPorduct();
        const creditCardState = this.getCreditCard();
        const stateAddress = this.getAddress();
        this.setState({
            stateUser,
            stateProduct,
            creditCardState,
            stateAddress,
        });
    }

    getUser(){
        return `
        query{
            oneUser(id: 2){
                id
                name
            }
        }
        `
    }
    
    getPorduct(){
        return `
        query{
            oneProduct(id: ${this.props.navigation.getParam('productId')}){
                id
                name
                description
            }
        }
        `
    }

    getCreditCard(){
        return `
        query{
            oneCreditCard(id: ${this.props.navigation.getParam('paymentId')}){
                id
                name
                number
                dateValidade
            }
        }
        `
    }

    getAddress(){
        return `
        query{
            oneAddress(id: ${this.props.navigation.getParam('addressId')}){
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
        const { stateUser } = this.state;
        if (!stateUser) return null; 

        const { stateProduct } = this.state;
        if (!stateProduct) return null; 

        const { creditCardState } = this.state;
        if (!creditCardState) return null; 

        const { stateAddress } = this.state;
        if (!stateAddress) return null; 
        return(
        <ScrollView style={styles.scrollView}>
            {/*User */}
            <ApolloProvider client={client}>
                            <Query query={gql`${stateUser}`} >
                                {({ loading, error, data }) => {
                                    if (loading || error) return <ActivityIndicator size="large" color="#33CCff" />
                                        var userData = [];
                                            for (let prop in data.oneUser) {
                                                userData.push(data.oneUser[prop]);
                                            }

                                        return (
                                            userData.map(userData => 
                                                <View key={userData.id} style={styles.categoryCont}>
                                                    <Text style={styles.categoryText}>{userData.name}</Text>
                                                </View>
                                                )
                                        )
                                }}
                            </Query>
                            </ApolloProvider>
            {/*Product */}
            <ApolloProvider client={client}>
                            <Query query={gql`${stateProduct}`} >
                                {({ loading, error, data }) => {
                                    if (loading || error) return <ActivityIndicator size="large" color="#33CCff" />
                                        //console.log({...data.allCategories})
                                        var productData = [];
                                            for (let prop in data.oneProduct) {
                                                productData.push(data.oneProduct[prop]);
                                            }

                                        return (
                                            productData.map(productData => 
                                                <View key={productData.id} style={styles.categoryCont}>
                                                    <Image style={styles.categoryImage} source={{uri: 'https://amazonasatual.com.br/wp-content/uploads/2014/10/supermercado.jpg'}}></Image>
                                                    <Text style={styles.categoryText}>{productData.name}</Text>
                                                    <Text style={styles.Text}>{productData.description}</Text>
                                                    <TextInput style={{width:60, borderColor:'gray'}} keyboardType={"number-pad"}></TextInput>
                                                </View>
                                                )

                                        )
                                }}
                            </Query>
                            </ApolloProvider>

                            {/*Address */}
                            <ApolloProvider client={client}>
                            <Query query={gql`${stateAddress}`} >
                                {({ loading, error, data }) => {
                                    if (loading || error) return <ActivityIndicator size="large" color="#33CCff" />
                                        //console.log({...data.allCategories})
                                        var addressData = [];
                                            for (let prop in data.oneAddress) {
                                                addressData.push(data.oneAddress[prop]);
                                            }

                                        return (
                                            addressData.map(addressData => 
                                                <View numColumns={2} key={addressData.id} style={styles.categoryCont}>
                                                    <Text style={styles.text}>{addressData.type} {addressData.logr} {addressData.number} {addressData.neighborhood} {addressData.city} {addressData.state}</Text>
                                                </View>
                                                )

                                        )
                                }}
                            </Query>
                            </ApolloProvider>
                            {/*Payment */}
                            <ApolloProvider client={client}>
                            <Query query={gql`${creditCardState}`} >
                                {({ loading, error, data }) => {
                                    if (loading || error) return <ActivityIndicator size="large" color="#33CCff" />
                                        //console.log({...data.allCategories})
                                        var creditCardData = [];
                                            for (let prop in data.oneCreditCard) {
                                                creditCardData.push(data.oneCreditCard[prop]);
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
                                                </View>
                                                )
                                        )
                                }}
                            </Query>
                            </ApolloProvider>
                            <Button title={'Finalizar'} onPress={() => this.props.navigation.navigate('review', {productId:this.props.navigation.getParam('ProductId'), addressId:this.props.navigation.getParam('addressId'), addressId:this.props.navigation.getParam('paymentId')})}></Button>                    
        </ScrollView>
        )
    }
}

Review.navigationOptions = {
    headerTitleStyle: { alignSelf: 'center'},
    title: 'Review',
  }

  export default Review;