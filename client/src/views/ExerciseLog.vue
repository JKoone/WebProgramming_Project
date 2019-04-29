<template>
  <div class="container">
    <div class="row">
      <h3 class="col-6">
        {{user.FirstName}}'s Exercise Log 
      </h3>
      <input 
        type="date" 
        v-model="viewDate" 
        required 
        placeholder="Select Date" 
        class="form-control col-6"
        @change="updateExerciseList">
    </div>
    <div class="row">
      <div class="col-6">
        <nav class="navbar navbar-dark bg-dark">
          <span class="navbar-brand mb-0 h1">Exercises</span>
          <button v-if="isMyLog"
            class="btn btn-success float-right oi oi-plus"
            @click="navigateTo({name: 'addexercise'})"
            />
        </nav>
        <table class="table" >
          <thead>
            <tr>
              <th scope="col">Exercise Name</th>
              <th scope="col">Duration (Minutes)</th>
              <th scope="col">Exercise Type</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="exercise in exerciseList" v-bind:key="exercise.id">
              <td>{{exercise.exerciseName}}</td>
              <td>{{exercise.duration}}</td>
              <td>{{exercise.type}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-6" >
        <nav class="navbar navbar-dark bg-dark">
          <span class="navbar-brand mb-0 h1">Steps (Past 5 Days)</span>
          <button v-if="isMyLog"
            class="btn btn-success float-right oi oi-plus"
            @click="navigateTo({name: 'addsteps'})"
            />
        </nav>
        <GChart
            type="ColumnChart"
            :data="stepChartData"
            :options="stepChartOptions"
          />
      </div>
    </div>
  </div>
</template>

<script>
import { Globals } from "@/models/api"
import { GetExercisesForDate } from "@/models/userexercises";
import { GetUserWithID } from "@/models/users";
import { setStepCountForDate, getStepCountSinceDate, getStepHistoryChartData} from "@/models/userstepcount";
import { getFormattedDate } from "@/models/dateUtils";
import { GChart } from 'vue-google-charts'
export default {
  data: () => ({
    Globals: Globals,
    viewDate: getFormattedDate(new Date()),
    exerciseList: null,
    isMyLog: false,
    user: {},
    stepChartData: [],
    stepChartOptions: {
      vAxis: {
        minValue: 0
      }
    }
  }),
  async mounted() {
    if(this.$route.params.userID && Globals.user.id != this.$route.params.userID){
      this.isMyLog = false;
      this.userID = this.$route.params.userID;
      this.user = await GetUserWithID(this.userID);
    } else {
      this.isMyLog = true;
      this.user = Globals.user;
    }
    this.exerciseList = await GetExercisesForDate(this.user.id, this.viewDate);
    await this.getStepChartData()
  },
  methods: {
    async updateExerciseList(){
      this.exerciseList = await GetExercisesForDate(this.user.id, this.viewDate);
      await this.getStepChartData()
    },
    navigateTo(route){
      this.$router.push(route);
    },
    async getStepChartData(){
      let parts =this.viewDate.split('-');
      // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
      // January - 0, February - 1, etc.
      let startDate = new Date(parts[0], parts[1] - 1, parts[2]-4); 
      this.stepChartData = await getStepHistoryChartData(this.user.id, this.viewDate);
    }
  },
  components: {
    GChart
  },
}
</script>

<style>

</style>
