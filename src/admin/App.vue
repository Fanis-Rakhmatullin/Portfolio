<template lang="pug">
.app-container
  router-view(name="header")
  router-view
  .notify-container(:class="{active: isTooltipShown}")
    .notification
      notification(
        :text="tooltipText"
        :type="tooltipType"
        @click="hideTooltip"
      )
  
</template>

<script>
import notification from './components/notification'
import { mapState, mapActions } from "vuex";

export default {
  components: { notification },
  methods: {
    ...mapActions({
      hideTooltip: "tooltips/hide"
    })
  },
  computed: {
    ...mapState("tooltips", {
      isTooltipShown: state => state.isShown,
      tooltipText: state => state.text,
      tooltipType: state => state.type,
    })
  }
}
</script>


<style lang="postcss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800');
@import "normalize.css";
@import "../styles/mixins.pcss";
@import "../styles/layout/base.pcss";

.page-title {
  font-weight: bold;
  font-size: 21px;
  color: $text-color;
  margin-right: 60px;
}

.page-content {
  padding: 60px 0 20px;
  background: url("../images/content/admin-bg.png") center center / cover no-repeat;
  flex: 1;
}

.page-header {
  display: flex;
  margin-bottom: 50px;
}
</style>

<style lang="postcss" scoped src="./app.pcss"></style>
