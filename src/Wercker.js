// @flow
import request from 'request';

const baseUrl: string = 'https://app.wercker.com/api/v3/';

type HttpMethod =
  | 'get'
  | 'post';

type dataType =
  | 'qs'
  | 'body';

type Client = {
  userName: string;
  token: string;
}

type Options = {
  url: string;
  headers: Headers;
  [data: dataType]: string | Object;
}

type Headers = {
  'Authorization': string;
  'Content-Type': string;
  'User-Agent': string;
}

module.exports = class Wercker {
  Application: Application;
  Runs: Runs;
  Workflows: Workflows;

  constructor(params: Client) {

    var headers: Headers = {
      'Authorization': `Bearer ${params.token}`,
      'Content-Type': 'application/json; charset=utf-8',
      'User-Agent': 'horie1024/wercker-client v0.0.1'
    }

    this.Application = new Application(baseUrl + `applications/${params.userName}`, headers);
    this.Runs = new Runs(baseUrl + 'runs',  headers);
    this.Workflows = new Workflows(baseUrl + 'workflows', headers);
  }
}

class Application {
  url: string;
  headers: Headers;
  constructor(url: string, headers: Headers) {
    this.url = url;
    this.headers = headers;
  }

  list(params, callback: (err: ?Object, success: ?Object) => void) {

    var options: Options = {
      url: this.url,
      headers: this.headers,
      qs: params || {}
    };

    _request('get', options, callback);
  }
}

class Runs {
  url: string;
  headers: Headers;
  constructor(url: string, headers: Headers) {
    this.url = url;
    this.headers = headers;
  }

  runList(params: Object, callback: (err: ?Object, success: ?Object) => void) {

    var options: Options = {
      url: this.url,
      headers: this.headers,
      qs: params || {}
    };

    _request('get', options, callback);
  }

  triggerRun(params: Object, callback: (err: ?Object, success: ?Object) => void) {

    var options: Options = {
      url: this.url,
      headers: this.headers,
      body: JSON.stringify(params)
    };

    _request('post', options, callback);
  }
}

class Workflows {
  url: string;
  headers: Headers;
  constructor(url: string, headers: Headers) {
    this.url = url;
    this.headers = headers;
  }

  list(params: Object, callback: (err: ?Object, success: ?Object) => void) {

    var options: Options = {
      url: this.url,
      headers: this.headers,
      qs: {applicationId: params.applicationId}
    };

    _request('get', options, callback);
  }
}

var _request = (method: HttpMethod, options: Options, callback: (err: ?Object, success: ?Object) => void) => {
  request[method](options, (err, res, body) => {
    const _body = JSON.parse(body);
    if (typeof _body.error !== 'undefined' && _body.error != null) {
      callback(_body, null);
    } else {
      callback(null, _body);
    }
  });
}
