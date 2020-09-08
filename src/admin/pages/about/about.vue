<template lang="pug">
.about-page-component
  .page-content
    .container(v-if="loading == false")
      .page-header
        h2.page-title Блок «Обо мне»
        iconed-button(
          type="iconed",
          title="Добавить группу",
          v-if="!emptyCatIsShown",
          @click="emptyCatIsShown = true"
        )
      ul.skills
        li.item(v-if="emptyCatIsShown")
          category(
            empty,
            @remove="emptyCatIsShown = false",
            @approve="createCategory"
          )
        li.item(v-for="category in categories", :key="category.id")
          category(
            :title="category.category",
            :skills="category.skills",
            @remove="removeCategory(category)",
            @approve="editCategory($event, category)",
            @createSkill="createSkill($event, category.id)",
            @edit-skill="editSkill",
            @remove-skill="removeSkill"
          )
    .container(v-else) loading...
</template>

<script>
import button from "../../components/button";
import category from "../../components/category";
import tagAdder from "../../components/tagAdder";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    iconedButton: button,
    category,
    tagAdder,
  },
  data() {
    return {
      emptyCatIsShown: false,
      loading: false,
    };
  },
  computed: {
    ...mapState("categories", {
      categories: (state) => state.data,
    }),
  },
  methods: {
    ...mapActions({
      createCategoryAction: "categories/create",
      fetchCategoriesAction: "categories/fetch",
      removeCategoryAction: "categories/remove",
      editCategoryAction: "categories/edit",
      addSkillAction: "skills/add",
      editSkillAction: "skills/edit",
      removeSkillAction: "skills/remove",
      showTooltip: "tooltips/show",
    }),
    async createCategory(categoryTitle) {
      try {
        await this.createCategoryAction(categoryTitle);
        this.emptyCatIsShown = false;
        this.showTooltip({
          text: `Категория "${categoryTitle}" создана`,
          type: "success",
        });
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error",
        });
      }
    },
    async removeCategory(category) {
      try {
        await this.removeCategoryAction(category);
        this.showTooltip({
          text: `Категория "${category.category}" удалена`,
          type: "success",
        });
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error",
        });
      }
    },
    async editCategory(newTitle, categoryToEdit) {
      try {
        categoryToEdit.category = newTitle;
        await this.editCategoryAction(categoryToEdit);
        this.showTooltip({
          text: "Категория переименована",
          type: "success",
        });
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error",
        });
      }
    },
    async createSkill(skill, categoryId) {
      try {
        const newSkill = {
          ...skill,
          category: categoryId,
        };
        await this.addSkillAction(newSkill);

        skill.title = "";
        skill.percent = "";

        this.showTooltip({
          text: `Создан новый скилл "${newSkill.title}"`,
          type: "success",
        });
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error",
        });
      }
    },
    async editSkill(skill) {
      try {
        await this.editSkillAction(skill);
        skill.editMode = false;
        this.showTooltip({
          text: "Скилл изменен",
          type: "success",
        });
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error",
        });
      }
    },
    async removeSkill(skill) {
      try {
        await this.removeSkillAction(skill);

        this.showTooltip({
          text: `Скилл "${skill.title}" удален`,
          type: "success",
        });
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error",
        });
      }
    },
    async fetchCategories() {
      try {
        this.loading = true;
        await this.fetchCategoriesAction();
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error",
        });
      } finally {
        this.loading = false;
      }
    },
  },
  created() {
    this.fetchCategories();
  },
};
</script>


<style lang="postcss" scoped src="./about.pcss"></style>
