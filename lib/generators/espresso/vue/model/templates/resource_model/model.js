import ResourceModelBase from 'odd-resource_model'

const OPTIONS = {
  apiPath: '/api',
  apiVersion: 'v1',
  scope: 'web',
  resourceType: '<%= resource_type %>',
  attributes: ['id', 'created_at', 'updated_at'],
  editableAttributes: []
}

export default class <%= model_class_name %> {
  constructor(attributes = {}) {
    super(OPTIONS, attributes)
  }

  // extra methods or helpers here...
}
