<template>
      <div class="custom-body">
    <div class="container">
    <h2>Login</h2>
    <form action="">
      <input type="text" id="name" name="name" placeholder="Username" v-model="username">
      <span class="text-danger" v-if="v$.username.$error">{{ v$.username.$errors[0].$message }}</span>
      <input type="password" id="password" name="password" placeholder="Password" v-model="password">
      <span class="text-danger" v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</span>
      <button type="button" class="btn btn-primary" @click="logIn">Log in</button>
      <div class="account-display">
      <p>Not a member ?</p>
      <p class="log-in" @click="this.$router.push('/')">Sign up</p>
      </div>
    </form>
    </div>
</div>
</template>

<script>
import useValidate from '@vuelidate/core';
import { required, minLength} from '@vuelidate/validators';
    export default{
        data(){
            return{
                    v$: useValidate(),
                    username: '',
                    password: '',
            }
        },

        validations(){
            return{
                username: {required},
                password: {required, minLength: minLength(8)},
            }
        },

        methods: {
            logIn(){
                this.v$.$validate()
                if (!this.v$.$error) {
                    const formData = JSON.parse(localStorage.getItem('formData'));
                    if(formData && this.username     === formData.email && this.password === formData.password){
                    this.$router.push('/tasklist')
                    console.log("form accepted")
                    }

                    else{
                        console.log("invalid credentials")
                    }
                }
                else{
                    console.log("form rejected")
                }
            }
        }
    }

    
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu&display=swap');
*{
    margin: 0;
    padding: 0;
    font-family: 'Ubuntu', sans-serif;
    box-sizing: border-box;
}

.custom-body {
  min-height: 100vh;
  background: linear-gradient(270deg, #8a7e9b, #727fa3);
}

.container{
   position:relative;
   top: 80px;
    max-width: 330px;
    display: flex;
    flex-direction: column;
    background-color: #e6e3e3;
    box-shadow: rgb(42, 66, 92) 0px 20px 30px -10px;
    border-radius: 10px;
}

h2{
    text-align: center;
    color: #535252;
    font-weight: 600;
    padding: 15px;
}

input[type="text"],
input[type="email"],
input[type="password"] {
    width: 89%;
    padding: 5px;
    margin: 0 0 20px 22px;
    border: none;
    border-bottom: 2px solid #b6b4b4;
    background-color: #e6e3e3;
    outline: none;
}

.account-display{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.account-display p{
    margin-bottom: 12px;
}

.log-in{
    margin: 0 0 0 5px;
    font-weight: bold;
    cursor: pointer;
}


button{
    margin: 5px 30px 21px 30px;
    width: 249px;
    background:linear-gradient(270deg, #5c3199, #556cac);
    border: none;
}
</style>
