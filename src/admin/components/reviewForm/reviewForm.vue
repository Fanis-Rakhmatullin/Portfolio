<template lang="pug">
.form-component
  form.form(
    @submit.prevent="handleSubmit"
    )
    //- (
              :style="{ backgroundImage: `url(${newReview.preview})` }"
            )
    card(title="Новый отзыв")
      .form-container(slot="content")
        .form-cols
          .form-col-uploader
            .uploader
            .uploader-btn
              app-button(typeAttr="file" plain title="Добавить фото" @change="handleChange").input-btn 

          .form-col
            .form-row
              app-input(v-model="newReview.name", title="Имя автора").input
              app-input(v-model="newReview.occupation", title="Титул автора").input
            .form-row-textarea
              app-input(
                v-model="newReview.text",
                field-type="textarea",
                title="Отзыв"
              )
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
      newReview: {
        name: "",
        occupation: "",
        text: "",
        userpic: "",
      },
    };
  },
  methods: {
    handleDragOver() {},
    handleChange(e) {
      // e.preventDefault();
    },
    handleSubmit() {

    }
  },
};
</script>


<style lang="pcss" scoped src="./reviewForm.pcss">
</style>