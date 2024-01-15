<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { mdiAccount, mdiAsterisk } from '@mdi/js'
import SectionFullScreen from '@/components/SectionFullScreen.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadio from '@/components/FormCheckRadio.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import LayoutGuest from '@/layouts/LayoutGuest.vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import axios from 'axios'

const form = reactive({
  login: '',
  pass: '',
  remember: true
})

const loading = ref(false)
const err = ref(false)
const scc = ref(false)

const modalThreeActive = ref(false)
const router = useRouter()


const submit = () => {
  loading.value = true
  axios
    .post("/login", {
      form
    })
    .then(function (response) {
      // handle success
      scc.value = response.data.message;
      successNotification.value?.showToast();
      const access_token = response.data.data.access_token
      localStorage.setItem("access_token", access_token);
      axios.defaults.headers.common['Authorization'] = "Bearer: " + access_token
      router.push(`/`);
    })
    .catch(function (error) {
      // handle error
      err.value = error?.response?.data?.message;
      modalThreeActive.value = true
      loading.value = false
    });
};
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <FormField label="Username" help="Please enter your username">
          <FormControl
            v-model="form.login"
            :icon="mdiAccount"
            name="login"
            autocomplete="username"
          />
        </FormField>

        <FormField label="Password" help="Please enter your password">
          <FormControl
            v-model="form.pass"
            :icon="mdiAsterisk"
            type="password"
            name="password"
            autocomplete="current-password"
          />
        </FormField>

        <FormCheckRadio
          v-model="form.remember"
          name="remember"
          label="Remember"
          :input-value="true"
        />

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Login" />
            <BaseButton to="/" color="info" outline label="Back" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
  <CardBoxModal v-model="modalThreeActive" title="Login failed!" button="danger" button-label="Close">
    <p>Invalid username or password. Please try again!</p>
  </CardBoxModal>
</template>
