<template>
   <v-main>
       <v-row>
           <v-col class='col-lg-3 col-md-3 col-sm-3 '></v-col>
           <v-col class='col-lg-6 col-md-6 col-sm-6 col-12'>


        <div class='container'>
       <v-card class='lime darken2'>
        <v-container>
          <List :tasks='tasks' @deleter='Deleter' @add-comment='AddComment'/>
        </v-container>
      
       </v-card>
         </div>
       </v-col>
       <v-col class='col-lg-3 col-md-3 col-sm-3'></v-col>
       </v-row>
       <div @click='Dialoger()'>
       <ActionButton color='teal'/>
       </div>
       <v-dialog v-model="dialog" width='320px'>
               <v-card>
          <v-container>
                <v-img
                class="white--text"
              src='https://images.pexels.com/photos/5198239/pexels-photo-5198239.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
              height="240px"
            >
            <v-card-title class='text-h5'>
             New Task<v-spacer></v-spacer>
             <v-icon color='white' @click='dialog=false'>mdi-close</v-icon>
        </v-card-title>
            </v-img>
          <v-container>
              <v-text-field solo filled label='Task' v-model='title' maxlength='50' Placeholder='Enter The Name of your Task'>
              </v-text-field>
               <span><v-text-field label='Overdue date' v-model='date' readonly>
                   
              </v-text-field></span><span><v-btn icon @click="dater=!dater"><v-icon>mdi-calendar</v-icon></v-btn></span>
              <v-textarea filled label='description' height='70px' maxlength='120' v-model='description'></v-textarea>
              
          </v-container>
       
          </v-container>
        
         
        </v-card>
          <v-btn dark :elevation='15' class='add' @click='Adder()' color='purple darken3' absolute fab>
        <v-icon>
            mdi-plus
        </v-icon>
          </v-btn>
       </v-dialog>

       <v-dialog v-model='dater' width="350px">
          
               
    <v-date-picker
      v-model="date"
    ><v-btn flat depressed @click='dater=false' justify='center'>set</v-btn></v-date-picker>


       </v-dialog>
   </v-main> 
</template>

<script>
import List from './List'
import ActionButton from '../ActionButton'

export default {
    name: 'MainArea',
    data () {
        return {
           tasks: [],
           dialog: false,
           title: '',
           description: '',
           status: '',
           date: '',
           dater: false
        }
    },
    props: {
         name: String
    },
    components: {
        List, ActionButton
    },
    methods: {
        Dialoger() {
             this.dialog = !this.dialog
             this.title = ""
             this.description = ""             
        },
       async  Adder () {
            var dec = false
              this.tasks.forEach(task=>{
                if(task.title ===this.title) {
                   alert('Query with the same already exists')
                    dec = true
                }
                
            })
            if(this.name=='' ){ 
                alert('Add Name')
            }
            else  if(this.description=='' ){ 
                alert('Add description')
            }
            else if(dec) {
                alert('Task name already Taken')
            }
            else{
            const task = {
                title: this.title,
                description: this.description,
                date: this.date,
                comments: []
            }
            this.tasks.push(task)
            console.log(this.name)
             await fetch(`http://localhost:5000/api/queries/${this.name}`,{
               method: 'POST',
               body: JSON.stringify(task),
                headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
            })
            this.dialog = false
            }
           
        },
        getMonth (month) {
            switch(month) {
                case '01': return 'January'
                case '02': return 'February'
                case '03': return 'March'
                case '04': return 'April'
                case '05': return 'May'
                case '06': return 'June'
                case '07': return 'July'
                case '08': return 'August'
                case '09': return 'September'
                case '10': return 'October'
                case '11': return 'November'
                case '12': return 'December'

            }
        },
        async Deleter (task) {
            console.log('MainArea',task)

            this.tasks = this.tasks.filter(Ttask => {
                if(Ttask!=task){
                    return Ttask
                }
            })
            await fetch(`http://localhost:5000/api/queries/${this.name}`,{
               method: 'DELETE',
               body: JSON.stringify(task),
                headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
            })
        },
        async AddComment (pstask) {
            console.log('MainArea', pstask)
            this.tasks = this.tasks.filter(Ttask => {
                if(Ttask.title==pstask.title){
                    return pstask
                }
                else return Ttask
            })
           await fetch(`http://localhost:5000/api/queries/${this.name}`,{
               method: 'PUT',
               body: JSON.stringify(pstask),
                headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
            })  
        }
    },
    async created() {
        const pseudo = await fetch(`http://localhost:5000/api/queries/${this.name}`)
        const res = await pseudo.json()
        console.log(res)
        this.tasks = res
       /* this.tasks= [{
            title: 'Add Dark',
            description: 'Add Dark theme to the app',
            date: '28 May',
            status: 'pending',
            comments: 
                [
                    {
                        name: 'Suhan',
                        comment: "Okay, I will do it"
                    },
                    {
                        name: 'Vic',
                        comment: "Okay, You will do it" 
                    }
                ]
            
        },
        {
            title: 'Add Light',
            description: 'Add Light theme to the app and always be a very very good boy',
            date: '29 May',
            status: 'pending',
            comments: 
                [
                    {
                        name: 'Suhan',
                        comment: "Okay, I will do it"
                    },
                    {
                        name: 'Vic',
                        comment: "Add Light theme to the app and always be a very very good boy" 
                    }
                ]
            
        },
        {
            title: 'Add ',
            description: 'Add theme to the app',
            date: '30 May',
            status: 'completed',
            comments: 
                [
                    {
                        name: 'Suhan',
                        comment: "Okay, I will do it"
                    },
                    {
                        name: 'Vic',
                        comment: "Okay, You will do it" 
                    }
                ]
            
        }]*/
    }
}
</script>

<style scoped>
.add {
  position: absolute;
  bottom: 15px;
  left: 47.5%;
    
}

@media (max-width: 600px) {
    .add {
        left: 42.5%

    }
}
    
@media (min-width: 1200px) {
    .add {
        bottom: 4%;

    }
}
@media (min-width: 1400px) {
    .add {
        bottom: 8%;

    }
}
  


</style>
