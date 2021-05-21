<template>
<v-container>
   
     <v-main>
     
    <v-row>
     <v-col class='col-lg-3 col-xl-3 col-sm-4 col-12' v-for='task in tasks' :key='task'>
         <div >
         <Card :name='task.name' @delete-query='Deleter(task)' @route-to-task='Router(task)' :description='task.description'/>
         </div>
     </v-col>
    </v-row>
    <span @click='displayer()'>
    <ActionButton color='teal' />
    </span>
    <v-dialog v-model='dialog' width='320px'>
        <v-card>
          <v-container>
                <v-img
                class="white--text"
              src='https://images.pexels.com/photos/5198239/pexels-photo-5198239.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
              height="240px"
            >
            <v-card-title class='text-h5'>
             New Query<v-spacer></v-spacer>
             <v-icon color='white' @click='close()'>mdi-close</v-icon>
        </v-card-title>
            </v-img>
          <v-container>
              <v-text-field solo filled label='Query' v-model='name' Placeholder='Enter The Name of your Query'>
              </v-text-field>
              <v-textarea filled label='description' height='70px' maxlength='120' v-model='description'></v-textarea>
              
          </v-container>
       
          </v-container>
        
         
        </v-card>
          <v-btn dark :elevation='15' class='add' @click='Adder()' color='orange' absolute fab>
        <v-icon>
            mdi-plus
        </v-icon>
          </v-btn>
    </v-dialog>
         <v-dialog v-model='userDialog'>
             <v-card>
        <v-card-title>Set your Username: </v-card-title>
        <v-text-field label='Username' v-model='username' placeholder='Enter your user name'></v-text-field>
        <v-btn block color='green' dark @click='AddUserName()'>Set Username</v-btn>
        </v-card>
    </v-dialog>
    </v-main>
</v-container>
</template>

<script>
import Card from './Card'
import ActionButton from '../ActionButton'
import func from '../funcs'
const {SetValue, GetValue} = func

export default {
    name: 'MainArea',
    data () {
        return {
            tasks: [{
                name: '',
                description: ''
            }],
             dialog: false,
             name: '', 
             description: '', 
             rname: '',
             rdescription: '',
             userDialog: false, 
             username: ''
        }
       
        
    },
    components: {
        Card, ActionButton
    },
    methods: {
        close () {
            this.dialog=false
        }, 
        async Adder () {
            var dec = true
            this.tasks.forEach(task=>{
                if(task.name===this.name) {
                   // alert('Query with the same already exists')
                    dec = false
                }
                
            })
            console.log(dec)
 if(dec) {
            const newTask = {
                name: this.name,
                description: this.description
            }
            
            this.tasks.push(newTask)
            console.log(this.tasks)
            await fetch('http://localhost:5000/api/queries', {
                method: 'POST',
                 body: JSON.stringify(newTask),
                 headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
            })
            this.dialog=false
 }
 else {
     alert('Query with the same already exists')
 }

        },
        Router (task) {
            console.log(task.name)
            this.rname = task.name
            this.rdescription = task.description
             this.$router.push({name:'Tasks',params: {name: task.name }})
        },
        async Deleter(task) {
                await fetch('http://localhost:5000/api/queries', {
                method: 'DELETE',
                 body: JSON.stringify(task),
                 headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
            })
            const res = await fetch('http://localhost:5000/api/queries')
          const data = await res.json()
          this.tasks = data
        },
        displayer() {
            this.dialog = !this.dialog
            this.name='',
            this.description=''
        },
        AddUserName () {
            SetValue('username',this.username)
            this.userDialog = !this.userDialog
        }
    },
   async created () {
          const res = await fetch('http://localhost:5000/api/queries')
          const data = await res.json()
          this.tasks = data
       this.username = await GetValue('username') 
       console.log('user:', this.username)
       if(this.username) {
           this.userDialog = false
       }
       else {
           this.userDialog = true
       }



    }
}

</script>

<style scoped>
.add {
  position: absolute;
  bottom: 77px;
  left: 47.5%;
    
}

@media (max-width: 600px) {
    .add {
        left: 42.5%

    }
}
    
@media (min-width: 1200px) {
    .add {
        bottom: 13%;

    }
}
@media (min-width: 1400px) {
    .add {
        bottom: 15%;

    }
}
  


</style>
