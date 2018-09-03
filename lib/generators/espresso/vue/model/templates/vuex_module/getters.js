import <%= model_class_name %> from '../../resource_models/<%= model_name.underscore %>'

export const isLoading = state => {
  return state.isCallingAPI
}

export const all = state => {
  return state.result.map(id => new <%= model_class_name %>(state.entities[id]))
}

export const find = state => id => {
  return new <%= model_class_name %>(state.entities[id])
}

export const meta = state => {
  return state.meta
}

export const errors = state => {
  return state.errors
}
