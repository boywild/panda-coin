/**
 * Created by duy on 2018/8/17 10:26.
 */

import { typeOf } from '../plugins/http/Utils';

const $config = Symbol('$config');
const $headers = Symbol('$headers');
const $data = Symbol('$data');

export default class MockResolveResponse {

  constructor (config, headers) {
    this[$config] = config;
    this[$headers] = headers;
  }

  [$data];

  get status () {
    return 200;
  }

  get statusText () {
    return 'OK';
  }

  get request () {
    return {};
  }

  get headers () {
    return this[$headers];
  }

  get config () {
    return this[$config];
  }

  get data () {
    return this[$data];
  }

  set data (value) {
    if ((typeOf(value) !== 'string' && typeOf(value) !== 'boolean' && typeOf(value) !== 'number' && typeOf(value) !== 'object' && typeOf(value) !== 'array' && typeOf(value) !== 'undefined')) throw new TypeError('data类型错误');
    this[$data] = value;
  }
}
