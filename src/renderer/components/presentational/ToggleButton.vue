<template>
  <v-btn small depressed :color="buttonColor" @click="onClick">
    <span v-if="isOn">{{ onMessage }}</span>
    <span v-if="!isOn">{{ offMessage }}</span>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    onMessage: {
      type: String,
      default: 'On',
    },
    offMessage: {
      type: String,
      default: 'Off',
    },
    initialState: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return { isOn: this.initialState }
  },
  computed: {
    buttonColor() {
      if (this.isOn) {
        return 'warning'
      } else {
        return 'primary'
      }
    },
  },
  methods: {
    onClick() {
      this.isOn = !this.isOn
      this.$emit('buttonClicked', this.isOn)
    },
  },
})
</script>
