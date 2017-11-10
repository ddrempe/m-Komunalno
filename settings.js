import {
    AsyncStorage
} from 'react-native';

require('./const');

var KEY_AUTH_HEADER = 'AUTH_HEADER';

class Settings {
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
}

let settings = new Settings();
export default settings;