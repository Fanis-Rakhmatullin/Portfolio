import reviewCard from './reviewCard'

export default {
  title: 'reviewCard',
  components: { reviewCard },
};

const review =  {
  "id": 0,
  "text": "Этот парень проходил обучение веб-разработке не где-то, а в LoftSchool! 4,5 месяца только самых тяжелых испытаний и бессонных ночей!",
  "name": "Дмитрий Ковальчук",
  "occupation": "Оснвоатель LoftSchool",
  "userpic": "images/content/review-1"
};


export const defaultView = () => ({
  components: { reviewCard },
  data() {
    return {
      review,
    }
  },
  template: `
    <review-card
      :review="review"
    ></review-card>
  `
})

defaultView.story = {
  name: "Стандартный вид",
};

export const addReviewView = () => ({
  components: { reviewCard },
  template: `
  <review-card
      addReview
    ></review-card>
  `,
});

addReviewView.story = {
  name: "Добавить отзыв",
};
