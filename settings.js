import {
    AsyncStorage
} from 'react-native';
import userRequest from './app/network/userRequest';

require('./const');

var KEY_AUTH_HEADER = 'AUTH_HEADER';

class Settings {
    async fetchAll(callback, callbackError) {
        try {
            await this.fetchSettings();
            await this.fetchUser();
            callback(this.connnectedUser);
        } catch (error) {
            callbackError(error);
        };
    }

    async fetchSettings() {
        let response = await fetch(this.getApiUrl + '/options/get');
        let body = await response.json();

        global.texts = body.Texts;
        global.dynamicData = body.DynamicData;
    }

    get getApiUrl() {
        return global.settings.API_URL;
    }

    async fetchUser() {
        let connectedUser = await userRequest.fetchConnectedUser();
        this.setConnectedUser(connectedUser);
    }

    getConnectedUser() {
        return this.connectedUser;
    }

    setConnectedUser(user) {
        this.connectedUser = user;
    }

    async getValue(key) {
        try {
            var value = await AsyncStorage.getItem(key);
            return value;
        } catch (error) {
            return null;
        }
    }

    async getAuthHeader() {
        var value = await this.getValue(KEY_AUTH_HEADER);
        return value;
    }

    async setValue(key, value) {
        try {
            await AsyncStorage.setItem(key, value);
            return true;
        } catch (error) {
            return false;
        }
    }

    setAuthHeader(value) {
        return this.setValue(KEY_AUTH_HEADER, value);
    }

    removeAuthHeader() {
        AsyncStorage.removeItem(KEY_AUTH_HEADER);
    }
}

let settings = new Settings();
export default settings;