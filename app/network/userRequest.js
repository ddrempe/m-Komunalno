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
}

let userRequest = new UserRequest();
export default userRequest;