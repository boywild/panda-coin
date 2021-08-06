import validate from 'utils/validate'
export default {
  bind (el) {
    let input = el.nodeName === 'INPUT' ? el : el.querySelector('input')
    if (input.nodeName !== 'INPUT' || !validate.isIOS()) return
    function dealFixedInput () {
      let body = document.querySelector('body')
      'scrollTop' in body ? body.scrollTop = 0 : body.scrollTo(body.scrollX, 0)
    }
    el._input_ = input
    el._dealFixedInput_ = dealFixedInput
    input.addEventListener('blur', dealFixedInput)
    input.addEventListener('focus', (e)=>{
      input.scrollIntoView(true);
    })
  },
  unbind (el) {
    delete el._dealFixedInput_
    delete el._input_
  }
}