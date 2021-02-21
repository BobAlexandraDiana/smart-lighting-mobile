import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import * as firebase from 'firebase'

import {styles} from "../css/RegisterScreenStyle"
import {textField} from "../utils";

export class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordAgain: "",
            registerError: undefined,
            registerMessage: undefined,
        };
    }

    successCallback = (name, userEmail) => {
        this.setState({registerMessage: "You're account has been created!"});
        firebase.database().ref('USERS_DETAILS/').push({
            userEmail,
            name
        }).then(() => {
            this.setState({registerMessage: "You're account has been created!"});
        }).catch(e => {
            this.setState({registerError: "Something went wrong! Please try again!"});
        })
    };

    errorCallback = () => this.setState({registerError: "Something went wrong! Please try again!"});


    handleUserRegister = (name, email, password, successCallback, errorCallback) =>
        firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
            successCallback(name, email);
        }).catch( e => {
            errorCallback();
        });

    registerButton = () => {
        const { firstName, lastName, email, password } = this.state;
        return <TouchableOpacity style={styles.registerButton}
                                 onPress={() => {
                                     this.handleUserRegister(`${firstName} ${lastName}`, email, password, this.successCallback, this.errorCallback);
                                 }}>
            <Text style={styles.registerButtonText}>Sign up</Text>
        </TouchableOpacity>
    };

    registerFieldsHTML = () => {
        const { firstName, lastName, email, password } = this.state;
        return <View style={{marginTop: 10}}>
            {textField((text) => this.setState({firstName: text}), () => this.setState({registerError: undefined}), firstName, "First name" )}
            {textField((text) => this.setState({lastName: text}), () => this.setState({registerError: undefined}), lastName, "Last name" )}
            {textField((text) => this.setState({email: text}), () => this.setState({registerError: undefined}), email, "Email" )}
            {textField((text) => this.setState({password: text}), () => this.setState({registerError: undefined}), password, "Password", true )}
        </View>
    };

    render() {
        const { registerError, registerMessage } = this.state;

        return <View style={styles.registerScreen}>
            <Image source={require('../pictures/bulb-01.png')} style={styles.logo} />
            <Text style={styles.appName}>SmartLight</Text>
            {this.registerFieldsHTML()}
            { this.registerButton()}
            {registerError ? <Text style={styles.registerSuccess}>{registerMessage}</Text> : null}
            {registerMessage ? <Text style={styles.registerSuccess}>{this.state.registerMessage}</Text> : null}
        </View>
    }
}
