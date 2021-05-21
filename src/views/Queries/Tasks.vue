<template>
    <v-app>
    <Navbar/>
    <MainArea :name='name'/>
    </v-app>
</template>

<script>
import Navbar from "../../components/Navbar"
import MainArea from "../../components/Tasks/MainArea"
export default {
   name: "Tasks",
   props: ['name'],
  components: {
      Navbar, MainArea
  },
  created() {
      console.log(this.name)
  }
}
</script>
