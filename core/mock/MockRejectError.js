/**
 * Created by duy on 2018/8/17 10:28.
 */

import ErrorModel from './ErrorModel';

const errorHttpStatusCode = new Map([
  [400, 'Bad Request'],
  [401, 'Unauthorized'],
  [402, 'Payment Required'],
  [403, 'Forbidden'],
  [404, 'Not Found'],
  [405, 'Method Not Allowed'],
  [406, 'Not Acceptable'],
  [407, 'Proxy Authentication Required'],
  [408, 'Request Timeout'],
  [409, 'Conflict'],
  [410, 'Gone'],
  [411, 'Length Required'],
  [412, 'Precondition Failed'],
  [413, 'Request Entity Too Large'],
  [414, 'Request-URI Too Long'],
  [415, 'Unsupported Media Type'],
  [416, 'Requested Range Not Satisfiable'],
  [417, 'Expectation Failed'],
  [421, 'too many connections'],
  [422, 'Unprocessable Entity'],
  [424, 'Failed Dependency'],
  [425, 'Unordered Collection'],
  [426, 'Upgrade Required'],
  [449, 'Retry With'],
  [451, 'Unavailable For Legal Reasons'],
  [500, 'Internal Server Error'],
  [501, 'Not Implemented'],
  [502, 'Bad Gateway'],
  [503, 'Service Unavailable'],
  [504, 'Gateway Timeout'],
  [505, 'HTTP Version Not Supported'],
  [506, 'Variant Also Negotiates'],
  [507, 'Insufficient Storage'],
  [509, 'Bandwidth Limit Exceeded'],
  [510, 'Not Extended'],
  [600, 'Unparseable Response Headers'],
]);

export default class MockRejectError {

  constructor (config, headers, status) {
    let error = new Error(`Request failed with status code ${status}`);
    let statusText = errorHttpStatusCode.get(status) || 'Unknown Error';
    let request = {};
    let data = new ErrorModel();
    error.config = config;
    error.request = request;
    error.response = {config, headers, status, statusText, request, data};
    return error;
  }
}
