import DurationIndicator from '../../renderer/components/presentational/DurationIndicator.vue'

const Template = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DurationIndicator },
  template: `
    <div>
      <duration-indicator ref="indicator" :duration="duration" />
      <button @click="$refs.indicator.start()">start</button>
      <button @click="$refs.indicator.stop()">stop</button>
    </div>
  `,
})

export const durationIndicator = Template.bind({})
durationIndicator.args = {
  duration: 0,
}
