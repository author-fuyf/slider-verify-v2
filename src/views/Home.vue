<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <v-button type="warning" @eclick="handlerClick"></v-button>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    // HelloWorld,
  },
  methods: {
    handlerClick() {
      console.log('$test => ', this.$test)
      this.$toast({
        test: 'test',
        test2: 'test2',
        msg: 'msg'
      })
    }
  }
};
</script>
