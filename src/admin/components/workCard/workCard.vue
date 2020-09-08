<template lang="pug">
  card(simple)
    .works-wrapper(v-if="!addWorkCard")
      .pic
        img.image(:src="cover")
        .tag
          tags-list(:tags="work.techs")
      .data
        .title {{work.title}}
        .text
          p {{work.description}}
        a.link(:href="work.link") {{work.link}}
        .btns
          icon(
            symbol="pencil"
            title="Править"
            @click="$emit('editWork', work)"
            )
          icon(
            symbol="cross"
            title="Удалить"
            @click="$emit('deleteWork', work.id)"
            )
    .works-wrapper(v-else)
      square-btn(
        type="square"
        title="Добавить работу"
        @click="$emit('addWork')"
      )
</template>



<script>
import card from "../card";
import icon from "../icon";
import tagsList from "../tagsList";
import squareBtn from '../button/types/squareBtn'

export default {
components: { card, icon, tagsList, squareBtn },
  props: {
    work: Object,
    addWorkCard: Boolean,
  },
  computed: {
    cover() {
      return `https://webdev-api.loftschool.com/${this.work.photo}`
    }
  },
};
</script>



<style lang="pcss" scoped src="./workCard.pcss">
</style>