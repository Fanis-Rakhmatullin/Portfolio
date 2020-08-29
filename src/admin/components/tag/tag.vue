<template lang="pug">
  .tag(:class="{interactive: interactive}")
    .span {{title}}
    button.remove(
      type="button"
      v-if="interactive"
      v-on="$listeners"
      )
      icon.icon(symbol="cross" grayscale)
</template>

<script>
import icon from '../icon/icon';

export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    interactive: Boolean,
  },
  components: {
    icon
  }
}
</script>

<style lang="postcss" scoped src="./tag.pcss"></style>