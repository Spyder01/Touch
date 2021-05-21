<template>
    <v-card height='315px' class='text-caption'>
        <div @click='emmitter()'>
       <v-img
              :src="ImageGen()"
              class="white--text darken-4  align-end"
              height="240px"
            >
              <v-card-title class='text-h5'>{{name}}</v-card-title>
            </v-img>
            <v-container>
            {{description}}
            </v-container>
            </div>
            <span class='del' @click='deleter()'><v-btn icon relative right><v-icon>mdi-delete</v-icon></v-btn></span>
    </v-card>
</template>

<script>

export default {
    name: 'Card',
    props: {
        name: String, 
        description: String
    },
    data () {
        return {
            images: "C:\\Users\\ACER#\\Documents\\Coding_Projects\\Task_Manager\\Frontend\\touch\\src\\components\\Queries\\Queries\\Query1.jpg"
        }
    },
    methods: {
        ImageGen () {
            const images = ['https://images.pexels.com/photos/927451/pexels-photo-927451.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                             'https://images.pexels.com/photos/313691/pexels-photo-313691.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                             'https://images.pexels.com/photos/5359960/pexels-photo-5359960.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                             'https://images.pexels.com/photos/5425445/pexels-photo-5425445.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                             'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                             'https://images.pexels.com/photos/4348403/pexels-photo-4348403.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                             'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                             'https://images.pexels.com/photos/5198239/pexels-photo-5198239.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
            ] 
            const image = images[Math.floor((Math.random() * 8))]
            return image
            
        },
        emmitter() {
             this.$emit('route-to-task')
        }, 
        deleter() {
            if(confirm('Are You Sure?')){
            this.$emit('delete-query')
            }
        }
    }
}

</script>

<style scoped>

@media screen and (max-width:400px){
.col-xl, .col-xl-auto, .col-xl-12, .col-xl-11, .col-xl-10, .col-xl-9, .col-xl-8, .col-xl-7, .col-xl-6, .col-xl-5, .col-xl-4, .col-xl-3, .col-xl-2, .col-xl-1, .col-lg, .col-lg-auto, .col-lg-12, .col-lg-11, .col-lg-10, .col-lg-9, .col-lg-8, .col-lg-7, .col-lg-6, .col-lg-5, .col-lg-4, .col-lg-3, .col-lg-2, .col-lg-1, .col-md, .col-md-auto, .col-md-12, .col-md-11, .col-md-10, .col-md-9, .col-md-8, .col-md-7, .col-md-6, .col-md-5, .col-md-4, .col-md-3, .col-md-2, .col-md-1, .col-sm, .col-sm-auto, .col-sm-12, .col-sm-11, .col-sm-10, .col-sm-9, .col-sm-8, .col-sm-7, .col-sm-6, .col-sm-5, .col-sm-4, .col-sm-3, .col-sm-2, .col-sm-1, .col, .col-auto, .col-12, .col-11, .col-10, .col-9, .col-8, .col-7, .col-6, .col-5, .col-4, .col-3, .col-2, .col-1 {
    padding: 18px !important;
}
}
</style>