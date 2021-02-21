import {StyleSheet} from 'react-native';

export const stylesSetUp = StyleSheet.create({
    setUpLightScreen: {
        backgroundColor: "#cce6ff",
        height: '100%'
    },
    circleForRightMenuIcon: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: '#fff',
        alignSelf: 'center',
        marginRight: -300,
        marginTop: 30

    },
    logo: {
        width: 30,
        height: 35,
        alignSelf: 'center',
        marginRight: -300,
        marginTop: 0
    },
    picker: {
        width: 350,
        height: 44
    },

    pickerItem: {
        height: 44
    },

    pickerHours: {
        width: 170,
        height: 44,
    },

    pickerMinutes: {
        width: 170,
        height: 44,
        marginLeft: 10
    },

    pickerEyeDiseases: {
        width: 350,
        height: 44,
    },

    confirmButton: {
        width: 355,
        height: 38,

        alignSelf: 'center',
        marginTop: 35,

        paddingTop: 15,
        paddingBottom: 10,

        backgroundColor: '#ff9933',
        borderRadius: 5
    },

    confirmButtonText: {
        color: '#fff',
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: -5
    },
    helperText: {
        color: "#ff9933",
        fontSize: 30,
        fontFamily: 'Bangla Sangam MN',
        marginTop: 80,
        marginLeft: 10
    },
    helperTextDetails: {
        marginTop: 20,
        marginLeft: 10,
        fontFamily: 'Bangla Sangam MN',
        color: "#ffffff",
        fontSize: 18
    },
    dropdownText: {
        marginTop: 30,
        marginLeft: 30,
        fontFamily: 'Bangla Sangam MN',
        color: "#8c8c8c",
        fontSize: 17
    },
    confirmError:{
        fontSize: 15,
        fontFamily: 'Bangla Sangam MN',
        color: '#ff9933',
        marginTop: 10,
        marginLeft: 80
    }
});
