<template>
  <v-row
    no-gutters
    style="width:100%;max-width: 450px;"
    class="mx-auto"
  >
    <v-col
      cols="12"
    >
      <h2
        class="font-weight-bold text-uppercase"
      >
        Alterar senha
      </h2>
    </v-col>

    <v-col
      cols="12"
      class="py-1"
    />

    <v-col
      cols="12"
      style="line-height:1;"
    >
      <span
        class="warning--text font-weight-regular"
      >
        Por favor, insira a nova senha no campo abaixo.
      </span>
    </v-col>

    <v-col
      cols="12"
      class="py-3"
    />

    <v-col
      cols="12"
    >
      <v-form
        ref="formResetPassword"
        v-model="formvalidate"
      >
        <v-row
          no-gutters
        >
          <v-col
            v-for="({label, type, icon }, input) in itemsInput"
            :key="`peencha-seus-dados-cadastrais-${label}`"
            cols="12"
            class="mb-3"
          >
            <v-text-field
              :id="input"
              :ref="input"
              v-model="itemsInput[input].value"
              :label="label"
              :name="label"
              :type="type ||'text'"
              :rules="[required,itemsInput[input].valid]"
              outlined
              color="primary"
              hide-details="auto"
              autocomplete="no"
              tabindex="0"
              :append-icon="/password/i.test(String(input)) ? icon : ''"
              :title="label"
              @click:append="showIconPassword()"
            >
              <template
                v-slot:message="props"
              >
                <span
                  v-text="props.message"
                />
              </template>
  
              <template v-slot:append-icon>
                <v-icon>
                  visibility
                </v-icon>
              </template>
            </v-text-field>
          </v-col>
  
          <v-col
            cols="12"
            class="py-2"
          />
  
          <v-col
            cols="12"
          >
            <v-progress-linear
              v-if="loading"
              indeterminate
              color="secondary"
            />
  
            <v-btn
              v-else
              type="button"
              block
              depressed
              color="secondary"
              large
              @click.stop="validateInput ? resetPasswordUser() : validate()"
            >
              <span
                v-font-size="14"
                class="font-weight-bold primary--text"
              >
                Registrar nova senha
              </span>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import { Component, Watch } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { $refs } from "@/implements/types"
  import { required } from "@/helpers/rules"

  @Component({})
  export default class ContentAdminSessionResetPassword extends mixins()
    implements $refs {
    $refs

    required = required

    itemsInput: {
      [key: string]: {
        valid: string|boolean,
        value: string
        type: string
        icon?: string
        label: string
      }
    } = {
      password: {
        label: "Nova senha",
        valid: "",
        value: "",
        type: "password",
        icon: "visibility_off",
      },
    }

    loading = false
    showPassword = false
    formvalidate = false

    get validateInput (): boolean {
      return [ this.formvalidate ].every(o => !!o)
    }

    validate (): void {
      if (this.$refs.formResetPassword.validate) {
        this.$refs.formResetPassword.validate()
      }
    }

    showIconPassword (): void {
      this.showPassword = !this.showPassword

      if (this.showPassword) {
        this.itemsInput.password.icon = "visibility"
        this.itemsInput.password.type = "text"
      } else {
        this.itemsInput.password.icon = "visibility_off"
        this.itemsInput.password.type = "password"
      }
    }

    @Watch("itemsInput.password.value")
      changePassword (value:string): void {
        if (String(value || "").length < 8) {
          this.itemsInput.password.valid = "Minimo 8 caracteres"
        } else {
          this.itemsInput.password.valid = true
          this.itemsInput.password.value = String(value || "")
        }
      }

    resetPasswordUser (): void {
      console.log("função")
    }
  }
</script>
