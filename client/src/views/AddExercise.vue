<template>
  <div>
    <div class="row">
      <div class="col-6" v-if="!addNewExercise">
        <nav class="navbar navbar-dark bg-dark">
          <span class="navbar-brand mb-0 h1">Exercises</span>
          <button 
            class="btn btn-success float-right oi oi-plus"
            @click="addNewExercise=true"
            />
        </nav>
        <div class="search">
          <span class="fa fa-search"></span>
          <input type="text" 
                class="form-control" 
                v-model="exerciseSearch" 
                @input="findExercise" 
                @change="findExercise" 
                placeholder="Search Exercises...."/>
        </div>
        <div class="list-group"> 
          <button 
            type="button" 
            class="list-group-item list-group-item-action" 
            v-for="exercise in exercises"
            @click="selectedExercise=exercise">
            {{exercise.exerciseName}}
          </button>
        </div>
      </div>
      <div class="col-6" v-if="addNewExercise">
        <nav v-if="addNewExercise" class="navbar navbar-dark bg-dark">
          <span class="navbar-brand mb-0 h1">Add New Exercises</span>
          <button 
            class="btn btn-secondary float-right oi oi-action-undo"
            @click="addNewExercise=false"
            />
        </nav>
        <form @submit.prevent="createExercise">
          <div class="form-group">
            <label for="ExerciseName">Exercise Name</label>
            <input type="text" required v-model="newExercise.exerciseName"
              class="form-control" name="NewExerciseName" id="NewExerciseName" aria-describedby="newExerciseName">
          </div>
          <div class="form-group">
            <label for="ExerciseCalPerHour">CalPerHour</label>
            <input type="number" required v-model="newExercise.caloriesPerHour"
              class="form-control" name="NewExerciseName" id="NewExerciseCalPerHour" aria-describedby="newExerciseCalPerHour">
          </div>
          <div class="form-group">
            <label for="ExerciseType">Exercise Type</label>
            <select class="custom-select custom-select-lg mb-3" v-model="newExercise.type">
              <option v-for="exerciseType in exerciseTypes" >{{exerciseType}}</option>
            </select>
          </div>
          <div class="form-group">
            <button 
              type="submit" 
              class="btn btn-primary">
              Create Exercise
            </button>
          </div>
        </form>
      </div>
      <div class="col-6">
         <nav class="navbar navbar-dark bg-dark">
          <span class="navbar-brand mb-0 h1">Entry</span>
        </nav>
        <form @submit.prevent="addExerciseToLog">
          <div class="form-group">
            <label for="ExerciseName">Exercise Name</label>
            <input type="text" v-if="selectedExercise" v-model="selectedExercise.exerciseName"
              class="form-control" name="ExerciseName" id="ExerciseName" aria-describedby="exerciseName" readonly>
            <input class="form-control" v-if="!selectedExercise" type="text" placeholder="Select an Exercise" readonly>
          </div>
          <div class="form-group">
            <label for="Duration">Duration</label>
            <div class="row">
              <div class="col-4">
                <input type="number" max="23" min="0" v-model="durationHours"
                  class="form-control" name="ExerciseDuration" id="ExerciseDuration" aria-describedby="exerciseDuration">
              </div>
              <div class="col-2">
                <label for="Hours">Hours</label>
              </div>
              <div class="col-4">
                <input type="number" max="59" min="0" v-model="durationMinutes"
                  class="form-control" name="ExerciseDurationMinute" id="ExerciseDurationMinute" aria-describedby="exerciseDurationMinute">
              </div>
              <div class="col-2">
                <label for="Hours">Minute</label>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="exerciseDate">Exercise Date</label>
            <input type="date" v-model="exerciseDate" required placeholder="Select Date" class="form-control">
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary">Add Exercise To Log</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { getFormattedDate } from "@/models/dateUtils";
import { GetAllExercises, AddExercise, GetExerciseWithName } from "@/models/exercises";
import { AddExerciseForUser } from "@/models/userexercises";
export default {
  components: {
    vSelect
  },
  data: () => ({
    addNewExercise: false,
    newExercise: {
      exerciseName: null,
      caloriesPerHour: null,
      type: null
    },
    exerciseTypes: [
      "aerobic",
      "strength",
      "balance",
      "flexibility"
    ],
    exercises: [],
    selectedExercise: null,
    durationHours: null,
    durationMinutes: null,
    exerciseDate: getFormattedDate(new Date()),
    exerciseSearch: ""
  }),
  async mounted() {
    this.exercises = await GetAllExercises()
  },
  methods: {
    async createExercise() {
      try {
      const newExercise = await AddExercise(this.newExercise)
      this.addNewExercise = false;
      this.selectedExercise = newExercise;
      } catch(error){
        console.log(error);
      }
    },
    async addExerciseToLog() {
      try {
        const totalDurationMinutes = Number(this.durationHours*60) + Number(this.durationMinutes);
        const exerciseToAdd = {...this.selectedExercise, exerciseID: this.selectedExercise.id, date: this.exerciseDate, duration: totalDurationMinutes}
        const x = await AddExerciseForUser(exerciseToAdd)
        this.$router.push({name: "exerciselog"})
      } catch(error) {
        console.log(error);
      }
    },
    async findExercise() {
      console.log(this.exerciseSearch);
      this.exercises = await GetExerciseWithName(this.exerciseSearch);
    }
  }
}
</script>

<style>
.search {
  position: relative;
  color: #aaa;
  font-size: 16px;
}

.search input {
  height: 32px;

  background: #fcfcfc;
  border: 1px solid #aaa;
  border-radius: 5px;
  box-shadow: 0 0 3px #ccc, 0 10px 15px #ebebeb inset;
}

.search input { text-indent: 32px;}
.search .fa-search { 
  position: absolute;
  top: 10px;
  left: 10px;
}
</style>
