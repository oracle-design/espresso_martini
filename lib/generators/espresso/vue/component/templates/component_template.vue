<template lang="pug">

.<%= name.split('::').map(&:dasherize).join('-') %>

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
