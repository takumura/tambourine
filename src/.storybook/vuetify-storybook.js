import Vue from 'vue'
import * as _Vuetify from 'vuetify/lib'
import colors from 'vuetify/es5/util/colors'

const Vuetify = _Vuetify.default

const isVueComponent = (obj) => obj.name === 'VueComponent'

const VComponents = Object.keys(_Vuetify).reduce((acc, key) => {
  if (isVueComponent(_Vuetify[key])) {
    acc[key] = _Vuetify[key]
  }
  return acc
}, {})

Vue.use(Vuetify, {
  iconfont: 'mdi',
  components: {
    ...VComponents,
  },
})

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      dark: {
        primary: colors.blue.darken2,
        accent: colors.grey.darken3,
        secondary: colors.amber.darken3,
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: colors.green.accent3,
      },
      light: {
        teal: colors.teal,
        primary: colors.purple,
        accent: colors.shades.black,
        secondary: colors.grey.darken1,
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.red.accent3,
        success: colors.green.accent3,
        teal: colors.teal,
      },
    },
  },
})
