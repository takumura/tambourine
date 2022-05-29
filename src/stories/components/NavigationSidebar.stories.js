import NavigationSidebar from '../../renderer/components/presentational/NavigationSidebar.vue'

const Template = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { NavigationSidebar },
  template: '<navigation-sidebar />',
})

export const navigationSidebar = Template.bind({})
