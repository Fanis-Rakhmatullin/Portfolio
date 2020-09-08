<template lang="pug">
.header-component
  headline(title="Панель администрирования")
    user.user(
      :username="username"
      :userPicLink="userpic"
    )
  navigation
</template>

<script>
import headline from "../../components/headline";
import user from "../../components/user";
import navigation from "../../components/navigation";

export default {
  components: { headline, user, navigation },
  data() {
    return {
      username: "Фанис Рахматуллин",
      userpic: "images/content/user"
    }
  },
};
</script>

<style lang="postcss" scoped>
  .user {
    color: #FFF;
  }
</style>