<template lang="pug">
.works-page-component
  .page-content
    .container
      .page-header
        .page-title Блок "Работы"
      .form
        work-form
      ul.cards
        li.item(v-for="work in works", :key="work.id")
          work-card(:work="work")
</template>

<script>
import workForm from "../../components/workForm";
import workCard from "../../components/workCard";
import { mapState, mapActions } from "vuex";

export default {
  components: { workForm, workCard },
};
</script>

<style lang="pcss" scoped src="./works.pcss">
</style>