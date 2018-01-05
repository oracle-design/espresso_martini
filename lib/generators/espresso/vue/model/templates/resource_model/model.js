import ModelBase from './base'

export default class <%= model_name.capitalize %> extends ModelBase {
  constructor() {
    super({ resource_type: '<%= model_name.downcase.pluralize %>' })
  }
}
