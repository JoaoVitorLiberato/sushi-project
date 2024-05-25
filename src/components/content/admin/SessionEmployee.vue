<template>
  <v-row
    no-gutters
    class="pa-4"
  >
    <v-col
      cols="12"
    >
      <h2
        class="text-uppercase font-weight-bold"
      >
        Lista de funcionários
      </h2>
    </v-col>

    <v-col
      cols="12"
      class="py-2"
    />

    <v-col
      v-if="usersList.length <= 0"
      cols="12"
    >
      <span
        class="grey--text font-italic"
      >
        Sem usuários cadastrados!
      </span>
    </v-col>

    <v-col
      v-else
      cols="12"
    >
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th
                class="text-left"
              >
                Nome
              </th>
              <th
                class="text-left"
              >
                Email
              </th>
              <th
                class="text-right"
              />
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in usersList"
              :key="`tr-user-${item.id}`"
            >
              <td>
                {{ item.name }}
              </td>
              <td>
                {{ item.email }}
              </td>
              <td
                class="text-end"
              >
                <v-btn
                  text
                  fab
                  color="error"
                  @click.stop="removeUserListed(String(item.id))"
                >
                  <v-icon>
                    delete
                  </v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <v-dialog
        ref="dialogListUsers"
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
                @click.stop="$refs.dialogListUsers.save()"
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
  /* eslint-disable @typescript-eslint/no-explicit-any*/
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { $refs } from "@/implements/types"
  import MixinAuthUser from "@/mixins/auth/mixinAuthUser"

  @Component({})
  export default class ContentAdminSessionEmployee extends mixins(
    MixinAuthUser,
  ) implements $refs {
    $refs
    usersList: any = []
    message = ""

    mounted (): void {
      this.listUsersRegistered()
    }

    removeUserListed (id:string): void {
      this.deleteUser(id)
        .then(responseMixin => {
          if (/error/i.test(String(responseMixin))) throw Error("err")
          this.listUsersRegistered()
        }).catch(err => {
          window.log(`err removeUserListed`, err)
          this.message = "Houve um erro ao tentar deletar o usuário."
          this.$refs.dialogListUsers.isActive = true
        })
    }

    listUsersRegistered (): void {
      const USER_CONNECTED = sessionStorage.getItem("user-connected")
      this.getAllUsers()
        .then(responseMixin => {
          if (/error/i.test(String(responseMixin))) throw Error('err')
          else if (USER_CONNECTED && responseMixin.length > 0) {
            this.usersList = responseMixin.filter(user => {
              if (String(user.email) !== String(USER_CONNECTED)) return user
            })
          } else this.usersList = []
        })
    }
  }
</script>
