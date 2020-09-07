import workForm from './workForm'

export default {
  title: 'workForm',
  components: { workForm },
};


export const defaultView = () => ({
  components: { workForm },
  template: `
    <work-form></work-form>
  `
})