import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Service from "../services/Service";
import {styles} from "../css/FeedbackScreenStyles";

export class FeedbackScreen extends Component {
    handleRetrain = (temperature) => {
        const {navigation} = this.props;
        const networkIP = navigation.getParam('networkIP');
        const entry = navigation.getParam('entry');
        const emailList = navigation.getParam('email').split('@');
        const email = emailList[0];

        Service.giveFeedbackAndRetrain(networkIP, email, temperature, entry, this.callbackRetrainPhase);
        navigation.navigate('SetUpLight', {navigation});
    };

    callbackReadjust = (flag) => flag ? console.log("The adjustment has been performed!") : console.log("The adjustment has not been performed!");

    handleReadjustLightTemperature = (temperature) => Service.readjustTemperature(temperature, this.callbackReadjust);

    feedbackQuestions = () => <View> <Text style={styles.feedbackText}> Are you satisfied with the result? </Text>
    </View>;

    getBackText = () => "<< Back to Main Screen";

    button = (styleButton, onPress, text, styleText) => <TouchableOpacity style={style} onPress={onPress}>
        <Text style={styleText}>{text}</Text>
    </TouchableOpacity>;

    feedbackButtons = () => <View style={{flexDirection: "row", marginLeft: 100, marginTop: 20}}>
        {this.button(styles.yesButton, () => this.setState({isUserSatisfied: true}), "Yes", styles.yesButtonText)}
        {this.button(styles.noButton, () => this.setState({isUserSatisfied: true}), "No", styles.noButtonText)}
    </View>;

    askFeedback = () => <View style={styles.feedbackPhaseArea}>
        {this.feedbackQuestions()}
        <View>
            {this.feedbackButtons()}
        </View>
    </View>;

    onChangeTemperature = (colder = false) => {
        let {temperature} = this.state;
        const {navigation} = this.props;
        if (temperature) {
            this.setState({temperature: colder ? temperature - 50 : temperature + 50})
        } else {
            temperature = parseInt(navigation.getParam("lightTemperature"), 10);
            this.setState({temperature: temperature + 50})
        }
        this.handleReadjustLightTemperature(temperature)
    };

    giveFeedback() {
        const {adjustLight, temperature} = this.state;
        const {navigation} = this.props;
        if (adjustLight) {
            return <View style={{marginTop: 200}}>
                <Text style={styles.feedbackText}>Adjust your light ...</Text>
                <View style={{flexDirection: "row", marginLeft: 80, marginTop: 20}}>
                    {this.button({}, this.onChangeTemperature, "Warmer Light", styles.noButtonText)}
                    {this.button({}, () => this.onChangeTemperature(true), "Colder Light", styles.noButtonText)}
                </View>
                <View style={{marginTop: 10}}>
                    {this.button(styles.doneButton, () => temperature ? this.handleRetrain(temperature) : null, "Done!", styles.yesButtonText)}
                </View>
                {this.button({}, () => navigation.navigate('SetUpLight', {navigation}), this.getBackText(), styles.backTextNoFeedback)}
            </View>
        } else if (adjustLight === false) {
            return <View style={styles.yesFeedbackPhaseArea}>
                <Text style={styles.feedbackText}>Ok. Thank you for your feedback!</Text>
                {this.button({}, () => navigation.navigate('SetUpLight', {navigation}), this.getBackText(), styles.backText)}
            </View>
        } else {
            return <View style={{marginTop: 200}}>
                <Text style={styles.feedbackText}> Would you like to adjust your light now?</Text>
                <View style={{flexDirection: "row", marginLeft: 100, marginTop: 20}}>
                    {this.button(styles.yesButton, () => this.setState({adjustLight: true}), "Yes", styles.yesButtonText)}
                    {this.button(styles.noButton, () => this.setState({adjustLight: false}), "No", styles.noButtonText)}
                </View>
            </View>
        }
    }

    feedbackSent() {
        const {navigation} = this.props;
        return <View style={styles.yesFeedbackPhaseArea}>
            <Text style={styles.feedbackText}>Thank you for your feedback! :)</Text>
            {this.button({}, () => navigation.navigate('SetUpLight', {navigation}), this.getBackText(), styles.backText)}
        </View>
    }

    render() {
        const {isUserSatisfied} = this.state;
        let screenContent = this.askFeedback();
        if (isUserSatisfied) {
            screenContent = this.feedbackSent();
        } else if (this.state.isUserSatisfied === false) {
            screenContent = this.giveFeedback();
        }
        return <View style={styles.feedbackScreen}>
            {screenContent}
        </View>
    }
}
