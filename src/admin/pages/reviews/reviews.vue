<template lang="pug">
 .works-page-component
  .page-content
    .container
      .page-header
        h2.page-title Блок «Отзывы»
      .form
        review-form
        //- work-form
      //- ul.cards
      //-   li.item
      //-     work-card(addWorkCard)
      //-   li.item(v-for="work in works", :key="work.id")
      //-     work-card(:work="work")
</template>



<script>
import reviewForm from '../../components/reviewForm'
export default {
  components: {reviewForm},
}
</script>

<style lang="postcss">
  
</style>