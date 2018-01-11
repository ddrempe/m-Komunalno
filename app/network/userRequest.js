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
            });
    }

    fetchConnectedUser() {
        var options = {
            timeout: 5000
        };

        var path = '/users/connectedUser';

        return this.get(options, path);
    }

    fetchTiles() {
        var options = {};

        var path = '';
        if (Settings.getConnectedUser().IsAdmin) {
            path = '/tiles?enabledOnly=true&availableToUserOnly=true';
        } else {
            path = '/tiles?enabledOnly=true&availableToUserOnly=false';
        };

        return this.get(options, path)
            .then((response) => {
                response.map((tile) => {
                    tile.IconUrl = require('../images/default.png');

                    //TODO: react native require() ne podržava dohvačanje slike preko variable
                    //potrebno je pronaći neki workaround
                });
                return response;
            });
    }

    changePassword(oldPassword, newPassword, repeatPassword) {
        var options = {
           body: {
               OldPassword: oldPassword,
               NewPassword: newPassword,
               RepeatPassword: repeatPassword
           }           
       };

       var path = '/users/changePassword'

       return this.postRaw(options, path);
   }
}

let userRequest = new UserRequest();
export default userRequest;