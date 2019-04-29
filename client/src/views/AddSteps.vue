<template>
  <div>
    <form @submit.prevent="setStepCountForDate">
      <div class="form-group">
        <label for="exerciseDate">Step Date</label>
        <input 
          type="date" 
          v-model="viewDate" 
          required 
          placeholder="Select Date" 
          class="form-control col-6"
          @change="getStepsForDate">
      </div>
      <div class="form-group">
        <label for="Step Count">Step Count</label>
        <input 
          type="number" 
          v-model="stepCount"
          class="form-control col-6" 
          name="ExerciseName" 
          id="ExerciseName" 
          aria-describedby="exerciseName">
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary">Update Step Count</button>
      </div>
    </form>
  </div>
</template>

<script>
import { getFormattedDate } from "@/models/dateUtils";
import { setStepCountForDate, getStepCountForDate } from "@/models/userstepcount";
import toastr from 'toastr';
export default {
 data: () => ({
   viewDate: getFormattedDate(new Date()),
   stepCount: null
 }),
 mounted() {
   this.getStepsForDate();
 },
 methods: {
   async getStepsForDate() {
     try {
      this.stepCount = await getStepCountForDate(this.viewDate);
     } catch (error){
       this.stepCount = 0;
     }
   },
   async setStepCountForDate() {
     try{
       console.log("Here");
       const x = await setStepCountForDate(this.viewDate, this.stepCount);
       toastr.success("Steps Updated!");
       this.$router.push({name: "exerciselog"})
     } catch(error) {
       console.log(error);
       toastr.error(error);
     }
   }
 }
}
</script>

<style>

</style>
