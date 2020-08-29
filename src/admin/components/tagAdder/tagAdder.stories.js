import tagAdder from './tagAdder';

export default {
  title: 'tagAdder',
  components: { tagAdder },
};

export const defaultView = () => ({
  components: { tagAdder },
  data() {
    return {
      tags: "One, Two, Three",
    }
  },
  template: `
      <tag-adder v-model="tags" />
  `
});

defaultView.story = {
  name: "Стандартный вид",
  parameters: {
    backgrounds: [
      {name: 'grey', value: '#8395a7', default: true},
    ]
  }
}