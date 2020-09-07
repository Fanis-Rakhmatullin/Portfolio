import workCard from './workCard'

export default {
  title: 'workCard',
  components: { workCard },
};

const work = {
  title: "Дизайн сайта для авто салона Porsche",
  link: "https://www.porsche-pulkovo.ru",
  description: "Порше Центр Пулково - является официальным дилером марки Порше в Санкт-Петербурге и предоставляет полный цикл услуг по продаже и сервисному обслуживанию автомобилей",
  tags: "Jquery, Vue.js, HTML5",
}


export const defaultView = () => ({
  components: { workCard },
  data() {
    return {
      work,
      cover: "http://lorempixel.com/output/people-q-c-400-400-10.jpg"
    }
  },
  template: `
    <work-card
      :work="work"
      :cover="cover"
    ></work-card>
  `
})