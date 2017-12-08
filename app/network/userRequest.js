import BaseRequest from './baseRequest';
import Settings from '../../settings';

class UserRequest extends BaseRequest {
    login(username, password) {
        var options = {
            body: {
                UserName: username,
                Password: password
            }
        };
        
        var path = '/users/login';

        return this.postRaw(options, path)
            .then((response) => {
                var cookies = response.headers.map['set-cookie'];
                cookies = ((cookies[0].split(';'))[0].split('='))[1];
                Settings.setAuthHeader(cookies);

                response.json().then((data) => {
                    Settings.setIsAdmin(data['IsAdmin'] ? '1' : '0');
                });
            });
    }

    fetchTiles() {
        var options = {};

        var path = '';
        if (Settings.getIsAdmin() == '1') {
            path = '/tiles?enabledOnly=true&availableToUserOnly=true';
        } else {
            path = '/tiles?enabledOnly=true&availableToUserOnly=false';
        };

        return this.getRaw(options, path)
            .then((response) => {
                var data = response.json().then((tiles) => {
                    tiles.map((tile) => {
                        //TODO: react native require() ne podržava dohvačanje slike preko variable
                        //potrebno je pronaći neki workaround
                        tile.IconUrl = require('../images/default.png');
                    });
                    return tiles;
                });
                return data;
            });
    }
}

let userRequest = new UserRequest();
export default userRequest;