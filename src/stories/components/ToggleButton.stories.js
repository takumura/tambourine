import ToggleButton from '../../renderer/components/presentational/ToggleButton.vue'

const Template = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ToggleButton },
  template:
    '<toggle-button :onMessage=onMessage :offMessage=offMessage :initialState=initialState @buttonClicked="onClick" />',
})

export const toggleButton = Template.bind({})
toggleButton.args = {
  onMessage: 'Stop',
  offMessage: 'Start',
  initialState: false,
}

toggleButton.argTypes = {
  onClick: { action: 'onClick' },
}
