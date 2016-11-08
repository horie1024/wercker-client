'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request2 = require('request');

var _request3 = _interopRequireDefault(_request2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var baseUrl = 'https://app.wercker.com/api/v3/';

module.exports = function Wercker(params) {
  _classCallCheck(this, Wercker);

  var headers = {
    'Authorization': 'Bearer ' + params.token,
    'Content-Type': 'application/json; charset=utf-8',
    'User-Agent': 'horie1024/wercker-client v0.0.1'
  };

  this.Application = new Application(baseUrl + ('applications/' + params.userName), headers);
  this.Runs = new Runs(baseUrl + 'runs', headers);
  this.Workflows = new Workflows(baseUrl + 'workflows', headers);
};

var Application = function () {
  function Application(url, headers) {
    _classCallCheck(this, Application);

    this.url = url;
    this.headers = headers;
  }

  _createClass(Application, [{
    key: 'list',
    value: function list(params, callback) {

      var options = {
        url: this.url,
        headers: this.headers,
        qs: params || {}
      };

      _request('get', options, callback);
    }
  }]);

  return Application;
}();

var Runs = function () {
  function Runs(url, headers) {
    _classCallCheck(this, Runs);

    this.url = url;
    this.headers = headers;
  }

  _createClass(Runs, [{
    key: 'runList',
    value: function runList(params, callback) {

      var options = {
        url: this.url,
        headers: this.headers,
        qs: params || {}
      };

      _request('get', options, callback);
    }
  }, {
    key: 'triggerRun',
    value: function triggerRun(params, callback) {

      var options = {
        url: this.url,
        headers: this.headers,
        body: JSON.stringify(params)
      };

      _request('post', options, callback);
    }
  }]);

  return Runs;
}();

var Workflows = function () {
  function Workflows(url, headers) {
    _classCallCheck(this, Workflows);

    this.url = url;
    this.headers = headers;
  }

  _createClass(Workflows, [{
    key: 'list',
    value: function list(params, callback) {

      var options = {
        url: this.url,
        headers: this.headers,
        qs: { applicationId: params.applicationId }
      };

      _request('get', options, callback);
    }
  }]);

  return Workflows;
}();

var _request = function _request(method, options, callback) {
  _request3.default[method](options, function (err, res, body) {
    var _body = JSON.parse(body);
    if (typeof _body.error !== 'undefined' && _body.error != null) {
      callback(_body, null);
    } else {
      callback(null, _body);
    }
  });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9XZXJja2VyLmpzIl0sIm5hbWVzIjpbImJhc2VVcmwiLCJtb2R1bGUiLCJleHBvcnRzIiwicGFyYW1zIiwiaGVhZGVycyIsInRva2VuIiwiQXBwbGljYXRpb24iLCJ1c2VyTmFtZSIsIlJ1bnMiLCJXb3JrZmxvd3MiLCJ1cmwiLCJjYWxsYmFjayIsIm9wdGlvbnMiLCJxcyIsIl9yZXF1ZXN0IiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJhcHBsaWNhdGlvbklkIiwibWV0aG9kIiwiZXJyIiwicmVzIiwiX2JvZHkiLCJwYXJzZSIsImVycm9yIl0sIm1hcHBpbmdzIjoiOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTUEsVUFBa0IsaUNBQXhCOztBQTJCQUMsT0FBT0MsT0FBUCxHQUtFLGlCQUFZQyxNQUFaLEVBQTRCO0FBQUE7O0FBRTFCLE1BQUlDLFVBQW1CO0FBQ3JCLGlDQUEyQkQsT0FBT0UsS0FEYjtBQUVyQixvQkFBZ0IsaUNBRks7QUFHckIsa0JBQWM7QUFITyxHQUF2Qjs7QUFNQSxPQUFLQyxXQUFMLEdBQW1CLElBQUlBLFdBQUosQ0FBZ0JOLDZCQUEwQkcsT0FBT0ksUUFBakMsQ0FBaEIsRUFBNkRILE9BQTdELENBQW5CO0FBQ0EsT0FBS0ksSUFBTCxHQUFZLElBQUlBLElBQUosQ0FBU1IsVUFBVSxNQUFuQixFQUE0QkksT0FBNUIsQ0FBWjtBQUNBLE9BQUtLLFNBQUwsR0FBaUIsSUFBSUEsU0FBSixDQUFjVCxVQUFVLFdBQXhCLEVBQXFDSSxPQUFyQyxDQUFqQjtBQUNELENBaEJIOztJQW1CTUUsVztBQUdKLHVCQUFZSSxHQUFaLEVBQXlCTixPQUF6QixFQUEyQztBQUFBOztBQUN6QyxTQUFLTSxHQUFMLEdBQVdBLEdBQVg7QUFDQSxTQUFLTixPQUFMLEdBQWVBLE9BQWY7QUFDRDs7Ozt5QkFFSUQsTSxFQUFRUSxRLEVBQW9EOztBQUUvRCxVQUFJQyxVQUFtQjtBQUNyQkYsYUFBSyxLQUFLQSxHQURXO0FBRXJCTixpQkFBUyxLQUFLQSxPQUZPO0FBR3JCUyxZQUFJVixVQUFVO0FBSE8sT0FBdkI7O0FBTUFXLGVBQVMsS0FBVCxFQUFnQkYsT0FBaEIsRUFBeUJELFFBQXpCO0FBQ0Q7Ozs7OztJQUdHSCxJO0FBR0osZ0JBQVlFLEdBQVosRUFBeUJOLE9BQXpCLEVBQTJDO0FBQUE7O0FBQ3pDLFNBQUtNLEdBQUwsR0FBV0EsR0FBWDtBQUNBLFNBQUtOLE9BQUwsR0FBZUEsT0FBZjtBQUNEOzs7OzRCQUVPRCxNLEVBQWdCUSxRLEVBQW9EOztBQUUxRSxVQUFJQyxVQUFtQjtBQUNyQkYsYUFBSyxLQUFLQSxHQURXO0FBRXJCTixpQkFBUyxLQUFLQSxPQUZPO0FBR3JCUyxZQUFJVixVQUFVO0FBSE8sT0FBdkI7O0FBTUFXLGVBQVMsS0FBVCxFQUFnQkYsT0FBaEIsRUFBeUJELFFBQXpCO0FBQ0Q7OzsrQkFFVVIsTSxFQUFnQlEsUSxFQUFvRDs7QUFFN0UsVUFBSUMsVUFBbUI7QUFDckJGLGFBQUssS0FBS0EsR0FEVztBQUVyQk4saUJBQVMsS0FBS0EsT0FGTztBQUdyQlcsY0FBTUMsS0FBS0MsU0FBTCxDQUFlZCxNQUFmO0FBSGUsT0FBdkI7O0FBTUFXLGVBQVMsTUFBVCxFQUFpQkYsT0FBakIsRUFBMEJELFFBQTFCO0FBQ0Q7Ozs7OztJQUdHRixTO0FBR0oscUJBQVlDLEdBQVosRUFBeUJOLE9BQXpCLEVBQTJDO0FBQUE7O0FBQ3pDLFNBQUtNLEdBQUwsR0FBV0EsR0FBWDtBQUNBLFNBQUtOLE9BQUwsR0FBZUEsT0FBZjtBQUNEOzs7O3lCQUVJRCxNLEVBQWdCUSxRLEVBQW9EOztBQUV2RSxVQUFJQyxVQUFtQjtBQUNyQkYsYUFBSyxLQUFLQSxHQURXO0FBRXJCTixpQkFBUyxLQUFLQSxPQUZPO0FBR3JCUyxZQUFJLEVBQUNLLGVBQWVmLE9BQU9lLGFBQXZCO0FBSGlCLE9BQXZCOztBQU1BSixlQUFTLEtBQVQsRUFBZ0JGLE9BQWhCLEVBQXlCRCxRQUF6QjtBQUNEOzs7Ozs7QUFHSCxJQUFJRyxXQUFXLFNBQVhBLFFBQVcsQ0FBQ0ssTUFBRCxFQUFxQlAsT0FBckIsRUFBdUNELFFBQXZDLEVBQThGO0FBQzNHLG9CQUFRUSxNQUFSLEVBQWdCUCxPQUFoQixFQUF5QixVQUFDUSxHQUFELEVBQU1DLEdBQU4sRUFBV04sSUFBWCxFQUFvQjtBQUMzQyxRQUFNTyxRQUFRTixLQUFLTyxLQUFMLENBQVdSLElBQVgsQ0FBZDtBQUNBLFFBQUksT0FBT08sTUFBTUUsS0FBYixLQUF1QixXQUF2QixJQUFzQ0YsTUFBTUUsS0FBTixJQUFlLElBQXpELEVBQStEO0FBQzdEYixlQUFTVyxLQUFULEVBQWdCLElBQWhCO0FBQ0QsS0FGRCxNQUVPO0FBQ0xYLGVBQVMsSUFBVCxFQUFlVyxLQUFmO0FBQ0Q7QUFDRixHQVBEO0FBUUQsQ0FURCIsImZpbGUiOiJXZXJja2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3JlcXVlc3QnO1xuXG5jb25zdCBiYXNlVXJsOiBzdHJpbmcgPSAnaHR0cHM6Ly9hcHAud2VyY2tlci5jb20vYXBpL3YzLyc7XG5cbnR5cGUgSHR0cE1ldGhvZCA9XG4gIHwgJ2dldCdcbiAgfCAncG9zdCc7XG5cbnR5cGUgZGF0YVR5cGUgPVxuICB8ICdxcydcbiAgfCAnYm9keSc7XG5cbnR5cGUgQ2xpZW50ID0ge1xuICB1c2VyTmFtZTogc3RyaW5nO1xuICB0b2tlbjogc3RyaW5nO1xufVxuXG50eXBlIE9wdGlvbnMgPSB7XG4gIHVybDogc3RyaW5nO1xuICBoZWFkZXJzOiBIZWFkZXJzO1xuICBbZGF0YTogZGF0YVR5cGVdOiBzdHJpbmcgfCBPYmplY3Q7XG59XG5cbnR5cGUgSGVhZGVycyA9IHtcbiAgJ0F1dGhvcml6YXRpb24nOiBzdHJpbmc7XG4gICdDb250ZW50LVR5cGUnOiBzdHJpbmc7XG4gICdVc2VyLUFnZW50Jzogc3RyaW5nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIFdlcmNrZXIge1xuICBBcHBsaWNhdGlvbjogQXBwbGljYXRpb247XG4gIFJ1bnM6IFJ1bnM7XG4gIFdvcmtmbG93czogV29ya2Zsb3dzO1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogQ2xpZW50KSB7XG5cbiAgICB2YXIgaGVhZGVyczogSGVhZGVycyA9IHtcbiAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke3BhcmFtcy50b2tlbn1gLFxuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcbiAgICAgICdVc2VyLUFnZW50JzogJ2hvcmllMTAyNC93ZXJja2VyLWNsaWVudCB2MC4wLjEnXG4gICAgfVxuXG4gICAgdGhpcy5BcHBsaWNhdGlvbiA9IG5ldyBBcHBsaWNhdGlvbihiYXNlVXJsICsgYGFwcGxpY2F0aW9ucy8ke3BhcmFtcy51c2VyTmFtZX1gLCBoZWFkZXJzKTtcbiAgICB0aGlzLlJ1bnMgPSBuZXcgUnVucyhiYXNlVXJsICsgJ3J1bnMnLCAgaGVhZGVycyk7XG4gICAgdGhpcy5Xb3JrZmxvd3MgPSBuZXcgV29ya2Zsb3dzKGJhc2VVcmwgKyAnd29ya2Zsb3dzJywgaGVhZGVycyk7XG4gIH1cbn1cblxuY2xhc3MgQXBwbGljYXRpb24ge1xuICB1cmw6IHN0cmluZztcbiAgaGVhZGVyczogSGVhZGVycztcbiAgY29uc3RydWN0b3IodXJsOiBzdHJpbmcsIGhlYWRlcnM6IEhlYWRlcnMpIHtcbiAgICB0aGlzLnVybCA9IHVybDtcbiAgICB0aGlzLmhlYWRlcnMgPSBoZWFkZXJzO1xuICB9XG5cbiAgbGlzdChwYXJhbXMsIGNhbGxiYWNrOiAoZXJyOiA/T2JqZWN0LCBzdWNjZXNzOiA/T2JqZWN0KSA9PiB2b2lkKSB7XG5cbiAgICB2YXIgb3B0aW9uczogT3B0aW9ucyA9IHtcbiAgICAgIHVybDogdGhpcy51cmwsXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICBxczogcGFyYW1zIHx8IHt9XG4gICAgfTtcblxuICAgIF9yZXF1ZXN0KCdnZXQnLCBvcHRpb25zLCBjYWxsYmFjayk7XG4gIH1cbn1cblxuY2xhc3MgUnVucyB7XG4gIHVybDogc3RyaW5nO1xuICBoZWFkZXJzOiBIZWFkZXJzO1xuICBjb25zdHJ1Y3Rvcih1cmw6IHN0cmluZywgaGVhZGVyczogSGVhZGVycykge1xuICAgIHRoaXMudXJsID0gdXJsO1xuICAgIHRoaXMuaGVhZGVycyA9IGhlYWRlcnM7XG4gIH1cblxuICBydW5MaXN0KHBhcmFtczogT2JqZWN0LCBjYWxsYmFjazogKGVycjogP09iamVjdCwgc3VjY2VzczogP09iamVjdCkgPT4gdm9pZCkge1xuXG4gICAgdmFyIG9wdGlvbnM6IE9wdGlvbnMgPSB7XG4gICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgcXM6IHBhcmFtcyB8fCB7fVxuICAgIH07XG5cbiAgICBfcmVxdWVzdCgnZ2V0Jywgb3B0aW9ucywgY2FsbGJhY2spO1xuICB9XG5cbiAgdHJpZ2dlclJ1bihwYXJhbXM6IE9iamVjdCwgY2FsbGJhY2s6IChlcnI6ID9PYmplY3QsIHN1Y2Nlc3M6ID9PYmplY3QpID0+IHZvaWQpIHtcblxuICAgIHZhciBvcHRpb25zOiBPcHRpb25zID0ge1xuICAgICAgdXJsOiB0aGlzLnVybCxcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBhcmFtcylcbiAgICB9O1xuXG4gICAgX3JlcXVlc3QoJ3Bvc3QnLCBvcHRpb25zLCBjYWxsYmFjayk7XG4gIH1cbn1cblxuY2xhc3MgV29ya2Zsb3dzIHtcbiAgdXJsOiBzdHJpbmc7XG4gIGhlYWRlcnM6IEhlYWRlcnM7XG4gIGNvbnN0cnVjdG9yKHVybDogc3RyaW5nLCBoZWFkZXJzOiBIZWFkZXJzKSB7XG4gICAgdGhpcy51cmwgPSB1cmw7XG4gICAgdGhpcy5oZWFkZXJzID0gaGVhZGVycztcbiAgfVxuXG4gIGxpc3QocGFyYW1zOiBPYmplY3QsIGNhbGxiYWNrOiAoZXJyOiA/T2JqZWN0LCBzdWNjZXNzOiA/T2JqZWN0KSA9PiB2b2lkKSB7XG5cbiAgICB2YXIgb3B0aW9uczogT3B0aW9ucyA9IHtcbiAgICAgIHVybDogdGhpcy51cmwsXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICBxczoge2FwcGxpY2F0aW9uSWQ6IHBhcmFtcy5hcHBsaWNhdGlvbklkfVxuICAgIH07XG5cbiAgICBfcmVxdWVzdCgnZ2V0Jywgb3B0aW9ucywgY2FsbGJhY2spO1xuICB9XG59XG5cbnZhciBfcmVxdWVzdCA9IChtZXRob2Q6IEh0dHBNZXRob2QsIG9wdGlvbnM6IE9wdGlvbnMsIGNhbGxiYWNrOiAoZXJyOiA/T2JqZWN0LCBzdWNjZXNzOiA/T2JqZWN0KSA9PiB2b2lkKSA9PiB7XG4gIHJlcXVlc3RbbWV0aG9kXShvcHRpb25zLCAoZXJyLCByZXMsIGJvZHkpID0+IHtcbiAgICBjb25zdCBfYm9keSA9IEpTT04ucGFyc2UoYm9keSk7XG4gICAgaWYgKHR5cGVvZiBfYm9keS5lcnJvciAhPT0gJ3VuZGVmaW5lZCcgJiYgX2JvZHkuZXJyb3IgIT0gbnVsbCkge1xuICAgICAgY2FsbGJhY2soX2JvZHksIG51bGwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsYmFjayhudWxsLCBfYm9keSk7XG4gICAgfVxuICB9KTtcbn1cbiJdfQ==