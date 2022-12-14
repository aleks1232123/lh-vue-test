<template lang="pug">
  div(id="app")
    //- Default layout usage example
    Default
      //- specify directly if have only one page(route)
        Index
      //- if multiple routes (uncomment router in main.js)
          and next line
      //- router-view
      //-Half-layout usage example
</template>

<script>
// Import layout
import Default from '@/layouts/Default.vue';

import Index from '@/pages/Index.vue';

export default {
  components: {
    Default,
    Index,
  },
};
</script>
