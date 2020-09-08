import user from './user';

export default {
  title: 'user',
  components: { user },
};

export const defaultView = () => ({
  components: { user },
  data() {
    return {
      username: "Иванов Иван",
      userPicLink: "images/content/user",
    }
  },
  template: `
    <user
    :username="username"
    :userPicLink="userPicLink"
    ></user>
  `
});

export const withOccupationView = () => ({
  components: { user },
  data() {
    return {
      username: "Иванов Иван",
      userPicLink: "images/content/user",
      occupation: "Преподаватель",
    }
  },
  template: `
  <user
  :username="username"
  :userPicLink="userPicLink"
  :occupation="occupation"
  ></user>
  `,
});

withOccupationView.story = {
  name: "С видом деятельности",
};