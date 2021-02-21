class Service {
    static headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };

    static constructSunsetAndSunriseForPredictServerCall(sunriseObj, sunsetObj, currentHour) {
        const sunrise = parseInt(sunriseObj, 10) + 3;
        const sunset = parseInt(sunsetObj, 10) + 15;

        const sunsetToSend = currentHour < sunset ? sunset - currentHour : currentHour - sunset;
        const sunriseToSend = currentHour < sunrise ? sunrise - currentHour : currentHour - sunrise;

        return {
            sunset: sunsetToSend,
            sunrise: sunriseToSend
        }
    }

    static predictLightTemperature(networkIP, email, activityType, hours, minutes, eyeDiseases, callbackFunction) {
        const dateObj = new Date();
        const date = dateObj.getFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getDate();
        const currentHour = dateObj.getHours();

        fetch("https://api.sunrise-sunset.org/json?lat=45.9237765&lng=22.7769816&date=" + date).then((promise) => {
            promise.json().then((data) => {
                if (!data) {
                    return;
                }

                const {sunset, sunrise} = this.constructSunsetAndSunriseForPredictServerCall(
                    data.results.sunrise.split(":")[0],
                    data.results.sunset.split(":")[0], currentHour, hours);

                fetch('http://' + networkIP + ":2020/predict-light-temp", {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({activityType, hours, sunset, sunrise, eyeDiseases, email: email.split("@")[0]}),
                }).then((data) => {
                    data.json().then((response) => {
                        callbackFunction(true, response.temperature, response.entry);
                    }).catch(e => {
                        callbackFunction(false, e, {});
                    });
                }).catch(e => {
                    callbackFunction(false, e, {});
                });
            });
        }).catch(e => {
            callbackFunction(false, e, {});
        });
    }

    static giveFeedbackAndRetrain(networkIP, email, temperature, entry) {
        fetch('http://' + networkIP + ":2020/retrain", {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({temperature, entry, email}),
        }).then(() => {
            console.log("New model was trained!")
        }).catch(e => {
            console.log("An error has occurred",e);
        });
    }

    static readjustTemperature(temperature, callbackFunction) {
        const {r,g,b} = this.colorTemperatureToRGB(temperature);
        fetch('http://172.20.10.3/?r'+r+'g'+g+'b'+b, {
            method: 'GET',
            headers: headers,
        }).then((data) => {
            data.json().then(() => {
                console.log("Temperature adjusted!");
                callbackFunction(true);
            }).catch(e => {
            });
        }).catch(e => {
            console.log("An error has occurred",e);
            callbackFunction(false);
        });
    }

    static colorTemperatureToRGB(kelvin){
        let temp = kelvin / 100;
        let red, green, blue;
        if( temp <= 66 ){
            red = 255;
            green = temp;
            green = 99.4708025861 * Math.log(green) - 161.1195681661;
            if( temp <= 19){
                blue = 0;
            } else {
                blue = temp-10;
                blue = 138.5177312231 * Math.log(blue) - 305.0447927307;
            }
        } else {
            red = temp - 60;
            red = 329.698727446 * Math.pow(red, -0.1332047592);
            green = temp - 60;
            green = 288.1221695283 * Math.pow(green, -0.0755148492 );
            blue = 255;
        }
        return {
            r : this.clamp(red,   0, 255),
            g : this.clamp(green, 0, 255),
            b : this.clamp(blue,  0, 255)
        }

    }

    static clamp( x, min, max ) {
        if(x<min){ return min; }
        if(x>max){ return max; }
        return x;
    }
}

export default Service;


