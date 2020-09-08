export default {
  namespaced: true,
  state: {
    data: [],
    editMode: false,
  },
  mutations: {
    ADD_WORK(state, newWork) {
      state.data.push(newWork);
    },
    DELETE_WORK(state, workId) {
      state.data = state.data.filter(work => work.id != workId);
    },
    EDIT_WORK(state, editedWork) {
      state.data = state.data.map(work => {
        return work.id == editedWork.id ? editedWork : work;
      })
    },
    SET_WORKS(state, works) {
      state.data = works
    },
  },
  actions: {
    async add({ commit }, newWork) {

      const formData = new FormData();

      Object.keys(newWork).forEach(item => {
        formData.append(item, newWork[item]);
      })

      try {
        const { data } = await this.$axios.post("/works", formData);
        commit("ADD_WORK", data);
      } catch (error) {
        console.log("error");
      }
    },
    async delete({ commit }, workId) {
      await this.$axios.delete(`/works/${workId}`);
      commit("DELETE_WORK", workId);

    },
    async edit({ commit }, editedWork) {

      const formData = new FormData();

      Object.keys(editedWork).forEach(item => {
        formData.append(item, editedWork[item]);
      })

      const { data } = await this.$axios.post(`/works/${editedWork.id}`, formData);
      commit("EDIT_WORK", data.work);
    },
    async fetch({ commit }) {
      try {
        const { data } = await this.$axios.get("/works/381");
        commit("SET_WORKS", data);
      } catch (error) {
        console.log("error");
      }
    }
  },
};