import FlashMessage from '../../components/common/flash-message.vue'
import {
  mapGetters
} from 'vuex'

export default {
  name: 'basic-initializer',

  components: {
    FlashMessage
  },

  computed: {
    ...mapGetters(['flashMessages', 'currentUser'])
  },

  mounted() {
    const flashMessages = JSON.parse(this.$el.dataset.flashMessages)

    this.$store.dispatch('setFlashMessages', flashMessages)
  }
}
