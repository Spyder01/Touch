<template>
   <nav>
      <v-navigation-drawer v-model="drawer" class='hidden-sm-and-down orange' dark app>
        <div class='fixer hidden-lg-and-up'>
         <v-app-bar-nav-icon @click="drawer = !drawer" class='hidden-sm-and-down'></v-app-bar-nav-icon> 
         <span @click="router()" class='font-weight-thin text-h4 white--text'>Touch</span>
      </div>
    </v-navigation-drawer> 
        
    <v-app-bar app dark class='orange'>
      <v-app-bar-nav-icon @click="drawer = !drawer" class='hidden-sm-and-down'></v-app-bar-nav-icon>

      <v-toolbar-title @click="router()" class='font-weight-thin text-h4'>Touch</v-toolbar-title><v-spacer></v-spacer><span @click='AddUserName()'>{{username}}</span>
    </v-app-bar>
      <v-dialog v-model='userDialog'>
             <v-card>
        <v-card-title>Set your Username: </v-card-title>
        <v-text-field label='Username' v-model='username' placeholder='Enter your user name'></v-text-field>
        <v-btn block color='green' dark @click='AddUserName()'>Set Username</v-btn>
        </v-card>
    </v-dialog>
   </nav> 
</template>

<script>
import func from './funcs'
const {GetValue, SetValue} = func

export default {
    name: 'Navbar',
    data () {
        return {
            drawer: false,
            username: '',
            userDialog: false, 
        }
    },
    methods: {
         AddUserName () {
            SetValue('username',this.username)
            this.userDialog = !this.userDialog
        },
        router() {
            console.log('Skuhkxu')
            this.$router.push({name:'Queries'})
        }
    },
    async created () {
        this.username = await GetValue('username')
    }
}
</script>

<style scoped>
.fixer {
    height: 64px;
    padding: 4px 16px !important;
    margin: 0;
    align-items: center;
    display: flex;
    position: relative;
    z-index: 0;
}

.fixer span {
    line-height: 2.5rem;
    letter-spacing: 0.0073529412em !important;
    font-family: "Roboto", sans-serif !important;
    margin-left: 25px;
}
</style>
