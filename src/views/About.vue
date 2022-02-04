<template>
  <div class="about">
    <h1>This page is authenticated</h1>
    <p>
      <strong>Id:</strong> <span style="color: blue">{{ user.id }}</span><br>
      <strong>FirstName:</strong> <span style="color: blue">{{ user.firstName }}</span><br>
      <strong>LastName:</strong> <span style="color: blue">{{ user.lastName }}</span><br>
      <strong>E-mail:</strong> <span style="color: blue">{{ user.email }}</span><br>
      <strong>Username:</strong> <span style="color: blue">{{ user.username }}</span>
    </p>
    <p style="padding: 0 20px; word-wrap: break-word;">
      <strong>Token:</strong> <span style="color: blue">{{ user.token }}</span>
    </p>
    <p>
      <router-link to="/logout">[ Sair da Sessão ]</router-link>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { keycloak } from '../services'

export default defineComponent({
  setup() {
    const user = reactive({
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      toke: ''
    })
    return {
      user
    }
  },
  methods: {
    async getUserInfo() {
      const info = await keycloak.loadUserProfile()
      Object.assign(this.user, {
        id: info.id,
        firstName: info.firstName,
        lastName: info.lastName,
        email: info.email,
        username: info.username,
        token: localStorage.getItem('keycloak-token')
      })
    }
  },
  async mounted() {
    await this.getUserInfo()
  }
})
</script>
