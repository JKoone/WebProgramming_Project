<template>
  <div>
    <h3>Step Page</h3>
    <label>Step: {{stepCount}}</label>
    <div class="progress">
      <div class="progress-bar" role="progressbar" aria-valuenow={{}} aria-valuemin="0" aria-valuemax="100" :style="{width: stepCount/dailyReqSteps * 100 +'%'}"></div>
    </div>
  </div>
</template>

<script>
import { getStepCount } from "@/models/userstepcount";

export default {
  data: () => ({
    data: {},
    stepCount: null,
    dailyReqSteps: 10000,
  }),
  async mounted() {
    // get the daily steps for the user..
    let today = new Date();
    let x  = await getStepCount(today);
    console.log(x);
    this.stepCount = x;
  },
}
</script>

<style>

</style>
