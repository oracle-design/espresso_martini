<template lang="pug">

.<%= %(#{component_path.dasherize}${name.split('::')[0..-2].map(&:dasherize).join('-')}) %>

</template>

<script>
export default {
  // components: {},

  // mixins: [],

  // props: {},

  // data() {
  //   return {}
  // },

  // computed: {},

  // created() {},

  // mounted() {},

  // methods: {}
}
</script>
