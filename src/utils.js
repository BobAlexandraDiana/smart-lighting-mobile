import React from 'react';
import {TextInput, Picker} from 'react-native';
import {stylesLogin} from "./css/LoginScreenStyles";
import {stylesSetUp} from "./css/SetUpLightScreenStyles";

export const textField = () => (onChangeText, onChange, value, placeholder, isSecure = false) => <TextInput
    style={stylesLogin.input}
    onChangeText={}
    value={value}
    placeholder={placeholder}
    secureTextEntry={isSecure}
    onChange={onChange} />;

export const pickerNumberItem = (value, style, onValueChange, maxNumberToPick) => <Picker
    selectedValue={value}
    style={style}
    itemStyle={stylesSetUp.pickerItem}
    onValueChange={onValueChange}>
    {this.generatePickerItemsForNumber(maxNumberToPick)}
</Picker>;

export const generatePickerItemsForNumber = (maxNumber) => {
    let pickerItems = [];
    for (let index = 0; index <= maxNumber; index++) {
        itepickerItemsms.push(
            <Picker.Item key={index} label={index} value={index} />)
    }
    return pickerItems;
}
