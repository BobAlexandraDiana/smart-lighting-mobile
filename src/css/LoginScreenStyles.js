import {StyleSheet} from 'react-native';

export const stylesLogin = StyleSheet.create({
    loginScreen: {
        backgroundColor: "#cce6ff",
        height: '100%'
    },

    logo: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: 90,
        height: 100,
        marginTop: 130
    },

    appName: {
        fontSize: 25,
        fontFamily: 'Bangla Sangam MN',
        color: '#ffffff',
        fontWeight: "bold",
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 15
    },

    inputsArea: {
        marginTop: 50
    },

    input: {
        height: 40,
        width: '85%',

        marginTop: 10,
        marginLeft: 30,

        backgroundColor: '#F8F8F8',

        borderColor: "#f7f7f7",
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,

        color: '#555',
        fontSize: 15,
        textAlign: 'center'
    },

    loginButton: {
        width: 180,
        height: 38,

        alignSelf: 'center',
        marginTop: 10,

        paddingTop: 15,
        paddingBottom: 10,

        backgroundColor: '#ff9933',
        borderRadius: 5
    },

    loginButtonText: {
        color: '#fff',
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: -5
    },

    registerText: {
        fontSize: 15,
        fontFamily: 'Bangla Sangam MN',
        color: '#ffffff',
        marginTop: 10,
        marginLeft: 80
    },

    errorText: {
        fontSize: 15,
        fontFamily: 'Bangla Sangam MN',
        color: '#e60000',
        marginTop: 10,
        marginLeft: 80
    }
});
