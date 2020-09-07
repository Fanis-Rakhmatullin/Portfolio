<template lang="pug">
  .skill-add-line-component(:class="{blocked: blocked}")
    .skill-name
      app-input(
        placeholder="Новый навык"
        v-model="skill.title"
        :errorMessage="validation.firstError('skill.title')"
      )
    .skill-percent
      app-input(
        type="number" min="0" max="100" maxlength="3"
        v-model="skill.percent"
        :errorMessage="validation.firstError('skill.percent')"
        )
    .add-skill
      round-btn(type="round" @click="handleClick")
</template>

<script>
import input from "../input/input";
import button from "../button/button";
import { Validator, mixin as ValidatorMixin } from 'simple-vue-validator';

export default {
  mixins: [ValidatorMixin],
  validators: {
    "skill.title": value => {
      return Validator.value(value).required("Не может быть пустым")
    },
    "skill.percent": value => {
      return Validator.value(value)
        .integer("Должно быть числом")
        .between(0, 100, "Некорректное значение")
        .required("Не может быть пустым")
    },
  },
  props: {
    blocked: Boolean,
  },
  components: {
    appInput: input,
    roundBtn: button
  },
  data() {
    return {
      skill: {
        title: "",
        percent: ""
      }
    }
  },
  methods: {
    async handleClick() {
      if (await this.$validate() == false) return;
      this.$emit("approve", this.skill);
    }
  },  
}
</script>

<style lang="postcss" scoped src="./skillAddLine.pcss"></style>