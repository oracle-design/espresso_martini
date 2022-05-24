<script>
const CLASSES_MAP = {
  success: 'is-success',
  notice: 'is-info',
  error: 'is-danger'
}

export default {
  props: ['messageType', 'message'],

  computed: {
    mappingClasses: function() {
      return CLASSES_MAP[this.messageType]
    }
  },

  mounted: function() {
    this.$toast.open({
      type: this.mappingClasses,
      message: this.message,
      duration: 5000,
      queue: false
    })
  },

  render: h => {
    h()
  }
}
</script>
