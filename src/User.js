import React, { Component } from 'react';
import {StyleSheet, Input, TextIn, View, FlatList, ActivityIndicator, RadioButton, TextInput, Button, Text, Image, SafeAreaView, ScrollView} from 'react-native';

import { ApolloProvider, Query, InMemoryCache } from "react-apollo";
import ApolloClient from "apollo-boost";
import gql from 'graphql-tag';

import styles from './style.js';

import {client} from './index';

export const AppContext = React.createContext({data:{oneUser:null, oneProduct:null, oneAddress:null, oneCreditCard:null}})

class User extends Component{
    constructor(){
    super()
    } 
    state = {
        stateUser: null,

    }
    componentDidMount(){
        const stateUser = this.getUser();
        this.setState({
            stateUser,

        });
    }

    getUser(){
        return `
        query{
            oneUser(id: 1){
                id
                name
                nick
                email
            }
        }
        `
    }
    

    render(){
        const { stateUser } = this.state;
        if (!stateUser) return null; 

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
                                                <Text>Nome do Usuário</Text>
                                                    <TextInput editable={true} style={backgroundColor='#ffff33', border=3} placeholder={userData.name}></TextInput>
                                                <Text>Nick</Text>    
                                                    <TextInput editable={true} style={backgroundColor='#ffff33', border=3} placeholder={userData.nick}></TextInput>
                                                <Text>Email</Text>
                                                    <TextInput editable={true} style={backgroundColor='#ffff33', border=3} placeholder={userData.email}></TextInput>
                                                </View>
                                                )
                                        )
                                }}
                            </Query>
                            </ApolloProvider>
           
                            <Button title={'Salvar'} onPress={() => this.props.navigation.navigate('Home', {productId:this.props.navigation.getParam('ProductId'), addressId:this.props.navigation.getParam('addressId'), addressId:this.props.navigation.getParam('paymentId')})}></Button>                    
        </ScrollView>
        )
    }
}

User.navigationOptions = {
    headerTitleStyle: { alignSelf: 'center'},
    title: 'User',
  }

  export default User;