import tagsList from './tagsList'

export default {
  title: 'tagsList',
  components: { tagsList },
};


export const defaultView = () => ({
  components: { tagsList },
  data() {
    return {
      tags: "Jquery, Vue.js, HTML5"
    }
  },
  template: `
    <tagsList
      :tags="tags"
    ></tagsList>
  `
})