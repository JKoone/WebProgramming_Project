<template>
  <form @submit.prevent="updateInfo">
      <div class="form-group row">
        <label for="staticFirstName" class="col-sm-3 col-form-label">First Name</label>
        <div class="col-sm-3">
          <input v-model="data.FirstName" type="text" class="form-control" placeholder="First Name">
        </div>
        <label for="staticLastName" class="col-sm-3 col-form-label">Last Name</label>
        <div class="col-sm-3">
          <input v-model="data.LastName" type="text" class="form-control" placeholder="Last Name">
        </div>
      </div>
      <hr class="separator">
      <div class="form-group row">
        <label for="staticFirstName" class="col-sm-3 col-form-label">Age</label>
        <div class="col-sm-3">
          <input v-model="data.Age" @input="ageChange" type="number" class="form-control" placeholder="Age">
        </div>
        <label for="staticFirstName" class="col-sm-3 col-form-label">Birthday</label>
        <div class='col-sm-3'>
          <input type="date" v-model="data.Birthday" @input="birthdayChange" placeholder="Select Date" class="form-control">
        </div>
      </div>
      <hr class="seperator">
      <div class="form-group row">
        <label for="height" class="col-sm-2 col-form-label">Height</label>
        <div class="col-sm-1">
          <select v-model.number="data.heightFeet" class="form-control" id="exampleFormControlSelect2">
            <option v-for="i in 7" v-bind:value="i" v-bind:key="i">{{i}}</option>
          </select>
        </div>
        <label for="heightFeet" class="col-sm-1 col-form-label">ft.</label>
        <div class="col-sm-1">
          <select v-model.number="data.heightInch" class="form-control" id="exampleFormControlSelect2">
            <option v-for="i in 11" v-bind:value="i" v-bind:key="i">{{i}}</option>
          </select>
        </div>
        <label for="heightFeet" class="col-sm-1 col-form-label">in.</label>
        <label for="weight" class="col-sm-3 col-form-label">Weight (lbs.)</label>
        <div class="col-sm-3">
          <input v-model="data.Weight" type="number" id="disabledTextInput" class="form-control" placeholder="Weight" max="400">
        </div>
      </div>
      <div class="form-group row">
        <div class="col-sm-10">
          <button type="submit" class="btn btn-primary">Update Info.</button>
        </div>
      </div>
  </form>
</template>

<script>
// Import required dependencies 
import 'bootstrap/dist/css/bootstrap.css';
// Import this component
import datePicker from 'vue-bootstrap-datetimepicker';
// Import date picker css
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Globals } from "@/models/api";
import { Update } from "@/models/users";
import toastr from 'toastr';
import _ from 'lodash';
// In this page we'll create methods for modifying a user..
// This includes any of the user properties as well as add any contact methods..
export default {
  data: () => ({
    data: _.cloneDeep(Globals.user),
    options: {
      format: 'MM/DD/YYYY',
      useCurrent: false,
    }       
  }),
  mounted() {
    // Custom value setting needs to take place
    // Convert Birthday
    // Convert Height to Feet / Inch
    if(this.data.Birthday){
      this.data.Birthday = this.data.Birthday.split("T")[0];
      this.birthdayChange()
    }
    if(this.data.Height){
      this.data.heightFeet = Math.floor(this.data.Height / 12);
      this.data.heightInch = this.data.Height % 12;
    }
    // force an update on the page. This was the best option found since the height values were not properly updated.
    this.$forceUpdate();
  },
  components: {
    datePicker
  },
  methods: {
    async updateInfo() {
      try {
        this.data.Height = Number(this.data.heightFeet * 12) + Number(this.data.heightInch);
        const m = await Update(this.data)
        console.log(m);
        toastr.success("Info updated successfully.")
      } catch(error) {

      }
    },
    ageChange() {
      // User changed the age, unset the birthdate as it might not make any sense...
      this.data.date = null;
    },
    birthdayChange() {
      let currentYear = (new Date()).getFullYear();
      let currentMonth = (new Date()).getMonth();
      let currentDay = (new Date()).getDate();

      let birthYear = new Date(this.data.Birthday).getFullYear();
      let birthMonth = new Date(this.data.Birthday).getMonth();
      let birthDay = new Date(this.data.Birthday).getDate();
      
      // Calculate the age greedily 
      let yearDifference = currentYear - birthYear;
      
      // We aren't going to get lower than 0 years old 
      if(yearDifference == 0) { this.data.age = 0}

      // Adjust the age based on month and date difference
      if(birthMonth > currentMonth) {
        yearDifference = yearDifference - 1;
      } else if(birthMonth == currentMonth) {
        if(birthDay > currentDay ) {
          yearDifference = yearDifference - 1;
        }
      }
      this.data.Age = yearDifference;
    }
  }
}

</script>

<style>

</style>
