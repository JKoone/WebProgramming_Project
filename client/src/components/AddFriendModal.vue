<template>
  <!-- Modal -->
  <div class="modal fade" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
        </div>
        <div class="modal-body">
          <div class="list-group" v-if="!selectedExercise"> 
            <button 
              type="button" 
              class="list-group-item list-group-item-action" 
              v-for="exercise in exercises"
              @click="selectedExercise=exercise">
              {{exercise.name}}
            </button>
          </div>
          <div v-if="selectedExercise"> 
            <h3>Selected Exercise</h3>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddFriendModal',
  data: () => ({
    exercises: [
      {name: "test2"},
      {name: "test1"},
      {name: "test0"},
      {name: "test9"},
      {name: "test8"},
      {name: "test7"},
      {name: "test6"},
      {name: "test5"},
      {name: "test4"},
      {name: "test3"},
      {name: "test2"},
      {name: "test1"},
    ],
    selectedExercise: null
  }),
  async mounted(){
    console.log("Here");
    // Grab the list of people to add friends here..
  }, 
}
</script>

<style>
.modal-body {
  max-height: calc(100vh - 30vh);
  overflow: auto;

}
</style>
