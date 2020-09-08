<template lang="pug">
.user-component
  avatar(:size="'2.7'", :src="userPic")
  .data 
    .username {{ username }}
    .occupation(v-if="occupation") {{occupation}}
</template>

<script>
import avatar from "../avatar/avatar";

export default {
  components: {
    avatar,
  },
  props: {
    username: String,
    userPicLink: {
      type: String,
      default: "images/content/user",
    },
    occupation: String,
  },
  computed: {
    userPic() {
      return require(`../../../${this.userPicLink}.jpg`).default;
    },
  },
};
</script>

<style lang="postcss" scoped>
.user-component {
  display: flex;
  font-size: 18px;
  font-weight: 600;
  align-items: center;
  color: inherit;
}

.data {
  display: flex;
  flex-direction: column;
  margin-left: 18px;
}

.occupation {
  font-weight: 600;
  color: rgba($text-color, 0.5);
}
</style>