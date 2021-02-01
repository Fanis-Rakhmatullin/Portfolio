export default {
  namespaced: true,
  state: {
    data: [],
  },
  mutations: {
    ADD_REVIEW(state, newWork) {
      state.data.push(newWork);
    },
    DELETE_REVIEW(state, reviewId) {
      state.data = state.data.filter((review) => review.id != reviewId);
    },
    EDIT_REVIEW(state, editedReview) {
      state.data = state.data.map((work) => {
        return work.id == editedReview.id ? editedReview : work;
      });
    },
    SET_REVIEWS(state, reviews) {
      state.data = reviews;
    },
  },
  actions: {
    async add({ commit }, newReview) {
      const formData = new FormData();

      Object.keys(newReview).forEach((item) => {
        formData.append(item, newReview[item]);
      });

      try {
        const { data } = await this.$axios.post("/reviews", formData);
        commit("ADD_REVIEW", data);
      } catch (error) {
        throw new Error("Произошла ошибка");
      }
    },
    async delete({ commit }, reviewId) {
      try {
        await this.$axios.delete(`/reviews/${reviewId}`);
        commit("DELETE_REVIEW", reviewId);
      } catch (error) {
        throw new Error("Произошла ошибка");
      }
    },
    async edit({ commit }, editedReview) {
      const formData = new FormData();

      Object.keys(editedReview).forEach((item) => {
        formData.append(item, editedReview[item]);
      });

      try {
        const { data } = await this.$axios.post(
          `/reviews/${editedReview.id}`,
          formData
        );
        commit("EDIT_REVIEW", data.review);
      } catch (error) {
        throw new Error("Произошла ошибка");
      }
    },
    async fetch({ commit }, userId) {
      try {
        const { data } = await this.$axios.get(`/reviews/${userId}`);
        commit("SET_REVIEWS", data);
      } catch (error) {
        throw new Error("Произошла ошибка");
      }
    },
  },
};
