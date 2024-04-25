<template>
  <v-main>
    <v-container
      fluid
      class="pa-0"
    >
      <toolbar-component />

      <router-view
        name="viewHero"
      />
      <router-view
        name="viewDishes"
      />
    </v-container>

    <dialogSlotFuncionalidadesComponent>
      <template
        #tableSelected
      />
      <template
        #serviceClient
      />
    </dialogSlotFuncionalidadesComponent>
  </v-main>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"


  @Component({
    components: {
      ToolbarComponent: () => import(
        /* webpackChunkName: "toolbar-component" */
        /* webpackMode: "eager" */
        "@/components/ToolbarComponent.vue"
      ),
      dialogSlotFuncionalidadesComponent: () => import(
        /* webpackChunkName: "dialog-slot-funcionalidades-component" */
        /* webpackMode: "eager" */
        "@/components/dialogs/dialogSlotFuncionaliades.vue"
      )
    }
  })

  export default class routeMain extends mixins() {}
</script>
