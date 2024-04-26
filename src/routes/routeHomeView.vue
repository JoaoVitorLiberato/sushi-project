<template>
  <v-main>
    <v-container
      fluid
      class="pa-0"
    >
      <toolbar-component />
      <v-row
        no-gutters
      >
        <v-col
          cols="12"
        >
          <router-view
            name="viewHero"
          />
        </v-col>

        <v-col
          cols="12"
        >
          <router-view
            name="viewDishes"
          />
        </v-col>

        <v-col
          cols="12"
          class="py-3 py-md-4"
        />

        <v-col
          cols="12"
        >
          <router-view
            name="viewDescriptionCook"
          />
        </v-col>

        <v-col
          cols="12"
          class="py-3 py-md-4"
        />

        <v-col
          cols="12"
        >
          <router-view
            name="viewEstabelishLocation"
          />
        </v-col>
      </v-row>
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
