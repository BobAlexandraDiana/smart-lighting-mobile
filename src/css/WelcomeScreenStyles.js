import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    welcomeScreenStyle: {
        backgroundColor: "#cce6ff",
        height: '100%'
    },

    textWelcomeArea: {},

    welcomeMessage: {
        fontSize: 18,
        fontFamily: 'Bangla Sangam MN',
        color: '#ffffff',
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 150
    },

    appName: {
        fontSize: 25,
        fontFamily: 'Bangla Sangam MN',
        color: '#ffffff',
        fontWeight: "bold",
        flexDirection: 'row',
        alignSelf: 'center',
    },

    logo: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 20,
        width: 160,
        height: 170
    },

    tapText: {
        fontSize: 18,
        fontFamily: 'Bangla Sangam MN',
        color: 'white',
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 270
    }
});