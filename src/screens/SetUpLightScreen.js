import React, {Component} from 'react';
import {Text, View, Picker, TouchableOpacity} from 'react-native';
import {styles} from "../css/SetUpLightScreenStyles";
import Service from "../services/Service";
import * as firebase from 'firebase'
import {pickerNumberItem} from "../utils";

export class SetUpLightScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValueActivityType: "study",
            selectedValueHours: "0",
            selectedValueMinutes: "0",
            selectedValueEyeDisease: "no",
            userName: "",
            confirmError: undefined,
            confirmInProgress: false
        };
    }

    componentDidMount() {
        const email = this.props.navigation.getParam('email');
        firebase.database().ref('USERS_DETAILS/').on('value', function (snapshot) {
            snapshot.forEach((currentUserObj) => {
                if (currentUserObj.val().userEmail === email) {
                    this.setState({userName: currentUserObj.val().name});
                }
            });
        });
    }

    handleLightLEDs = (lightTemperature) => Service.readjustTemperature(lightTemperature, () => {});

    callbackConfirm = (flag, lightTemperature, entry) => {
        const {navigation} = this.props;
        if (flag) {
            this.setState({confirmInProgress: false});
            this.navigation.navigate('Feedback', {
                networkIP: navigation.getParam('networkIP'),
                lightTemperature: lightTemperature,
                entry: entry,
                email: navigation.getParam('email'),
                navigation
            });
            this.handleLightLEDs(lightTemperature)
        } else {
            this.setState({confirmInProgress: false, confirmError: "Something went wrong! Please try again."})
        }
    };

    handleConfirm = (activityType, hours, minutes, eyeDisease) => {
        const {navigation} = this.props;
        this.setState({confirmInProgress: true});
        Service.predictLightTemperature(navigation.getParam('networkIP'), navigation.getParam('email'), activityType, hours, minutes, eyeDisease, this.callbackConfirm);
    };

    confirmButton = () => {
        const {confirmInProgress, selectedValueActivityType, selectedValueHours, selectedValueMinutes, selectedValueEyeDisease} = this.state;
        if (confirmInProgress) {
            return <Text
                style={styles.helperTextDetails}>
                <Text style={{color: "#ff9933", fontSize: 15, fontWeight: "bold", marginLeft: 200}}>PREDICTING
                    ...</Text>
            </Text>
        } else {
            return <TouchableOpacity style={styles.confirmButton}
                                     disabled={confirmInProgress}
                                     onPress={() => {
                                         this.handleConfirm(selectedValueActivityType, selectedValueHours, selectedValueMinutes, selectedValueEyeDisease === "yes");
                                     }}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
        }
    };

    helperText = () => <View>
        <Text style={styles.helperText}>Hi
            <Text style={{fontWeight: "bold"}}> {this.state.userName}</Text>!
        </Text>
        <Text style={styles.helperTextDetails}>
            <Text style={{fontWeight: 'bold'}}>SmartLight </Text>
            helps you get a higher light quality, based on what activity you want to perform.
        </Text>
        <Text style={styles.helperTextDetails}>
            To establish the best light parameters for you, we need you to tell us
            <Text style={{color: "#ff9933", fontSize: 15, fontWeight: "bold"}}> SOME INFORMATION</Text> ...
        </Text>
    </View>;

    activityField = () => <View style={{marginLeft: 30, marginTop: 20}}>
        <Picker
            selectedValue={this.state.selectedValueActivityType}
            style={styles.picker}
            itemStyle={styles.pickerItem}
            onValueChange={(itemValue) => {
                this.setState({selectedValueActivityType: itemValue, confirmError: undefined});
            }}>
            <Picker.Item label="Study" value="study" />
            <Picker.Item label="Read" value="read" />
            <Picker.Item label="Rest" value="rest" />
            <Picker.Item label="Sleep" value="sleep" />
            <Picker.Item label="Laptop/TV" value="laptop/TV" />
            <Picker.Item label="Sport" value="sport" />
            <Picker.Item label="House Activities" value="house-activities" />
            <Picker.Item label="Friends Night at Home" value="friends-night-at-home" />
        </Picker>
    </View>;

    hoursFields = () => {
        const {selectedValueHours, selectedValueMinutes} = this.state;
        return <View style={{marginLeft: 30, marginTop: 20, flexDirection: "row"}}>
            {pickerNumberItem(selectedValueHours, styles.pickerHours, (itemValue) => {
                this.setState({selectedValueHours: itemValue, confirmError: undefined});
            }, 23)}
            {pickerNumberItem(selectedValueMinutes, styles.pickerMinutes, (itemValue) => {
                this.setState({selectedValueMinutes: itemValue, confirmError: undefined});
            }, 59)}
        </View>
    };

    eyeDiseasesField = () => <View style={{marginLeft: 30, marginTop: 20}}>
            <Picker
                selectedValue={this.state.selectedValueEyeDisease}
                style={styles.pickerEyeDiseases}
                itemStyle={styles.pickerItem}
                onValueChange={(itemValue) => {
                    this.setState({selectedValueEyeDisease: itemValue, confirmError: undefined});
                }}>
                <Picker.Item label="No" value="no" />
                <Picker.Item label="Yes" value="yes" />
            </Picker>
        </View>;

    render() {
        const { confirmError } = this.state;

        return <View style={styles.setUpLightScreen}>
            {this.helperText()}
            <Text style={styles.dropdownText}>What type of activity would you like to perform?</Text>
            {this.activityField()}
            <Text style={styles.dropdownText}>Do you have any eye diseases?</Text>
            {this.eyeDiseasesField()}
            <Text
                style={{marginTop: 30, marginLeft: 15, fontFamily: 'Bangla Sangam MN', color: "#8c8c8c", fontSize: 17}}>
                How many hours have passed since you've waked up?
            </Text>
            {this.hoursFields()}
            {this.confirmButton()}
            {confirmError ? <Text style={styles.confirmError}>{this.state.confirmError}</Text>: null}
        </View>
    }
}
