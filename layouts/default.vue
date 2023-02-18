<template>
<v-app>
  <v-app-bar class="bg-primary">
    <NuxtLink to="/matrixPage">Матрица</NuxtLink>
  </v-app-bar>
  <v-main>
    <slot></slot>
  </v-main>
</v-app>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">

</style>