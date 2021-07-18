import StartStopButton from '@renderer/components/StartStopButton'

const Template = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { StartStopButton },
  template: '<start-stop-button />',
})

export const startStopButton = Template.bind({})
