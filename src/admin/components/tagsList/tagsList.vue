<template lang="pug">
ul.tags-list-component
  li.item(v-for="(tag, ndx) in tagsArray", :key="ndx")
    tag(:title="tag")
</template>

<script>
import tag from "../tag";
export default {
  components: { tag },
  props: {
    tags: String,
  },
  computed: {
    tagsArray() {
      return this.tags.trim().split(",");
    },
  },
};
</script>

<style scoped lang="postcss">
ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}
li {
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
}
</style>