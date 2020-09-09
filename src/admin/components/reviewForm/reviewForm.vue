<template lang="pug">
.form-component
  form.form(@submit.prevent="handleSubmit")
    card(title="Новый отзыв")
      .form-container(slot="content")
        .form-cols
          .form-col-uploader
            .uploader(
              :style="{ backgroundImage: `url(${preview})` }"
              :class="{ active: preview.length > 0}"
              )
            .uploader-btn
              app-button.input-btn(
                typeAttr="file",
                plain,
                title="Добавить фото",
                @change="handleChange"
              ) 

          .form-col
            .form-row
              app-input.input(
                v-model="currentReview.author"
                :errorMessage="validation.firstError('currentReview.author')"
                title="Имя автора"
              )
              app-input.input(
                v-model="currentReview.occ",
                :errorMessage="validation.firstError('currentReview.occ')"
                title="Титул автора"
              )
            .form-row-textarea
              app-input(
                v-model="currentReview.text"
                :errorMessage="validation.firstError('currentReview.text')"
                field-type="textarea",
                title="Отзыв"
              )
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
import { Validator, mixin as ValidatorMixin } from "simple-vue-validator";
import { mapActions } from "vuex";

export default {
  mixins: [ValidatorMixin],
  validators: {
    "currentReview.author": (value) => {
      return Validator.value(value).required("Не может быть пустым");
    },
    "currentReview.occ": (value) => {
      return Validator.value(value).required("Не может быть пустым");
    },
    "currentReview.text": (value) => {
      return Validator.value(value).required("Не может быть пустым");
    },
  },
  components: { card, appButton, appInput },
  props: {
    editExistedReview: Boolean,
    reviewToEdit: Object,
  },
  data() {
    return {
      preview: "",
      newReview: {
        author: "",
        occ: "",
        text: "",
        photo: "",
      },
    };
  },
  computed: {
    currentReview() {
      if (this.editExistedReview == true) {
        return this.reviewToEdit;
      } else {
        return this.newReview;
      }
    },
  },
  methods: {
    ...mapActions({
      addNewReview: "reviews/add",
      editNewReview: "reviews/edit",
      showTooltip: "tooltips/show",
    }),
    handleChange(event) {
      event.preventDefault();
      const file = event.target.files[0];

      this.currentReview.photo = file;
      this.renderPhoto(file);
    },
    async handleSubmit() {
      if (await this.$validate() == false) return;
      if (this.editExistedReview == true) {
        try {
          await this.editNewReview(this.currentReview);
          this.showTooltip({
          text: `Отзыв изменен`,
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
          await this.addNewReview(this.currentReview);
          this.showTooltip({
          text: `Отзыв создан`,
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
    if (this.editExistedReview == true) {
      this.preview = `https://webdev-api.loftschool.com/${this.reviewToEdit.photo}`;
    }
  },
};
</script>


<style lang="pcss" scoped src="./reviewForm.pcss">
</style>