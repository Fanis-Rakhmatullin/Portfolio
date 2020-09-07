<template lang="pug">
nav.navigation-component
  .container
    ul.list
      li.item(
        v-for="link in links", 
        :key="link.id"
        )
        router-link.link(
          :to="`/${link.alias}`"
          active-class="active"
          exact
          ) {{ link.title }}
</template>

<script>
const links = [
  {
    id: 0,
    title: "Обо мне",
    alias: "",
    active: false,
  },
  {
    id: 1,
    title: "Работы",
    alias: "works",
    active: true,
  },
  {
    id: 2,
    title: "Отзывы",
    alias: "reviews",
    active: false,
  },
];
export default {
  data() {
    return {
      links,
    };
  },
};
</script>

<style src="./navigation.pcss" scoped lang="postcss">
</style>
