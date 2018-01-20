import Settings from '../../settings';
import BaseRequest from './baseRequest';

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

    logout() {
        var options = {};

        var path = '/users/logout';

        return this.getRaw(options, path);
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

        return this.get(options, path);
    }

    changePassword(oldPassword, newPassword, repeatPassword) {
        var options = {
           body: {
               OldPassword: oldPassword,
               NewPassword: newPassword,
               RepeatPassword: repeatPassword
           }
       };

       var path = '/users/changePassword';

       return this.postRaw(options, path);
   }

   saveChanges(emailAddress, mobilePhoneNumber, sendPdfCheckbox, userId) {
        var options = {
            body: {
                Id: userId,
                Email: emailAddress,
                MobilePhone: mobilePhoneNumber,
                Ebill: sendPdfCheckbox
            }
        };

        var path = '/users/connectedUser';

        return this.put(options, path);
    }
}

let userRequest = new UserRequest();
export default userRequest;