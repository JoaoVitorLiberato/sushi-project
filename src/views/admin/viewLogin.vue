<template>
  <div
    class="pa-4 d-flex align-center "
    style="height: 80vh;"
  >
    <toolbar-component />
    <v-row
      style="width:100%;max-width: 450px;"
      class="mx-auto"
      no-gutters
      align="center"
    >
      <v-col
        cols="12"
        class="py-6"
      />

      <v-col
        cols="12"
        class="text-center"
      >
        <v-img
          src="/img/project/logo.png"
          alt="Logo Bangalô sushi lounge"
          width="100%"
          contain
        />
      </v-col>

      <v-col
        cols="12"
        class="py-4"
      />

      <v-col
        cols="12"
      >
        <v-form
          ref="formAdminLogin"
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
                :type="type||'text'"
                :rules="[required,itemsInput[input].valid]"
                dark
                outlined
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
                @click="authUser()"
              >
                <span
                  v-font-size="18"
                  class="font-weight-bold primary--text"
                >
                  Entrar
                </span>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
  import { Component, Watch } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { $refs } from "@/implements/types"
  import { required, email } from "@/helpers/rules"
  import MixinAuthUser from "@/mixins/auth/mixinAuthUser"

  @Component({
    components: {
      ToolbarComponent: () => import(
        /* webpackChunkName: "toolbar-component" */
        /* webpackMode: "eager" */
        "@/components/ToolbarComponent.vue"
      ),
    }
  })
  export default class viewAdminLogin extends mixins(
    MixinAuthUser,
  ) implements $refs {
    $refs
    required = required
    loading = false
    showPassword = false

    itemsInput: {
      [key:string]: {
        label: string,
        type: string,
        icon?: string,
        valid: string|boolean,
        value: string,
      }
    } = {
      email: {
        label: "E-mail",
        type: "email",
        valid: "",
        value: "",
      },
      password: {
        label: "Senha",
        type: "password",
        icon: "visibility_off",
        valid: "",
        value: "",
      }
    }

    @Watch("itemsInput.email.value")
      changeEmail (value:string): void {
        this.itemsInput.email.valid = email(value)
      }

    @Watch("itemsInput.password.value")
      changePassword (value:string): void {
        if (String(value).length < 8) {
          this.itemsInput.password.valid = "Minino 8 caracteres"
        } else {
          this.itemsInput.password.valid = true
        }
      }

    validateInputs (): void {
      if (this.$refs.formAdminLogin.validate) {
        this.$refs.formAdminLogin.validate()
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

    authUser (): void {
      this.loading = true
      if (email(this.itemsInput.email.value) && String(this.itemsInput.password.value).length <= 7) {
        this.validateInputs()
        return
      }
      this.authLogin(
        {
          email: this.itemsInput.email.value,
          password: this.itemsInput.password.value
        }
      )
        .then(responseMixin => {
          this.loading = false
          if (/senha-incorreta/i.test(String(responseMixin || ""))) {
            this.itemsInput.password.valid = "E-mail ou senha inválido(a)"
            return
          } else if (/user-not-exist/i.test(String(responseMixin || ""))) {
            this.itemsInput.email.valid = "Usuário não encontrado"
            return
          } else if (/error-api/i.test(String(responseMixin || ""))) {
            return
          } else {
            localStorage.setItem("token-user", responseMixin.token)
            localStorage.setItem("user-connected", this.itemsInput.email.value)
            sessionStorage.setItem("permission", responseMixin.role)
            this.$router.replace("/admin/conectado")
          }
        })
    }
  }
</script>
