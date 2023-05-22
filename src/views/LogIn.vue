<template>
    <div class="container">
    <h2>Login</h2>
    <form action="">
      <input type="text" id="name" name="name" placeholder="Username" v-model="username">
      <span class="text-danger" v-if="v$.username.$error">{{ v$.username.$errors[0].$message }}</span>
      <input type="password" id="password" name="password" placeholder="Password" v-model="password">
      <span class="text-danger" v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</span>
      <div class="account-display">
      <p>Not a member ?</p>
      <p class="log-in" @click="this.$router.push('/')">Sign up</p>
      </div>
      <button type="button" class="btn btn-primary" @click="logIn">Log in</button>
    </form>
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
*{
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    box-sizing: border-box;
}

.container{
    max-width: 400px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    background-color: #f1f1f1;
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
    margin: 15px 0 20px 22px;
    border: none;
    border-bottom: 2px solid #c5c3c3;
    background-color: #f1f1f1;
}

.account-display{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.log-in{
    margin: 0 0 0 5px;
    font-weight: bold;
    cursor: pointer;
}

button{
    margin: 24px 80px;
    width: 217px;
}
</style>
