import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    feedbackScreen: {
        backgroundColor: "#cce6ff",
        height: '100%'
    },
    feedbackPhaseArea: {
        marginTop: 200,
    },
    feedbackText: {
        color: "#ff9933",
        fontSize: 30,
        fontFamily: 'Bangla Sangam MN',
        marginTop: 80,
        marginLeft: 10,
        fontWeight: "bold",
        textAlign: "center"
    },

    yesButton: {
        width: 100,
        height: 38,

        alignSelf: 'center',

        paddingTop: 15,
        paddingBottom: 10,

        backgroundColor: '#ff9933',
        borderRadius: 5
    },

    yesButtonText: {
        color: '#fff',
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: -5
    },

    noButton: {
        width: 100,
        height: 38,

        alignSelf: 'center',

        paddingTop: 15,
        paddingBottom: 10,

        backgroundColor: '#f2f2f2',
        borderRadius: 5,
        marginLeft: 20,
        color: "#ff9933"
    },

    noButtonText: {
        color: '#ff9933',
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: -5
    },

    yesFeedbackPhaseArea: {
        marginTop: 200
    },

    backText: {
        fontSize: 18,
        fontFamily: 'Bangla Sangam MN',
        color: 'white',
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 290
    },

    adjustLightButton:{
        width: 100,
        height: 38,

        alignSelf: 'center',

        paddingTop: 15,
        paddingBottom: 10,

        backgroundColor: '#f2f2f2',
        borderRadius: 5,
        marginLeft: 20,
        color: "#ff9933"
    },

    backTextNoFeedback:{
        fontSize: 18,
        fontFamily: 'Bangla Sangam MN',
        color: 'white',
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 260
    },

    doneButton:{
        width: 220,
        height: 38,

        alignSelf: 'center',

        paddingTop: 15,
        paddingBottom: 10,

        backgroundColor: '#ff9933',
        borderRadius: 5
    }
});
