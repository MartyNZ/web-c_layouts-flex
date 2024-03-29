import { library, config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import { fad } from "@fortawesome/pro-duotone-svg-icons";
// import { fal } from "@fortawesome/pro-light-svg-icons";
import { fab, fad, fal } from "@awesome.me/kit-0f286115aa/icons";
// import { fab } from "@fortawesome/free-brands-svg-icons";

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false;

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
library.add(fab, fad, fal);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon, {});
});
