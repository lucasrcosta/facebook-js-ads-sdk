import Api from './api'

/**
 * Isomorphic Http Promise Requests Class
 */
export default class Http {

  /**
   * Request
   * @param {string} method
   * @param {string} url
   * @param {object} [data]
   * @return {Promise}
   */
  static request (method, url, params) {
    if (method === 'GET' || method === 'DELETE') {
      url += '?' + this._encode_params(params)
    } else {
      var data = params
    }
    if (typeof window !== 'undefined' && window.XMLHttpRequest) {
      return Http.xmlHttpRequest(method, url, data)
    }
    return Http.request_promise(method, url, data)
  }

  static _encode_params (params) {
    return Object.keys(params)
      .filter((k) => params[k])
      .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&')
  }

  /**
   * XmlHttpRequest request
   * @param {string} method
   * @param {string} url
   * @param {object} [data]
   * @return {Promise}
   */
  static xmlHttpRequest (method, url, data) {
    return new Promise((resolve, reject) => {
      const request = new window.XMLHttpRequest()
      request.open(method, url)
      request.onload = function () {
        if (request.status === 200) {
          resolve(request.response)
          return
        }
        try {
          const error = JSON.parse(request.response)
          reject(error)
        } catch (e) {
          reject(request.responseText)
        }
      }
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      request.setRequestHeader('Content-Type', 'application/json')
      request.setRequestHeader('Accept', 'application/json')
      request.send(JSON.stringify(data))
    })
  }

  /**
   * Request Promise
   * @param {string} method
   * @param {string} url
   * @param {object} [data]
   * @return {Promise}
   */
  static request_promise (method, url, data) {
    const rp = require('request-promise')
    const options = {
      method: method,
      uri: url,
      json: true,
      headers: { 'User-Agent': 'Facebook-JS-Ads-SDK/' + Api.VERSION }
    }
    if (data) {
      options.body = data
    }
    return rp(options).catch((response) => { throw response.error ? response.error : response })
  }

}
