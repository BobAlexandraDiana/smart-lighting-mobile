import React from 'react';

import {createStackNavigator, createAppContainer} from 'react-navigation';

import * as firebase from 'firebase'

import { WelcomeScreen } from "./src/screens/WelcomeScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import { SetUpLightScreen } from "./src/screens/SetUpLightScreen";
import { FeedbackScreen } from "./src/screens/FeedbackScreen";
import { RegisterScreen } from './src/screens/RegisterScreen';

const AppNavigator = createAppContainer(
    createStackNavigator(
        {
            Home: {
                screen: WelcomeScreen
            },
            Login: {
                screen: LoginScreen
            },
            SetUpLight: {
                screen: SetUpLightScreen
            },
            Feedback: {
                screen: FeedbackScreen
            },
            Register: {
                screen: RegisterScreen
            }
        },
        {
            headerMode: 'none',
        }
    )
);

export default class App extends React.Component {
    componentWillMount()
    {
        const config = {
            apiKey: "AIzaSyBmUqpoJ9mefhlzQWEdTZiTjKqeTmplJQk",
            authDomain: "smartlighting-4466b.firebaseapp.com",
            databaseURL: "https://smartlighting-4466b.firebaseio.com",
            projectId: "smartlighting-4466b",
            storageBucket: "smartlighting-4466b.appspot.com",
            messagingSenderId: "513541707303",
        };
        firebase.initializeApp(config);
    }
    render()
    {
        return <AppNavigator/>;

    }
}

