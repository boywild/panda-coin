/**
 * Created by duy on 2018/7/3 15:06.
 */

import DebugEngine from './DebugEngine';

export default class DebugOk extends DebugEngine {

  constructor () {
    super();
    this.printMethod = 'log';
  }
}
