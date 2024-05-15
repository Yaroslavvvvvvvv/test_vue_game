<script setup>
import MButton from "../components/ui/molecules/MButton.vue";
import {ref, computed} from 'vue';
import useVuelidate from "@vuelidate/core";
import {required, minLength, email} from "@vuelidate/validators";
import {useRouter} from "vue-router";
import {toast} from 'vue3-toastify';
import "vue3-toastify/dist/index.css";

const router = useRouter()

const formData = ref({
  email: "",
  password: ""
})

const rules = computed(()=>{
  return {
    email: {required, email},
    password: {required, minLength: minLength(6)}
  }
})

const v$ = useVuelidate(rules, formData);


const signIn = async () => {
  const result = await v$.value.$validate();
  if (result) {
    toast.success('Success, form submitted!');
    setTimeout(() => {
      router.push('/game');
    }, 2000);
  } else {
    toast.error('Error, form not submitted');
    formData.value.email = '';
    formData.value.password = '';
  }
}
</script>

<template>
  <section class="bg-gray-50">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Sign in to your account
          </h1>
          <form @submit.prevent="signIn" class="space-y-4 md:space-y-6" action="#">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
              <input
                  v-model="formData.email"
                  placeholder="name@company.com"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
              <span v-for="error in v$.email.$errors"
                    :key="error.$uid" class="text-red-500">
                {{error.$message}}
              </span>
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
              <input
                  v-model="formData.password"
                  type="password" name="password" id="password" placeholder="••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
              <span v-for="error in v$.password.$errors"
                    :key="error.$uid" class="text-red-500">
                {{error.$message}}
              </span>
            </div>
            <MButton type="submit" title="Sign in" class="w-full"/>
          </form>

        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>