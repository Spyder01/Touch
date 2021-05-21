<template>
  <v-app>
    <Navbar/>
   <MainArea/>
  </v-app>
</template>

<script>
import Navbar from "../../components/Navbar"
import MainArea from "../../components/Queries/MainArea"

  export default {
    name: 'Queries',

    components: {
       Navbar, MainArea
    },
  }
</script>
