<template>
    <div class="container">
    <h2>Sign Up</h2>
    <form action="">
      <input type="text" id="name"   placeholder="Name" v-model="name">
      <span class="text-danger" v-if="v$.name.$error">{{ v$.name.$errors[0].$message }}</span>
      <input type="email" id="email" name="email" placeholder="Email address" v-model="email">
      <span class="text-danger" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</span>
      <input type="password" id="password" name="password" placeholder="Password" v-model="password">
      <span class="text-danger" v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</span>
      <input type="password" id="confirm" name="confirm" placeholder="Confirm password" v-model="confirm">
      <span class="text-danger" v-if="v$.confirm.$error">{{ v$.confirm.$errors[0].$message }}</span>
      <div class="account-display">
      <p>Already have a account ?</p>
      <p class="log-in" @click="this.$router.push('/login')">Log in</p>
      </div>
      <button type="button" class="btn btn-primary" @click="createAccount">Create Account</button>
    </form>
    </div>
</template>

<script>
import useValidate from '@vuelidate/core';
import { required, email, minLength, sameAs, alphaNum,} from '@vuelidate/validators';
    export default{
        data(){
            return{
                    v$: useValidate(),
                    name: '',
                    email: '',
                    password: '',
                    confirm: '',
            }
        },

        validations(){
            return{
                name: {required},
                email: {required, email},
                password: {required, minLength: minLength(8), alphaNum },
                confirm: {required, sameAs: sameAs(this.password)} ,
            }
        },

        methods:{
            createAccount(){
                this.v$.$validate()
                if(!this.v$.$error){
                    const formData = {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        confirm: this.confirm
                    };
                    localStorage.setItem('formData', JSON.stringify(formData))
                    this.$router.push('/login')
                }
                else {
                    console.log("failed")
                }
            },  
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
    margin: 0 0 20px 22px;
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