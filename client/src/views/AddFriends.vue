<template>
  <div>
    <h3>Add Friends</h3>
    <ul class="list-group">
      <li class="list-group-item"  v-for="person in people" v-bind:key="person.id">
        {{person.FirstName}}
        {{person.LastName}}
        <button 
          class="btn btn-primary float-lg-right"
          @click="addFriend(person.id)">
          Add Friend
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { Globals } from "@/models/api";
import { getNonFriends, AddFriend } from "@/models/userfriends";
import toastr from 'toastr';
export default {
  data: () => ({
    Globals: Globals,
    data: {},
    people: null
  }),
  methods: {
    async addFriend(id){
      try {
        await AddFriend(id)
        this.people = this.people.filter(person => person.id != id)
        toastr.success("Friend Added!")
      } catch(error) {
        Globals.errors.push(error);
        toastr.error(error.message);
      }
    }
  },
  async mounted(){
    //We need to get all the people that are not friends..
    this.people = await getNonFriends();
  }, 
} 
</script>

<style>

</style>
