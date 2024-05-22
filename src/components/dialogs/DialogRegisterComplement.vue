<template>
  <v-dialog
    v-model="dialogRegisterComplement"
    max-width="500"
  >
    <v-card
    >
      <v-row
        no-gutters
      >
        <v-col
          cols="12"
          class="text-end pa-2"
        >
          <v-btn
            fab
            depressed
            dense
            width="40"
            height="40"
            @click.stop="closeDialog()"
          >
            <v-icon>
              close
            </v-icon>
          </v-btn>
        </v-col>

        <v-col
          cols="12"
          class="px-4"
        >
          <v-row
            no-gutters
            class="pb-3"
          >
            <v-col
              cols="12"
            >
              <h2
                v-font-size="18"
                class="font-weight-bold text-uppercase"
              >
                Novo complemento
              </h2>
            </v-col>

            <v-col
              cols="12"
              class="py-2"
            />

            <v-col
              cols="12"
            >
              <v-form
                ref="formCreateComplement"
                v-model="formValidate"
              >
                <v-row
                  no-gutters
                >
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="data.name"
                      label="Nome"
                      :rules="[required]"
                      outlined
                      hide-details="auto"
                    />
                  </v-col>
  
                  <v-col
                    cols="12"
                    class="py-2"
                  />
  
                  <v-col
                    cols="12"
                  >
                    <v-textarea
                      v-model="data.description"
                      label="Descrição"
                      outlined
                      :rules="[required]"
                      hide-details="auto"
                      rows="2"
                      row-height="20"
                    />
                  </v-col>
  
                  <v-col
                    cols="12"
                    class="py-2"
                  />
  
                  <v-col
                    cols="12"
                  >
                    <v-row
                      no-gutters
                      justify="space-between"
                      align="center"
                    >
                      <v-col
                        cols="7"
                      >
                        <v-text-field
                          v-model.number="data.price"
                          type="number"
                          label="Preço"
                          :rules="[required]"
                          outlined
                          hide-details="auto"
                        />
                      </v-col>
  
                      <v-col
                        cols="4"
                      >
                        <span
                          v-font-size="22"
                          class="font-weight-medium"
                        >
                          {{ formatedPrice(data.price) }}
                        </span>
                      </v-col>
                    </v-row>
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
                      color="secondary"
                      indeterminate
                    />
  
                    <div
                      v-else
                    >
                      <v-btn
                        v-if="/update/i.test(String(service))"
                        block
                        large
                        depressed
                        color="secondary"
                        @click.stop="validateForm ? updateProductSelected() : validate()"
                      >
                        <span
                          class="primary--text font-weight-bold"
                        >
                          Atualizar
                        </span>
                      </v-btn>

                      <v-btn
                        v-else
                        block
                        large
                        depressed
                        color="secondary"
                        @click.stop="validateForm ? finishComplementCart() : validate()"
                      >
                        <span
                          class="primary--text font-weight-bold"
                        >
                          Cadastrar
                        </span>
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
          </v-row>
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
  import { formatedPrice } from "@/helpers/formatedPrice"
  import MixinProductAPI from "@/mixins/product/mixinProductAPI"
  import { IComplements } from "@/types/types-product"
  import { required } from "@/helpers/rules"
  import { $refs } from "@/implements/types"

  const dialogStore = namespace("dialogStoreModule")

  @Component({})
  export default class DialogRegisterComplements extends mixins(
    MixinProductAPI,
  ) implements $refs {
    @dialogStore.Getter("DialogRegisterComplement") getDialogRegisterComplement
    @dialogStore.Action("ActionDialogRegisterComplement") setDialogRegisterComplement

    $refs
    formatedPrice = formatedPrice
    required = required

    formValidate = false

    error = {
      status: false,
      msg: ""
    }

    get dialogRegisterComplement (): boolean {
      return this.getDialogRegisterComplement()
    }

    set dialogRegisterComplement (value:boolean) {
      this.setDialogRegisterComplement(value)
    }

    loading = false
    service = ""

    data = {
      name: "",
      description: "",
      price: 0
    } as IComplements

    get validateForm (): boolean {
      return [
        this.formValidate
      ].every(o => !!o)
    }

    created (): void {
      const CACHE_DATA = sessionStorage.getItem("update")
      if (CACHE_DATA) {
        this.data = {
          ...JSON.parse(CACHE_DATA)
        }
        this.service = "update"
      }
    }

    closeDialog (): void {
      sessionStorage.removeItem("update")
      this.dialogRegisterComplement = !this.dialogRegisterComplement
    }

    validate (): void {
      if (this.$refs.formCreateComplement.validate) {
        this.$refs.formCreateComplement.validate()
      }
    }

    finishComplementCart (): void {
      this.loading = true

      this.createComplement(this.data)
        .then(responseMixin => {
          if (/erro/i.test(String(responseMixin || ""))) {
            this.error.status = true
            this.error.msg = "Houve algum problema ao criar o complemento, por favor, tente novamente."
            setTimeout(() => {
              this.error.status = false
              this.loading = false
            }, 1400)
            return
          }

          this.error.status = true
          this.error.msg = "Complemento criado com sucesso."
          setTimeout(() => {
            this.error.status = false
            this.dialogRegisterComplement = false
            this.loading = false
          }, 1400)
        })
    }

    updateProductSelected (): void {
      this.loading = true

      this.updateComplement(this.data)
        .then(responseMixin => {
          if (/erro/i.test(String(responseMixin || ""))) {
            this.error.status = true
            this.error.msg = "Houve algum problema ao atualizar o complemento, por favor, tente novamente."
            setTimeout(() => {
              this.error.status = false
              this.loading = false
            }, 1400)
            return
          }
          

          this.error.status = true
          this.error.msg = "Complemento atualizado com sucesso."
          setTimeout(() => {
            sessionStorage.removeItem("update")
            this.error.status = false
            this.dialogRegisterComplement = false
            this.loading = false
          }, 1400)
        })
    }
  }
</script>