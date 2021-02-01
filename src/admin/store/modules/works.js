export default {
  namespaced: true,
  state: {
    data: [],
  },
  mutations: {
    ADD_WORK(state, newWork) {
      state.data.push(newWork);
    },
    DELETE_WORK(state, workId) {
      state.data = state.data.filter((work) => work.id != workId);
    },
    EDIT_WORK(state, editedWork) {
      state.data = state.data.map((work) => {
        return work.id == editedWork.id ? editedWork : work;
      });
    },
    SET_WORKS(state, works) {
      state.data = works;
    },
  },
  actions: {
    async add({ commit }, newWork) {
      const formData = new FormData();

      Object.keys(newWork).forEach((item) => {
        formData.append(item, newWork[item]);
      });

      try {
        const { data } = await this.$axios.post("/works", formData);
        commit("ADD_WORK", data);
      } catch (error) {
        throw new Error("Произошла ошибка");
      }
    },
    async delete({ commit }, workId) {
      try {
        await this.$axios.delete(`/works/${workId}`);
        commit("DELETE_WORK", workId);
      } catch (error) {
        throw new Error("Произошла ошибка");
      }
    },
    async edit({ commit }, editedWork) {
      const formData = new FormData();

      Object.keys(editedWork).forEach((item) => {
        formData.append(item, editedWork[item]);
      });

      try {
        const { data } = await this.$axios.post(
          `/works/${editedWork.id}`,
          formData
        );
        commit("EDIT_WORK", data.work);
      } catch (error) {
        throw new Error("Произошла ошибка");
      }
    },
    async fetch({ commit }, userId) {
      try {
        const { data } = await this.$axios.get(`/works/${userId}`);
        commit("SET_WORKS", data);
      } catch (error) {
        throw new Error("Произошла ошибка");
      }
    },
  },
};
