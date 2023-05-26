<template>
  <AppHeader :loading="loading" :hideNew="true" />
  <h1>
    Edit <code>{{ cityId || '' }}</code>
  </h1>
  <form class="form" @submit.prevent="updateCity">
    <div class="form-group">
      <label for="name">Name</label>
      <input v-model="cityInfo.name" class="form-control" type="text" name="name" />
    </div>
    <div class="form-group">
      <label for="country">Country</label>
      <input v-model="cityInfo.country" class="form-control" type="text" name="country" />
    </div>
    <button :class="['button submit', loading && 'disabled']" :disabled="loading">Save</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '../../components/AppHeader.vue'
import citiesColRef from '../../utils/firebase'
import { getDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { useRouter, useRoute } from 'vue-router'

const loading = ref(false)
const router = useRouter()
const route = useRoute()

console.log('router', router)
let docRef: any
const cityInfo = ref({ name: '', country: '' })

const { cityId } = route.params as { cityId: string }

const getCity = async () => {
  try {
    loading.value = true

    const cityRef = doc(citiesColRef, cityId)
    docRef = cityRef
    const cityDoc = await getDoc(docRef)

    const exists = cityDoc.exists()

    if (!exists) {
      alert('City does not exist')
      return
    }

    const cityData = cityDoc.data() as { name: string; country: string }

    cityInfo.value = cityData
  } catch (error) {
    console.log('Error fetching city details', error)
  } finally {
    loading.value = false
  }
}

getCity()

const updateCity = async () => {
  if (loading.value) {
    return // Prevent multiple form submissions
  }

  try {
    loading.value = true
    const cityForm = document.querySelector('.form') as HTMLFormElement

    const formData = new FormData(cityForm)

    const city = formData?.get('name') as string
    const country = formData?.get('country') as string

    if (!city || !country) {
      alert('please fill all fields')
      return
    }

    const cityDetails = {
      name: city.toLowerCase().trim(),
      country: country.toLowerCase().trim(),
      updatedAt: serverTimestamp()
    }

    await setDoc(docRef, cityDetails)
    alert(`The city with ID of ${cityId} has been updated successfully!`)
    router.push('/')
  } catch (error) {
    console.log('Error updating City', error)
  } finally {
    loading.value = false
  }
}
</script>
