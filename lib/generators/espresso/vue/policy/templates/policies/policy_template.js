import PolicyBase from './policy_base'

export default class <%= model_name.classify %>Policy extends PolicyBase {
  constructor(user, record = null) {
    super(user, record)
  }

  index() {
    // return false
  }

  show() {
    // return false
  }

  create() {
    // return false
  }

  update() {
    // return false
  }

  destroy() {
    // return false
  }
}
