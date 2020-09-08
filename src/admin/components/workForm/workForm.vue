<template lang="pug">
.form-component
  form.form(@submit.prevent="handleSubmit")
    card(title="Добавление работы")
      .form-container(slot="content")
        .form-cols
          .form-col
            label.uploader(
              :style="{ backgroundImage: `url(${preview})` }",
              :class="{ hovered: hovered }",
              @dragover="handleDragOver",
              @dragleave="hovered = false",
              @drop="handleChange"
            )
              .uploader-title Перетащите или загрузите для загрузки изображения
              .uploader-btn
                app-button(typeAttr="file", @change="handleChange")

          .form-col
            .form-row
              app-input(v-model="currentWork.title", title="Название")
            .form-row
              app-input(v-model="currentWork.link", title="Ссылка") 
            .form-row
              app-input(
                v-model="currentWork.description",
                field-type="textarea",
                title="Описание"
              )
            .form-row
              tag-adder(v-model="currentWork.techs")
        .form-btns
          .btn
            app-button(
              title="Отмена",
              plain,
              @click.prevent="$emit('clearForm')"
            )
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
      preview: "",
      newWork: {
        title: "",
        link: "",
        description: "",
        techs: "",
        photo: {},
      },
    };
  },
  computed: {
    currentWork() {
      if (this.editExistedWork == true) {
        return this.workToEdit;
      } else {
        return this.newWork;
      }
    },
  },
  props: {
    editExistedWork: Boolean,
    workToEdit: Object,
  },
  methods: {
    ...mapActions({
      addNewWork: "works/add",
      editNewWork: "works/edit",
    }),
    handleDragOver(e) {
      e.preventDefault();
      this.hovered = true;
    },
    async handleSubmit() {
      let trimmed = this.currentWork.techs.trim().split(",");
      trimmed = trimmed.filter((item) => item.trim().length > 0);
      this.currentWork.techs = trimmed.join(", ");

      if (this.editExistedWork == true) {
        await this.editNewWork(this.currentWork);
      } else {
        await this.addNewWork(this.currentWork);
      }

      this.$emit("clearForm");
    },
    handleChange(event) {
      event.preventDefault();

      const file = event.dataTransfer
        ? event.dataTransfer.files[0]
        : event.target.files[0];

        this.currentWork.photo = file;
        this.renderPhoto(file);

        this.hovered = false;
    },
    renderPhoto(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.preview = reader.result;
      };

      reader.onerror = () => {};

      reader.onabort = () => {};
    },
  },
  mounted() {
    this.preview = `https://webdev-api.loftschool.com/${this.workToEdit.photo}`;
  },
};
</script>


<style lang="pcss" scoped src="./workForm.pcss">
</style>