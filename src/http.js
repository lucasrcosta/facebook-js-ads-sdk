import Api from './api'

/**
 * Isomorphic Http Promise Requests Class
 */
export default class Http {

  /**
   * Request
   * @param   {String}  method
   * @param   {String}  url
   * @param   {Object}  [data]
   * @return  {Promise}
   */
  static request (method, url, data) {
    if (typeof window !== 'undefined' && window.XMLHttpRequest) {
      return Http.xmlHttpRequest(method, url, data)
    }
    return Http.requestPromise(method, url, data)
  }

  /**
   * XmlHttpRequest request
   * @param   {String}  method
   * @param   {String}  url
   * @param   {Object}  [data]
   * @return  {Promise}
   */
  static xmlHttpRequest (method, url, data) {
    return new Promise((resolve, reject) => {
      const request = new window.XMLHttpRequest()
      request.open(method, url)
      request.onload = function () {
        try {
          const response = JSON.parse(request.response)

          if (request.status === 200) {
            resolve(response)
          } else {
            reject({
              body: response,
              status: request.status
            })
          }
        } catch (e) {
          reject({
            body: request.responseText,
            status: request.status
          })
        }
      }
      request.setRequestHeader('Content-Type', 'application/json')
      request.setRequestHeader('Accept', 'application/json')
      request.send(JSON.stringify(data))
    })
  }

  /**
   * Request Promise
   * @param   {String}  method
   * @param   {String}  url
   * @param   {Object}  [data]
   * @return  {Promise}
   */
  static requestPromise (method, url, data) {
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
    return rp(options).catch((response) => {
      response = {
        body: response.error ? response.error : response,
        status: response.statusCode
      }
      throw response
    })
  }

}
