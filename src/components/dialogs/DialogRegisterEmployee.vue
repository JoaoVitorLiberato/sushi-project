<template>
  <v-dialog
    fullscreen
    v-model="dialogRegisterEmployee"
  >
    <v-card
      color="white"
      style="border-radius: 0;"
    >
      <v-row
        no-gutters
        style="max-width: 1100px;"
        class="pa-4 mx-auto"
      >
        <v-col
          cols="12"
          class="text-end"
        >
          <v-btn
            text
            color="primary"
            fab
            @click="dialogRegisterEmployee = !dialogRegisterEmployee"
            @keydown.esc.prevent="dialogRegisterEmployee = !dialogRegisterEmployee"
          >
            <v-icon
              size="32"
            >
              close
            </v-icon>
          </v-btn>
        </v-col>

        <v-col
          cols="12"
          class="py-3"
        />

        <v-col
          cols="12"
          class="text-center"
        >
          <h2
            v-font-size="$vuetify.breakpoint.smAndDown ? 21 : 26"
            class="font-weight-bold text-uppercase"
          >
            Registrar funcionário
          </h2>
        </v-col>

        <v-col
          cols="12"
          class="py-3"
        />

        <v-col
          cols="12"
          style="max-width: 400px;"
          class="mx-auto"
        >
          <v-form
            ref="formRegisterEmployee"
          >
            <v-row
              no-gutters
            >
              <v-col
                cols="12"
              >
                <v-text-field 
                  v-model="data.name"
                  type="text"
                  label="Nome completo"
                  :rules="[required, nome(data.name)]"
                  outlined
                  hide-details="auto"
                  autocomplete="no"
                  tabindex="0"
                />
              </v-col>

              <v-col
                cols="12"
                class="py-2"
              />

              <v-col
                cols="12"
              >
                <v-text-field 
                  v-model="data.email"
                  type="email"
                  label="E-mail"
                  :rules="[required, email(data.email)]"
                  outlined
                  hide-details="auto"
                  autocomplete="no"
                  tabindex="0"
                />
              </v-col>

              <v-col
                cols="12"
                class="py-2"
              />

              <v-col
                cols="12"
              >
                <v-text-field 
                  v-model="data.password"
                  label="Senha"
                  :type="showPassword ? 'text' : 'password'"
                  :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                  :rules="[required, v => v.length >= 8 || 'Minimo 8 caractéres']"
                  outlined
                  hide-details="auto"
                  autocomplete="no"
                  tabindex="0"
                  @click:append="showPassword = !showPassword"
                />
              </v-col>

              <v-col
                cols="12"
                class="py-1"
              />

              <v-col
                cols="12"
              >
                <v-switch
                  color="success"
                  v-model="admin"
                  hide-details
                >
                  <template #label>
                    <div
                      style="line-height: 1;"
                    >
                      <span
                        v-font-size="16"
                        class="grey--text"
                      >
                        Conceder acesso priveligiado para este funcionário poder registrar
                        pessoas e cadastrar produtos.
                      </span>
                    </div>
                  </template>
                </v-switch>
              </v-col>

              <v-col
                cols="12"
                class="py-4"
              />

              <v-col
                cols="12"
              >
                <v-progress-linear
                  v-if="loading"
                  color="secondary"
                  indeterminate
                />
                <v-btn
                  v-else
                  x-large
                  block
                  depressed
                  color="secondary"
                  @click.stop="!validateInput ? validate() : finishRegister()"
                >
                  <span
                    class="font-weight-bold primary--text"
                  >
                    Registrar
                  </span>
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>

      <v-snackbar
        v-model="error.status"
      >
        <div
          class="text-center"
        >
          <span
            class="font-weight-regular"
          >
            {{ error.msg }}
          </span>
        </div>
      </v-snackbar>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { namespace } from "vuex-class"
  import { email, required, nome } from "@/helpers/rules"
  import { $refs } from "@/implements/types"
  import MixinAuthUser from "@/mixins/auth/mixinAuthUser"

  const dialogStore = namespace("dialogStoreModule")

  @Component({})
  export default class DialogRegisterEmployee extends mixins(
    MixinAuthUser,
  ) implements $refs {
    @dialogStore.Getter("DialogRegisterEmployee") getDialogRegisterEmployee
    @dialogStore.Action("ActionDialogRegisterEmployee") setDialogRegisterEmployee

    $refs
    required = required
    email = email
    nome = nome
    showPassword = false
    admin = false
    loading = false

    data = {
      name: "",
      email: "",
      password: "",
      role: ""
    }

    error = {
      status: false,
      msg: ""
    }

    get validateInput (): boolean {
      return [
        nome(this.data.name) === true,
        email(this.data.email) === true,
        String(this.data.password).length >= 8
      ].every(o=>!!o)
    }

    validate (): void {
      if (this.$refs.formRegisterEmployee.validate) {
        this.$refs.formRegisterEmployee.validate()
      }
    }

    get dialogRegisterEmployee (): boolean {
      return this.getDialogRegisterEmployee()
    }

    set dialogRegisterEmployee (value: boolean) {
      this.setDialogRegisterEmployee(value)
    }

    finishRegister (): void {
      if (this.admin) this.data.role = "admin"
      else this.data.role = "not-permission"
      this.loading = true

      this.registerEmployee(this.data)
        .then(responseMixin => {
          if (/error/i.test(responseMixin)) {
            this.loading = false
            this.error.status = true
            this.error.msg = "Houve um error ao criar um usuário, tente novamente."
            return
          }

          this.error.status = true
          this.error.msg = "Usuário criado com sucesso!"
          setTimeout(() => {
            this.loading = false
            this.error.status = false
            this.dialogRegisterEmployee = false
          }, 5000)
        })
    }
  }
</script>