import Vue from "vue";
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';
import axios from "axios";
import config from "../../env.paths.json";

axios.defaults.baseURL = config.BASE_URL;


new Vue({
  el: "#slider-component",
  template: "#slider-container",
  components: {
    Swiper, SwiperSlide
  },
  data() {
    return {
      reviews: [],
      position: "beginning",
      sliderOptions: {
        slidesPerView: 1,
        breakpoints: {
          480: {
            slidesPerView: 2,
          },
        },
      }
    }
  },
  methods: {
    requireImagesToArray(data) {
      return data.map((item) => {
        const requiredImage = `https://webdev-api.loftschool.com/${item.photo}`;
        item.pic = requiredImage;
        return item;
      })
    },
    slide(direction) {
      const slider = this.$refs["slider"].$swiper;
      switch (direction) {
        case "next":
          slider.slideNext();
          break;
        case "prev":
          slider.slidePrev();
          break;
      }

    }
  },
  mounted() {
    const slider = this.$refs["slider"].$swiper
    slider.on('slideChange', () => {
      if (slider.isBeginning) {
        this.position = "beginning"
        return
      }
      if (slider.isEnd) {
        this.position = "end"
        return
      }
      this.position = ""
    });
  },
  async created() {
    const { data } = await axios.get("/reviews/381");
    this.reviews = this.requireImagesToArray(data);
  },
})