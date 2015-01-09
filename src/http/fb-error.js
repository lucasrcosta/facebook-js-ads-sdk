(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.FbApiAssets.http.FbError = factory();
  }
}(this, function() {
  'use strict';

  /**
   * Facebook request error
   * @param {object} error  error data from facebook
   * @param {object} [req]  xml http request data
   */
  function FbError(error, req) {
    var message = error.error_user_msg ? error.error_user_msg : error.message;
    var _this = new Error(message);

    _this.type = error.type;
    _this.code = error.code;
    _this.error_subcode = error.error_subcode;
    if (error.error_user_title)
      _this.error_user_title = error.error_user_title;
    if (error.error_user_msg)
      _this.error_user_msg = error.error_user_msg;
    if (req) {
      _this.status = req.status;
      _this.statusText = req.statusText;
    }

    return _this;
  }

  return FbError;
}));
