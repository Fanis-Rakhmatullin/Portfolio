<template lang="pug">
  card(slim)
    edit-line(slot="title" v-model="title" editModeByDefault)
    ul.skills(slot="content")
      li.item(v-for="skill in skills" :key="skill.id")
        skill(:skill="skill") 

</template>

<script>
import card from '../card/card'
import editLine from '../editLine/editLine'
import skill from '../skill/skill'

const skills = [
  {id: 0, title: "HTML", percent: 80},
  {id: 1, title: "CSS", percent: 70},
  {id: 2, title: "JavaScript", percent: 45},
]

export default {
  components: {
    card,
    editLine,
    skill,
  },
  data() {
    return {
      title: "",
      skills,
    }
  },
}
</script>

<style lang="postcss">
  
</style>