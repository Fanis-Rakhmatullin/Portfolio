import Vue from "vue";
import axios from "axios";
import config from "../../env.paths.json";

axios.defaults.baseURL = config.BASE_URL;

const thumbs = {
  props: ["currentWork", "works"],
  template: "#preview-thumbs",
};

const btns = {
  props: ["slidable"],
  template: "#preview-btns",
};

const display = {
  props: {
    currentWork: {
      type: Object,
      default: () => {},
    }, 
    works: Array, 
    slidable: Object
  },
  template: "#preview-display",
  components: { thumbs, btns },
  computed: {
    reversedWorks() {
      const works = [...this.works];
      return works.slice(0, 4).reverse();
    }
  },
};

const tags = {
  props: ["tags"],
  template: "#preview-tags",
};

const info = {
  props: {
    currentWork: {
      type: Object,
      default: () => {},
    },
    works: Array
  },
  template: "#preview-info",
  components: { tags },
  computed: {
    tagsArray() {
      return this.currentWork.techs.split(",")
    },
  },
  mounted() {
    console.log(this.tagsArray);
  },
};

new Vue({
  el: "#preview-component",
  template: "#preview-container",
  components: { display, info },
  data() {
    return {
      works: [],
      deletedItems: [],
      slidable: {
        next: true,
        prev: false
      },
    }
  },
  computed: {
    currentWork() {
      return this.works[0];
    },
  },
  watch: {
    works() {
      if (!this.works[1]) {
        this.slidable.next = false;
      }
      else {
        this.slidable.next = true;
      }
    },
    deletedItems() {
      if (this.deletedItems.length === 0) {
        this.slidable.prev = false;
      }
      else {
        this.slidable.prev = true;
      }
    }
  },
  methods: {
    prepareWorkData(data) {
      return data.map((item, ndx) => {
        const requiredImage = `https://webdev-api.loftschool.com/${item.photo}`;
        item.photo = requiredImage;
        item.id = ndx + 1;
        return item;
      })
    },

     slide(direction) {
      const lastItem = this.deletedItems[this.deletedItems.length - 1];
      switch (direction) {
        case "next":
          if (this.works[1]) {
            this.deletedItems.push(this.works[0]);
            this.works.shift();
          }
          break;
        case "prev":
          if (lastItem) {
            this.works.unshift(lastItem);
            this.deletedItems.pop();
          }
          break;
      }
    },

    thumb(evt) {
      let index = evt.index;
      const length = evt.length;
      while (index !== length - 1) {
        this.deletedItems.push(this.works[0]);
        this.works.shift();
        index++;
      }
    }
  },
  async created() {
    const { data } = await axios.get("/works/381");

    this.works = this.prepareWorkData(data);
    console.log('созщдано');
  }
})