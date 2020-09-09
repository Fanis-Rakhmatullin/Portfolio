<template lang="pug">
  card(simple)
    .reviews-wrapper(v-if="!addReview")
      .user
        user(
          :username="review.author"
          :userPicLink="userPicLink"
          :occupation="review.occ"
        )
      .data
        .text
          p {{review.text}}
        .btns
          icon(
            symbol="pencil"
            title="Править"
            @click="$emit('editReview', review)"
            )
          icon(
            symbol="cross" 
            title="Удалить"
            @click="$emit('deleteReview', review.id)"
            )
    .reviews-wrapper(v-else)
      square-btn(
        type="square"
        title="Добавить отзыв"
        @click="$emit('addReview')"
      )
</template>



<script>
import card from "../card";
import user from '../user'
import icon from "../icon";
import squareBtn from '../button/types/squareBtn'

export default {
components: { card, user, icon, squareBtn },
  props: {
    review: Object,
    cover: String,
    addReview: Boolean,
  },
  computed: {
    userPicLink() {
      return `https://webdev-api.loftschool.com/${this.review.photo}`
    }
  },
};
</script>



<style lang="pcss" scoped src="./reviewCard.pcss">
</style>