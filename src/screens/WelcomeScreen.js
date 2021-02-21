import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';

import {styles} from "../css/WelcomeScreenStyles";

const networkIP = "172.20.10.13";

export class WelcomeScreen extends Component {
    goToLogin = () => {
        const { navigation } = this.props;
        return <TouchableOpacity onPress={() => {
           navigation.navigate('Login',
                {
                    networkIP: networkIP,
                    navigation
                });
        }}>
            <Text style={styles.tapText}> Tap to continue to login...</Text>
        </TouchableOpacity>
    };

    render() {
        return <View style={styles.welcomeScreenStyle}>
            <Text style={styles.welcomeMessage}>Welcome to</Text>
            <Text style={styles.appName}>Smart Lighting</Text>}
            <Image source={require('../pictures/bulb-01.png')} style={styles.logo}/>
            {this.goToLogin}
        </View>
    }
}
