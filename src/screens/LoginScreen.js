import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import * as firebase from 'firebase'

import {styles} from "../css/LoginScreenStyles"
import {textField} from "../utils";

export class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            loginError: undefined,
            loginInProgress: false
        };
    }

    handleUserLogin = (userEmail, password) => {
        const {navigation} = this.props;
        firebase.auth().signInWithEmailAndPassword(userEmail, password).then(() => {
            this.setState({loginInProgress: false});
            navigation.navigate('SetUpLight', {
                email: this.state.email,
                networkIP: navigation.getParam('networkIP'),
                navigation
            });
        }).catch(e => {
            this.setState({loginInProgress: false, loginError: "There was a problem! Please try again!"});
        });
    };

   registerLink = () => {
        const {navigation} = this.props;
        return <TouchableOpacity onPress={() => {
            navigation.navigate('Register', {navigation});
        }}>
            <Text style={styles.registerText}>Don't you have an account?<Text style={{color: "#ff9933"}}>Sign up here!</Text></Text>
        </TouchableOpacity>
    };

    loginButton = () => {
        const { loginInProgress, email, password } = state;
        return <TouchableOpacity style={styles.loginButton}
                                 onPress={() => {
                                     this.setState({loginInProgress: true});
                                     this.handleUserLogin(email, password);
                                 }}>
            <Text style={styles.loginButtonText}>{loginInProgress ? "Logging in..." : "Login"}</Text>
        </TouchableOpacity>
    };

    loginFields = () => {
        const { email, password } = this.state;
        return <View style={styles.inputsArea}>
            {textField((text) => this.setState({email: text}), () => this.setState({loginError: undefined}), email, "Email" )}
            {textField((text) => this.setState({password: text}),() => this.setState({loginError: undefined}), password, "Password" )}
        </View>
    };

    render() {
        const { loginError } = this.state;

        return <View style={styles.loginScreen}>
            <Image source={require('../pictures/bulb-01.png')} style={styles.logo} />
            <Text style={styles.appName}>SmartLight</Text>
            {this.loginFields()}
            {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}
            {this.loginButton()}
            {this.registerLink()}
        </View>
    }
}
