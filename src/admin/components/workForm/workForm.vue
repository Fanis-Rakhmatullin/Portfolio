<template lang="pug">
.form-component
  form.form(@submit.prevent="handleSubmit")
    card(title="Добавление работы")
      .form-container(slot="content")
        .form-cols
          .form-col
            label.uploader(
              :style="{ backgroundImage: `url(${newWork.preview})` }",
              :class="[{ active: newWork.preview }, { hovered: hovered }]",
              @dragover="handleDragOver",
              @dragleave="hovered = false",
              @drop="handleChange"
            )
              .uploader-title Перетащите или загрузите картинку
              .uploader-btn
                app-button(typeAttr="file", @change="handleChange")

          .form-col
            .form-row
              app-input(v-model="newWork.title", title="Название")
            .form-row
              app-input(v-model="newWork.link", title="Ссылка") 
            .form-row
              app-input(
                v-model="newWork.description",
                field-type="textarea",
                title="Описание"
              )
            .form-row
              tag-adder(v-model="newWork.tags")
        .form-btns
          .btn
            app-button(title="Отмена", plain)
          .btn
            app-button(title="Сохранить")
</template>

<script>
import card from "../card";
import appButton from "../button";
import appInput from "../input";
import tagAdder from "../tagAdder";
import { mapActions } from "vuex";

export default {
  components: { card, appButton, appInput, tagAdder },
  data() {
    return {
      hovered: false,
      newWork: {
        title: "",
        link: "",
        description: "",
        tags: "",
        photo: {},
        preview: "",
      },
    };
  },
  methods: {
    handleDragOver() {

    },
    handleChange() {

    },
  },
};
</script>


<style lang="pcss" scoped src="./workForm.pcss">
</style>