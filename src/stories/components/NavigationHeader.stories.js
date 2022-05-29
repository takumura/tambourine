import NavigationHeader from '../../renderer/components/presentational/NavigationHeader.vue'

const Template = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { NavigationHeader },
  template: '<navigation-header :title=title />',
})

export const navigationHeader = Template.bind({})
navigationHeader.args = {
  title: 'storybook test',
}
