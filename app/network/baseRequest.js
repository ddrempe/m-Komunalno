import Settings from '../../settings';

export default class BaseRequest {
    async fetch(options, path) {
        var authHeader = await Settings.getAuthHeader();

        if (!options.headers) {
            options.headers = {};
        };
        options.headers['Cache-Control'] = 'no-cache';
        options.headers['Accept'] = 'application/json';
        options.headers['Content-Type'] = 'application/json';
        options.headers['Cookie'] = '.ASPXAUTH=' + authHeader;
        if (options.body) {
            options.body = JSON.stringify(options.body);
        };

        var url = global.settings.API_URL + path;
        url = this.replaceUrlTags(url);

        let response = await fetch(url, options);
        return response;
    }

    async postRaw(options, path) {
        options.method = 'POST';

        let response = await this.fetch(options, path);
        return response;
    }

    async post(options, path) {
        let rawResponse = await this.postRaw(options, path);

        let body = await rawResponse.json();
        return body;
    }

    async getRaw(options, path) {
        options.method = 'GET';

        let response = await this.fetch(options, path);
        return response;
    }

    async get(options, path) {
        let rawResponse = await this.getRaw(options, path);

        let body = await rawResponse.json();
        return body;
    }

    async putRaw(options, path) {
        options.method = 'PUT';

        let response = await this.fetch(options, path);
        return response;
    }

    async put(options, path) {
        let rawResponse = await this.putRaw(options, path);

        let body = await rawResponse.json();
        return body;
    }

    replaceUrlTags(url) {
        if (url.indexOf('{connectedUserId}') != -1) {
            url = url.replace('{connectedUserId}', Settings.getConnectedUser().Id);
        };

        return url;
    }
}