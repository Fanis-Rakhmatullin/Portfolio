<template lang="pug">
  card(simple)
    .reviews-wrapper(v-if="!addReview")
      .user
        user(
          :username="review.name"
          :userPicLink="review.userpic"
          :occupation="review.occupation"
        )
      .data
        .text
          p {{review.text}}
        .btns
          icon(symbol="pencil" title="Править")
          icon(symbol="cross" title="Удалить")
    .reviews-wrapper(v-else)
      square-btn(
        type="square"
        title="Добавить отзыв"
      )
</template>



<script>
import card from "../card";
import user from '../user'
import icon from "../icon";
import tagsList from "../tagsList";
import squareBtn from '../button/types/squareBtn'

export default {
components: { card, user, icon, tagsList, squareBtn },
  props: {
    review: Object,
    cover: String,
    addReview: Boolean,
  },
  // computed: {
  //   cover() {
  //     return `http://localhost:8000/${this.work.photo}`
  //   }
  // },
};
</script>



<style lang="pcss" scoped src="./reviewCard.pcss">
</style>