<template lang="pug">
  card(slim)
    edit-line(
      slot="title"
      v-model="categoryTitle"
      :editModeByDefault="empty"
      @remove="$emit('remove', $event)"
      )
    template(slot="content")
      ul.skills(slot="content" v-if="!empty")
        li.item(v-for="skill in skills" :key="skill.id")
          skill(
            :skill="skill"
            @remove="$emit('remove-skill', $event)"
            @approve="$emit('edit-skill', $event)"
            ) 
      .bottom-line
        skill-add-line(:blocked="empty")
</template>

<script>
import card from '../card/card'
import editLine from '../editLine/editLine'
import skill from '../skill/skill'
import skillAddLine from '../skillAddLine/skillAddLine'

const skills = [
  {id: 0, title: "HTML", percent: 80},
  {id: 1, title: "CSS", percent: 70},
  {id: 2, title: "JavaScript", percent: 45},
]

export default {
  props: {
    empty: Boolean,
    title: {
      type: String,
      default: ""
    },
    skills: {
      type: Array,
      default: () => []
    }
  },
  components: {
    card,
    editLine,
    skill,
    skillAddLine
  },
  data() {
    return {
      categoryTitle: this.title,
    }
  },
}
</script>

<style lang="postcss">
  .item {
    margin-bottom: 30px;

    /* &:last-child {
      margin-bottom: 0;
    } */
  }

  .bottom-line {
    padding-top: 70px;
    margin-top: auto;
    padding-left: 25%;
  }
</style>