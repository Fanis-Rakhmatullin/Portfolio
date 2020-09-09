<template lang="pug">
.works-page-component
  .page-content
    .container
      .page-header
        h2.page-title Блок «Отзывы»
      .form(v-if="addMode" :key='renderer')
        review-form(
          :editExistedReview="editExistedReview",
          :reviewToEdit="reviewToEdit",
          @clearForm="changeCurrentMode('closeForm')"
        )
      ul.cards
        li.item
          review-card(
            addReview,
            @addReview="changeCurrentMode('addNewReview')"
          )
        li.item(v-for="review in reviews", :key="review.id")
          review-card(
            :review="review",
            @deleteReview="deleteCurrentReview",
            @editReview="editCurrentReview"
          )
</template>



<script>
import reviewForm from "../../components/reviewForm";
import reviewCard from "../../components/reviewCard";
import { mapState, mapActions } from "vuex";
export default {
  components: { reviewForm, reviewCard },
  data() {
    return {
      addMode: false,
      editExistedReview: false,
      reviewToEdit: {},
      renderer: 1,
    };
  },
  computed: {
    ...mapState("reviews", {
      reviews: (state) => state.data,
    }),
  },
  methods: {
    ...mapActions({
      fetchReviews: "reviews/fetch",
      deleteReview: "reviews/delete",
      showTooltip: "tooltips/show",
    }),
    changeCurrentMode(status) {
      switch (status) {
        case "addNewReview":
          this.renderer += 1;
          this.addMode = true;
          this.editExistedReview = false;
          break;
        case "editExistedReview":
          this.addMode = true;
          this.editExistedReview = true;
          break;
        case "closeForm":
          this.renderer += 1;
          this.addMode = false;
          this.editExistedReview = false;
          break;
      }
    },
    deleteCurrentReview(reviewId) {
      try {
        this.deleteReview(reviewId);
        this.showTooltip({
          text: `Отзыв удален`,
          type: "success",
        });
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error",
        });
      }
    },
    editCurrentReview(review) {
      this.renderer += 1;
      this.reviewToEdit = { ...review };
      this.editExistedReview = true;
      this.addMode = true;
    },
  },
  mounted() {
    this.fetchReviews();
  },
};
</script>

<style lang="postcss" scoped src="./reviews.pcss">
</style>