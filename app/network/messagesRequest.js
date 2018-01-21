import BaseRequest from './baseRequest';

class MessagesRequest extends BaseRequest {
    getAllMessages() {
        var options = {};

        var path = '/usermessages/{connectedUserId}';

        return this.get(options, path);
    }

    updateMessageReadDate(messageId) {
        var options = {};

        var path = '/users/{connectedUserId}/usermessages/' + messageId;

        return this.get(options, path);
    }
}

let messagesRequest = new MessagesRequest();
export default messagesRequest;