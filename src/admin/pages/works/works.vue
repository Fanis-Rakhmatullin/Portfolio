<template lang="pug">
.works-page-component
  .page-content
    .container
      .page-header
        h2.page-title Блок «Работы»
      .form(v-if="addMode" :key='renderer')
        work-form(
        :editExistedWork="editExistedWork"
        :workToEdit="workToEdit"
        @clearForm="changeCurrentMode('closeForm')"
        )
      ul.cards
        li.item
          work-card(
            addWorkCard
            @addWork="changeCurrentMode('addNewWork')"
            )
        li.item(v-for="work in works", :key="work.id")
          work-card(
            :work="work"
            @deleteWork="deleteCurrentWork"
            @editWork="editCurrentWork"
            )
</template>

<script>
import workForm from "../../components/workForm";
import workCard from "../../components/workCard";
import { mapState, mapActions } from "vuex";
import store from "../../store";

export default {
  components: { workForm, workCard },
  data() {
    return {
      addMode: false,
      editExistedWork: false,
      workToEdit: {},
      renderer: 1,
    };
  },
  computed: {
    ...mapState("works", {
      works: (state) => state.data,
    }),
  },
  methods: {
    ...mapActions({
      fetchWorks: "works/fetch",
      deleteWork: "works/delete",
      showTooltip: "tooltips/show",
    }),
    changeCurrentMode(status) {
      switch(status) {
        case 'addNewWork':
          this.renderer += 1;
          this.addMode = true;
          this.editExistedWork = false;
          break;
        case 'editExistedWork':
          this.addMode = true;
          this.editExistedWork = true;
          break;
        case 'closeForm':
          this.renderer += 1;
          this.addMode = false;
          this.editExistedWork = false;
          break;
      }
    },
    deleteCurrentWork(workId) {
      try {
        this.deleteWork(workId);
        this.showTooltip({
          text: `Работа удалена`,
          type: "success",
        });
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error",
        });
      }
    },
    editCurrentWork(work) {
      this.renderer += 1;
      this.workToEdit = { ...work };
      this.editExistedWork = true;
      this.addMode = true;
    }
  },
  mounted() {
    this.fetchWorks(store.getters["user/getUserId"]);
  },
};
</script>

<style lang="postcss" scoped src="./works.pcss">
</style>