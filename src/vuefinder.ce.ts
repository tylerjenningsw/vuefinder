import { defineCustomElement } from 'vue'
import VueFinderCEWrapper from './VueFinderCEWrapper.vue'
import './assets/css/style.css'

const TAG = 'vuefinder-ce'

// Define the custom element with shadow DOM disabled (required for Teleport)
// Uses CEWrapper which remaps `finder-id` to `id` to avoid HTMLElement.id conflict
const VueFinderElement = defineCustomElement(VueFinderCEWrapper, {
  shadowRoot: false
})

// Guard against double registration (HMR, multiple script loads)
if (!customElements.get(TAG)) {
  customElements.define(TAG, VueFinderElement)
}

export { VueFinderElement }
