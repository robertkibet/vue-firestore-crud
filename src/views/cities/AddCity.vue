<template>
  <AppHeader :loading="loading" />
  <h1>Add City</h1>
  <form class="form" @submit.prevent="addCity">
    <div class="form-group">
      <label for="name">Name</label>
      <input class="form-control" type="text" name="name" placeholder="City" />
    </div>
    <div class="form-group">
      <label for="country">Country</label>
      <input class="form-control" type="text" name="country" placeholder="Country" />
    </div>
    <button :class="['button submit', loading && 'disabled']" :disabled="loading">Save</button>
  </form>
</template>

<script setup lang="ts">
import citiesColRef from '../../utils/firebase'
import AppHeader from '../../components/AppHeader.vue'
import { addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const loading = ref(false)

const router = useRouter()

const addCity = async () => {
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
      console.log('please fill all fields')
      return
    }

    const cityDetails = {
      name: city.toLowerCase().trim(),
      country: country.toLowerCase().trim(),
      createdAt: serverTimestamp(),
      updatedAt: ''
    }
    const queryCity = await query(citiesColRef, where('name', '==', cityDetails.name))

    const querySnapshot = await getDocs(queryCity)
    const exists = querySnapshot.docs.length > 0
    if (exists) {
      console.log('city already exists')
      return
    }
    const response = await addDoc(citiesColRef, cityDetails)

    if (response.id) {
      cityForm.reset()

      alert(`${city} added successfully`)

      router.push('/')
    } else {
      alert(`Failed to add ${city}. Please try again`)
    }
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}
</script>
