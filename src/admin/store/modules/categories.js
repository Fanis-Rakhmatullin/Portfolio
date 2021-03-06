export default {
  namespaced: true,
  state: {
    data: [],
  },
  mutations: {
    SET_CATEGORIES: (state, categories) => (state.data = categories),
    ADD_CATEGORY: (state, category) => {
      category.skills = [];
      state.data.unshift(category);
    },
    REMOVE_CATEGORY: (state, categoryToRemove) => {
      state.data = state.data.filter(
        (category) => category.id != categoryToRemove.id
      );
    },
    EDIT_CATEGORY: (state, categoryToEdit) => {
      state.data = state.data.map((category) => {
        return category.id == categoryToEdit.id ? categoryToEdit : category;
      });
    },
    ADD_SKILL: (state, newSkill) => {
      state.data = state.data.map((category) => {
        if (category.id == newSkill.category) {
          category.skills.push(newSkill);
        }
        return category;
      });
    },
    REMOVE_SKILL: (state, skillToRemove) => {
      state.data = state.data.map((category) => {
        if (category.id == skillToRemove.category) {
          category.skills = category.skills.filter(
            (skill) => skill.id != skillToRemove.id
          );
        }
        return category;
      });
    },
    EDIT_SKILL: (state, skillToEdit) => {
      const editSkillInCategory = (category) => {
        category.skills = category.skills.map((skill) => {
          return skill.id == skillToEdit.id ? skillToEdit : skill;
        });
      };

      const findCategory = (category) => {
        if (category.id == skillToEdit.category) {
          editSkillInCategory(category);
        }

        return category;
      };

      state.data = state.data.map(findCategory);
    },
  },
  actions: {
    async create({ commit }, title) {
      try {
        const { data } = await this.$axios.post("/categories", { title });
        commit("ADD_CATEGORY", data);
      } catch (error) {
        throw new Error("Произошла ошибка");
      }
    },
    async fetch({ commit }, userId) {
      try {
        const { data } = await this.$axios.get(`/categories/${userId}`);
        commit("SET_CATEGORIES", data);
      } catch (error) {
        throw new Error("Произошла ошибка");
      }
    },
    async remove({ commit }, categoryToRemove) {
      try {
        await this.$axios.delete(`/categories/${categoryToRemove.id}`);
        commit("REMOVE_CATEGORY", categoryToRemove);
      } catch (error) {
        throw new Error("Произошла ошибка");
      }
    },
    async edit({ commit }, categoryToEdit) {
      try {
        await this.$axios.post(`/categories/${categoryToEdit.id}`, {
          title: categoryToEdit.category,
        });
        commit("EDIT_CATEGORY", categoryToEdit);
      } catch (error) {
        throw new Error("Произошла ошибка");
      }
    },
  },
};
