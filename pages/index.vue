<template>
  <div class="container">
    <navbar></navbar>
    <p>Home</p>
    <form>
      <p>Company <input v-model="company" type="text" /></p>
      <p>Name <input v-model="name" type="text" /></p>
      <p>Phone <input v-model="phone" type="text" /></p>
      <div class="color-selector">
        <span
          v-for="color in form.colors" :key="color"
          :style="{ 'background-color': color }"
          @click="setColor(color)"
        >
          {{ color }}
        </span>
      </div>
    </form>
    <div class="example" :style="{ 'background-color': bgcolor }">
      <div class="company">{{ company }}</div>
      <div>{{ name }}</div>
      <div>{{ phone }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import navbar from "@/components/navbar.vue"
export default Vue.extend({
  data() {
    return {
      company: "Company Title",
      name: "",
      phone: "",
      bgcolor: "white",
      form: {
        colors: ["red", "blue", "green", "orange", "yellow"],
      },
    };
  },
  components: {navbar},
  methods: {
    login() {
      
    },
    setColor(color: string) {
      console.log(color)
      this.bgcolor = color
    }
  }
});
</script>

<style>
form {
  margin: 20px;
}
.example {
  border: 1px solid black;
  border-radius: 4px;
  display: inline-block;
  width: 400px;
}
.company {
  font-size: 120%;
}
.color-selector {
  padding: 15px;
}
.color-selector span {
  display: inline-block;
  width: 70px;
  height: 45px;
}
</style>