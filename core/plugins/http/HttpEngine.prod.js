/**
 * Created by duy on 2018/6/20 15:38.
 */

import axios from 'axios';
import { typeOf } from './Utils';

const $baseURL = Symbol('$baseURL');
const $headers = Symbol('$headers');
const $timeout = Symbol('$timeout');
const $query = Symbol('$query');
const $path = Symbol('$path');
const $body = Symbol('$body');
const $loading = Symbol('$loading');
const $loadingTypes = Symbol('$loadingTypes');
const $mockStatusCode = Symbol('$mockStatusCode');
const $mockTimeout = Symbol('$mockTimeout');
const createInstance = Symbol('createInstance');
const requestedSever = Symbol('requestedSever');

export default class HttpEngine {

  [$baseURL] = '';

  [$headers] = {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  };

  [$timeout] = 10000;

  [$query] = {};

  [$path] = '';

  [$body] = undefined;

  [$loading] = true;
  
  [$loadingTypes] = ['normal', 'bounce', 'loader', 'square'];

  [$mockStatusCode] = 200;

  [$mockTimeout] = 3000;

  [requestedSever] = false;

  /**
   * @param value {String}
   * */
  set baseURL (value) {
    if (typeOf(value) !== 'string') throw new TypeError('baseURL类型应为String');
    this[$baseURL] = value;
  }

  /**
   * @param value {Object}
   * */
  set headers (value) {
    if (typeOf(value) !== 'object') throw new TypeError('headers类型应为Object');
    Object.assign(this[$headers], value);
  }

  /**
   * @param value {Number}
   * */
  set timeout (value) {
    if (typeOf(value) !== 'number') throw new TypeError('timeout类型应为Number');
    this[$timeout] = value * 1000;
  }

  /**
   * @param value {Object}
   * */
  set query (value) {
    if (typeOf(value) !== 'object') throw new TypeError('query类型应为Object');
    for (let [key, val] of Object.entries(value)) {
      this[$query][key] = val === '' ? undefined : val
    }
  }

  /**
   * @param value {String}
   * */
  set path (value) {
    if (typeOf(value) !== 'string') throw new TypeError('path类型应为String');
    this[$path] = value;
  }

  /**
   * @param value {String|Number|Object}
   * */
  set body (value) {
    if (typeOf(value) !== 'string' && typeOf(value) !== 'array' && typeOf(value) !== 'number' && typeOf(value) !== 'object') throw new TypeError('body类型支持String、Number、Object、Array');
    this[$body] = value;
  }
  /**
   * 设置是否loading
   *
   * @memberof HttpEngine
   */
  set loading (value) { 
    if (typeOf(value) !== 'boolean' && typeOf(value) !== 'string' && typeOf(value) !== 'object') throw new TypeError('loading类型应为Boolean、String、Object');
    if (typeOf(value) === 'string' && !this[$loadingTypes].includes(value)) {
      throw new TypeError(`loading类型为String时，应传入${this[$loadingTypes].join('、')}中的一种`);
    }
    this[$loading] = value;
  }
  /**
   * @param value {Number}
   * */
  set mockStatusCode (value) {
    if (!Number.isInteger(value)) throw new TypeError('mockStatusCode类型应为Integer');
    this[$mockStatusCode] = value;
  }

  /**
   * @param value {Number}
   * */
  set mockTimeout (value) {
    if (!Number.isInteger(value)) throw new TypeError('mockTimeout类型应为Integer');
    this[$mockTimeout] = value * 1000;
  }

  /**
   * @param value {Boolean}
   * */
  set requestedSever (value) {
    if (typeOf(value) !== 'boolean') throw new TypeError('isRequestSever类型应为Boolean');
    this[requestedSever] = value;
  }

  [createInstance] () {
    let instance = axios.create({
      baseURL: this[$baseURL],
      timeout: this[$timeout],
      headers: this[$headers],
      loading: this[$loading]
    });
    instance.interceptors.request.use(
      config => {
        this.beforeSendRequestHandler(config);
        return config;
      },
      error => Promise.reject(error)
    );
    instance.interceptors.response.use(
      response => {
        this.afterResolveResponseHandler(response);
        return response;
      },
      error => {
        this.afterRejectResponseHandler(error);
        return Promise.reject(error);
      }
    );
    return instance;
  }

  /**
   * @description GET请求
   * @return Promise
   * */
  get () {
    return this[createInstance]().get(this[$path], {params: this[$query]});
  }

  /**
   * @description DELETE请求
   * @return Promise
   * */
  delete () {
    return this[createInstance]().delete(this[$path], {params: this[$query]});
  }

  /**
   * @description POST请求
   * @return Promise
   * */
  post () {
    return this[createInstance]().post(this[$path], this[$body], {params: this[$query]});
  }

  /**
   * @description PUT请求
   * @return Promise
   * */
  put () {
    return this[createInstance]().put(this[$path], this[$body], {params: this[$query]});
  }

  /**
   * @description PATCH请求
   * @return Promise
   * */
  patch () {
    return this[createInstance]().patch(this[$path], this[$body], {params: this[$query]});
  }

  /**
   * @description 发送请求之前的勾子
   * @param config {Object}
   * */
  beforeSendRequestHandler (config) {}

  /**
   * @description 成功应答的勾子
   * @param response {Object}
   * */
  afterResolveResponseHandler (response) {}

  /**
   * @description 错误应答的勾子
   * @param error {Object}
   * */
  afterRejectResponseHandler (error) {}
}
