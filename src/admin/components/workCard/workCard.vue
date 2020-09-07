<template lang="pug">
  card(simple)
    .works-wrapper
      .pic
        img.image(:src="cover")
        .tag
          tags-list(:tags="work.tags")
        .data
          .title {{work.title}}
          .text
            p {{work.description}}
          a.link(:href="work.link") {{work.link}}
          .btns
            icon(symbol="pencil" title="Править")
            icon(symbol="trash" title="Удалить")
</template>



<script>
import card from "../card";
import icon from "../icon";
import tagsList from "../tagsList";

export default {
components: { card, icon, tagsList },
  props: {
    work: Object,
    cover: String,
  },
  // computed: {
  //   cover() {
  //     return `http://localhost:8000/${this.work.photo}`
  //   }
  // },
};
</script>



<style lang="pcss" scoped src="./workCard.pcss">
</style>