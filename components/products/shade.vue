<template>
<div>
    <p v-for="n in count" :key="n">
        <input :value="new_shade" type="text" @change="$emit('change', $event.target.new_shade)"/>
        <button v-on:click="removeCounter()">Remove</button>
        </p>
    <button v-on:click="addCounter()">Add</button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default Vue.extend({
  data() {
    return {
      count: 1,
      shades: [""],
    }
  },
  props: {
    new_shade: {
      required: true,
      type: String,
    }
  },
  methods: {
      addCounter() {
          this.count++;
      },
      removeCounter() {
          this.count--;
      },
      change() {
        //console.log(value);
        this.shades.push(this.new_shade);
      }
  }
});

</script>

<style scoped>
.container {
  width: inherit;
  height: inherit;
}
.content-container {
  height: inherit;
  width: inherit;
  margin-top: 50px;
}
h4,
p,
input {
  margin: 5px;
}
.flex-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: inherit;
  height: inherit;
}
.flex-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: inherit;
  height: inherit;
}
.save-content {
  display: flex;
  flex-direction: column;
  justify-content: right;
  align-items: right;
  width: inherit;
  height: inherit;
}
</style>