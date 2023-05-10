<template>
  <NewForm />
  <FormValidate />
</template>

<script>

import FormValidate from './components/FormValidate.vue';
import NewForm from './components/NewForm.vue';

export default {
  name: 'App',
  components: {
    NewForm,
    FormValidate
}
}
</script>

<style>
* {
  font-family: "Rubik", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  margin: 0 auto;
}
</style>
