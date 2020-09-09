<template lang="pug">
.user-component
  avatar.avatar(:size="'2.7'", :src="userPic")
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
    userPicLocal: String,
    userPicLink: String,
    occupation: String,
  },
  computed: {
    userPic() {
      if (this.userPicLink) {
        return this.userPicLink;
      } else {
        return require(`../../../${this.userPicLocal}.jpg`).default;
      }
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

.avatar {
  flex: none;
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