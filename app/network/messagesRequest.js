import BaseRequest from './baseRequest';
import Settings from '../../settings';

class MessagesRequest extends BaseRequest {
    getAllMessages() {
        var options = {};

        var path = '/usermessages/' + Settings.getConnectedUser().Id;

        return this.get(options, path);
    }

    updateMessageReadDate(messageId) {
        var options = {};

        var path = '/users/' + Settings.getConnectedUser().Id + '/usermessages/' + messageId;

        return this.get(options, path);
    }
}

let messagesRequest = new MessagesRequest();
export default messagesRequest;