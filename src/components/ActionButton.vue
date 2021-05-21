<template>
    <v-btn dark :elevation='15' :color='color' fixed bottom right fab>
        <v-icon>
            {{icon}}
        </v-icon>
    </v-btn>
</template>

<script>

export default {
   name: 'ActionButton',
   props: {
       icon: {
           type: String,
           default: 'mdi-plus'
       },
       color: String
   }
}
</script>