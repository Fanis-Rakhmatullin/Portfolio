<template lang="pug">
  .skill-component(v-if="!currentSkill.editMode")
    h3.title {{skill.title}}
    .percent {{skill.percent}} %
    .buttons
      icon(symbol="pencil" @click="currentSkill.editMode = true" grayscale).btn
      icon(
        symbol="trash"
        grayscale
        @click="$emit('remove', currentSkill)"
        ).btn

  .skill-component(v-else)
    h3.title
      app-input(
        noSidePaddings 
        v-model="currentSkill.title"
        :errorMessage="validation.firstError('currentSkill.title')"
        )
    .percent
      app-input(
        v-model="currentSkill.percent" 
        :errorMessage="validation.firstError('currentSkill.percent')"
        type="number" 
        min="0" max="100" 
        maxlength="3"
        )
    .buttons
      icon(symbol="tick" @click="approve").btn
      icon(symbol="cross" @click="currentSkill.editMode = false").btn
</template>

<script>
import input from "../input/input";
import icon from "../icon/icon";
import { Validator, mixin as ValidatorMixin } from 'simple-vue-validator';

export default {
  mixins: [ValidatorMixin],
  validators: {
    "currentSkill.title": value => {
      return Validator.value(value).required("Не может быть пустым")
    },
    "currentSkill.percent": value => {
      return Validator.value(value)
        .integer("Должно быть числом")
        .between(0, 100, "Некорректное значение")
        .required("Не может быть пустым")
    },
  },
  props: {
    skill: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  data() {
    return {
      currentSkill: {
        id: this.skill.id,
        title: this.skill.title,
        percent: this.skill.percent,
        category: this.skill.category,
        editMode: false,
      },
    };
  },
  components: {
    icon,
    appInput: input,
  },
  methods: {
    async approve() {
      if (await this.$validate() == false) return;
      this.$emit('approve', this.currentSkill);
    },
  },
};
</script>

<style lang="postcss" scoped src="./skill.pcss">
</style>