<template lang="pug">
  .tag-adder-component 
    app-input.input(
      title="Добавление тега"
      v-model="currentTags"
      @input="$emit('change', currentTags)"
      )
    ul.tags
      li.tag(
        v-for="(tag, index) in tagsArray"
        :key="`${tag}${index}`"
        v-if="tag.trim()"
      )
        tag(
          interactive
          :title="tag"
          @click="removeTag(tag)"
          )

</template>

<script>
import appInput from '../input/input'
import tag from '../tag/tag'

export default {
  components: {
    appInput,
    tag,
  },
  model: {
    prop: "tags",
    event: "change",
  },
  props: {
    tags: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      currentTags: this.tags
    }
  },
  computed: {
    tagsArray() {
      return this.tags.trim().split(',');
    },
  },
  methods: {
    removeTag(tag) {
      const tags = [...this.tagsArray];
      const tagNdx = tags.indexOf(tag);

      if (tagNdx < 0) return;

      tags.splice(tagNdx, 1);
      this.currentTags = tags.join(', ');

      this.$emit('change', this.currentTags);
    }
  }
};
</script>

<style lang="postcss" scoped>
  .tags {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
  }  

  .tag {
    margin-right: 10px;
  }
</style>

<style lang="postcss">
  .input {
    input {
      font-weight: 600;
    }
  }

  .tag {
    .tag {
      background: #F3F6F9;
      font-weight: 600;
      font-size: 15px;
      color: rgba(51, 60, 73, 0.8);
    }
  }
</style>

