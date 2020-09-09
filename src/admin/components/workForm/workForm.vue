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
              app-input(
                v-model="currentWork.title"
                :errorMessage="validation.firstError('currentWork.title')"
                title="Название"
                )
            .form-row
              app-input(
                v-model="currentWork.link"
                :errorMessage="validation.firstError('currentWork.link')"
                title="Ссылка"
                ) 
            .form-row
              app-input(
                v-model="currentWork.description"
                :errorMessage="validation.firstError('currentWork.description')"
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
import { Validator, mixin as ValidatorMixin } from "simple-vue-validator";
import { mapActions } from "vuex";

export default {
  mixins: [ValidatorMixin],
  validators: {
    "currentWork.title": (value) => {
      return Validator.value(value).required("Не может быть пустым");
    },
    "currentWork.description": (value) => {
      return Validator.value(value).required("Не может быть пустым");
    },
    "currentWork.link": (value) => {
      return Validator.value(value).required("Не может быть пустым");
    },
  },
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
      showTooltip: "tooltips/show",
    }),
    handleDragOver(e) {
      e.preventDefault();
      this.hovered = true;
    },
    async handleSubmit() {
      if (await this.$validate() == false) return;

      let trimmed = this.currentWork.techs.trim().split(",");
      trimmed = trimmed.filter((item) => item.trim().length > 0);
      this.currentWork.techs = trimmed.join(", ");

      if (this.editExistedWork == true) {
        try {
          await this.editNewWork(this.currentWork);
          this.showTooltip({
          text: "Работа изменена",
          type: "success",
        });
        } catch (error) {
          this.showTooltip({
            text: error.message,
            type: "error",
          });
        }
      } else {
        try {
          await this.addNewWork(this.currentWork);
          this.showTooltip({
            text: "Работа добавлена",
            type: "success",
          });
        } catch (error) {
          this.showTooltip({
            text: error.message,
            type: "error",
          });
        }
      }

      this.preview = "";
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
    if (this.editExistedWork == true) {
      this.preview = `https://webdev-api.loftschool.com/${this.workToEdit.photo}`;
    }
  },
};
</script>


<style lang="pcss" scoped src="./workForm.pcss">
</style>