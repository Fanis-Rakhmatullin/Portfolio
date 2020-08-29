<template lang="pug">
  .skill-add-line-component(:class="{blocked: blocked}")
    .skill-name
      app-input(placeholder="Новый навык")
    .skill-percent
      app-input(type="number" min="0" max="100" maxlength="3")
    .add-skill
      round-btn(type="round")
</template>

<script>
import input from "../input/input";
import button from "../button/button";

export default {
  props: {
    blocked: Boolean,
  },
  components: {
    appInput: input,
    roundBtn: button
  }
}
</script>

<style lang="postcss" scoped src="./skillAddLine.pcss"></style>