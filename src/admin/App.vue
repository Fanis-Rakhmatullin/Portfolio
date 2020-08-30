<template lang="pug">
.app-container
  headline(title="Панель администрирования")
    user
  navigation
  .page-content
    .container
      .header
        h2.title Блок «Обо мне»
        iconed-button(
          type="iconed" 
          title="Добавить группу" 
          v-if="!emptyCatIsShown"
          @click="emptyCatIsShown = true")
      ul.skills
        li.item(v-if="emptyCatIsShown")
          category(
            empty
            @remove="emptyCatIsShown = false"
            )
        li.item(
          v-for="category in categories" 
          :key="category.id")
          category(
            :title="category.category"
            :skills="category.skills"
          )
      tag-adder(v-model="tags")
</template>

<script>
import headline from './components/headline'
import user from './components/user'
import navigation from './components/navigation'
import button from './components/button'
import category from './components/category'
import tagAdder from './components/tagAdder'

export default {
  components: {
    headline,
    user,
    navigation,
    iconedButton: button,
    category,
    tagAdder,
  },
  data() {
    return {
      category: [],
      emptyCatIsShown: false,
      tags: "one,  two, three",
    }
  },
  created() {
    this.categories = require("./data/categories.json");
  }
}
</script>

<style lang="postcss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800');
@import "normalize.css";
@import "../styles/mixins.pcss";
@import "../styles/layout/base.pcss";
</style>

<style lang="postcss" scoped src="./app.pcss"></style>
