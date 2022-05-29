import Duration from '../../renderer/components/presentational/Duration.vue'

const Template = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Duration },
  template: '<duration :duration="duration" />',
})

export const durationTime = Template.bind({})
durationTime.args = {
  duration: 70000,
}
