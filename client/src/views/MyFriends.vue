<template>
  <div class="container">
    <div v-if="Globals.user">
      <div class="row">
        <div class="col-10">
          <h3>{{Globals.user.FirstName}} Friends Page</h3>
        </div>
        <div class="col-2">
          <button type="button" class="btn btn-success" @click="navigateTo({name: 'addfriends'})">
            Add Friends
          </button>
        </div>
      </div>
      <ul class="list-group">
        <li class="list-group-item" v-for="friend in friends" v-bind:key="friend.id">
          First Name: {{friend.FirstName}}
          Last Name: {{friend.LastName}}
          <div class="float-lg-right">
          <button 
          class="btn btn-secondary"
          @click="viewExerciseLog(friend.id)">
          View Exercise Log
          </button>
          <button 
          class="btn btn-danger"
          @click="removeFriend(friend.id)">
          Remove Friend
        </button>
        </div>
        </li>
      </ul>
    </div>
    <AddFriendModal ref="modal"></AddFriendModal>
  </div>
</template>

<script>
import { Globals } from "@/models/api";
import { GetFriends, RemoveFriend } from "@/models/userfriends";
import AddFriendModal from "@/components/AddFriendModal";
import $ from 'jquery';
export default {
  data: () => ({
    Globals: Globals,
    data: {},
    friends: null
  }),
  methods: {
    showModal(){
      console.log("Here-ShowModal");
      let element = this.$refs.modal.$el
      $(element).modal('show')
    },
    navigateTo(route){
      this.$router.push(route);
    },
    viewExerciseLog(friendId){
      const route = {name: "exerciselog", params: { userID: friendId }};
      this.navigateTo(route);
    },
    async removeFriend(friendId){
      // Remove the friend
      await RemoveFriend(friendId)
      // Update the friends list 
      this.friends = await GetFriends();
    }
  },
  async mounted(){
    this.friends = await GetFriends();
  }, 

  components: {
    AddFriendModal
  },
}
</script>

<style>

</style>
