<template>
  <div class="card-component card_plain" v-if="simple" :class="{'slim': slim}">
    <slot name="default"></slot>
  </div>
  <div class="card-component" v-else :class="{'slim': slim}">
    <div class="header">
      <div class="text" v-text="title"></div>
      <slot name="title" v-if="!!title === false"></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "" 
    },
    simple: Boolean,
    slim: Boolean,
  }
};
</script>


<style lang="postcss" src="./card.pcss" scoped>
</style>

