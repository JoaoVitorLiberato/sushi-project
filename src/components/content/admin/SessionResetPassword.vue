<template>
  <v-row
    no-gutters
    style="width:100%;max-width: 450px;"
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
            v-for="({label, type, icon, readonly }, input) in itemsInput"
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
              :readonly="readonly"
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

      <v-dialog
        ref="dialogResetPassword"
        width="350"
      >
        <v-card>
          <v-row
            no-gutters
            class="pa-4"
          >
            <v-col
              cols="12"
              class="px-3 pb-4 text-center"
            >
              <span
                v-font-size="18"
                class="font-weight-regular"
              >
                {{ message }}
              </span>
            </v-col>

            <v-col
              cols="12"
            >
              <v-btn
                block
                color="secondary"
                @click.stop="$refs.dialogResetPassword.save()"
              >
                <span
                  class="primary--text"
                >
                  Fechar
                </span>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import { Component, Watch } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { $refs } from "@/implements/types"
  import { required, email } from "@/helpers/rules"
  import MixinAuthUser from "@/mixins/auth/mixinAuthUser"

  @Component({})
  export default class ContentAdminSessionResetPassword extends mixins(
    MixinAuthUser,
  ) implements $refs {
    $refs

    required = required

    itemsInput: {
      [key: string]: {
        valid: string|boolean,
        value: string
        type: string
        icon?: string
        readonly?: boolean
        label: string
      }
    } = {
      email: {
        label: "E-mail",
        readonly: true,
        valid: "",
        value: "",
        type: "email",
      },
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
    message = ""

    get validateInput (): boolean {
      return [ this.formvalidate ].every(o => !!o)
    }

    mounted (): void {
      const USER_CONNECTED = localStorage.getItem("user-connected")
      if (USER_CONNECTED) this.itemsInput.email.value = String(USER_CONNECTED)
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

    @Watch("itemsInput.email.value")
      changeEmail (value:string): void {
        if (email(value)) {
          this.itemsInput.email.valid = email(value)
          this.itemsInput.email.value = String(value)
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
      this.loading = true
      this.resetPassword({
        email: this.itemsInput.email.value,
        password: this.itemsInput.password.value
      }).then(responseMixin => {
        if (/error/i.test(String(responseMixin))) throw Error("err")
      }).catch(err => {
        window.log(`ERROR resetPasswordUser`, err)
        this.message = "Erro ao atualizar a senha, por favor, tente novamente."
        this.loading = false
        this.$refs.dialogResetPassword.isActive = true
      }).finally(() => {
        this.message = "Senha atualizada com sucesso!"
        this.loading = false
        this.$refs.dialogResetPassword.isActive = true
      })
    }
  }
</script>
