<template>
      <v-list dark color='lime darken2' three-line>

     <v-list-title class='text-h5'>Tasks</v-list-title>
            <v-list-group v-for='task in tasks' :key='task.name' active-class="green--text" multiple>
            <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title class='blue--text' >{{task.title}}</v-list-item-title>
            <v-list-item-subtitle>{{task.description}}</v-list-item-subtitle>
            <div class='text-caption' :style='{color: textColor(task.status)}'>{{task.status}}</div>
            <div class='text-caption'>{{task.date}}</div>
          </v-list-item-content>
        </template>
        <br>

 <v-title><v-switch label='Change Section' v-model='commenter'></v-switch> </v-title>
      <div v-if='commenter'> 
       <br>
       <br>
      </div>

        <v-app-bar v-show='commenter' flat class='lime white--text'><v-text-field filled rounded label='add comment' v-model='comment' placeholder='Add comment' ></v-text-field><div class='cmtbtm'> <v-btn @click="AddComment(task)" dark depressed fab color='lime'>
        <v-icon>
            mdi-plus
        </v-icon>
    </v-btn></div></v-app-bar>

        <v-list-item v-show='commenter'
          v-for="comment in task.comments"
          :key="comment"
        >
          <v-list-item-content>
            <v-list-item-title>{{comment.name}}</v-list-item-title>
             <v-list-item-subtitle>{{comment.comment}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
<v-list-item v-show='!commenter'>
          <v-list-item-content>
            <v-list-item-title>Description:<span><v-btn icon @click='Deleter(task)'><v-icon>mdi-delete</v-icon></v-btn></span></v-list-item-title>
            <v-list-item-subtitle>{{task.description}}</v-list-item-subtitle>
           </v-list-item-content>
        </v-list-item>
         <v-list-item v-show='!commenter'>
          <v-list-item-content>
            <v-list-item-title>Status:<v-overflow-btn label='status' color='lime' v-model='task.status' :items='Status'></v-overflow-btn></v-list-item-title>
           </v-list-item-content>
         </v-list-item>
           
       
       
        </v-list-group>
                
            </v-list>
</template>

<script>
import func from '../funcs'
const {GetValue} = func
export default {
    name: 'List',
    data () {
        return {
           comments: [],
           commenter: false,
           Section: 'Comment Section',
           Status: ['pending','overdue','complete'],
           comment: '',
           username: ''


        }
    },
    props: {
      tasks: Array
    },
    methods: {
        textColor(status) {
            if(status=='completed'){ 
                return '#76706a'
            }
            else if(status=='overdue') { 
                return 'red'
            }
            else return '#ee7b24'
        },
        Sectioner () {
             if(this.commeter==false){
            return 'Details Section' 

        }
        },
        Deleter (task) {
            console.log(task)
            if(confirm('Are You Sure?')){
                this.$emit('deleter', task)
            console.log(this.tasks)
            }
        },
       async AddComment (task) {
          const comment = {
            name: await GetValue('username'),
            comment: this.comment
          },
           pstask = task
          pstask.comments.push(comment)
          this.comment= ''
          this.$emit('add-comment',pstask)

        }

    },
    async created () {
       this.username = await GetValue('username')
       
    }
}

</script>
<style scoped>
.v-btn--fab.v-size--default {
    bottom: 15px;
}
span {
    margin-left: 61%;
}
@media (max-width:500px){
   span {
    margin-left: 55%;
} 
}
</style>