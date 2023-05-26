<template>
  <AppHeader :loading="loading" />

  <div class="cities">
    <div class="city" v-for="city in cities" :key="city.id">
      <router-link :to="{ path: `/cities/${city.id}` }" class="details">
        <p>{{ city.name }}</p>
        <p>{{ city.country }}</p>
      </router-link>
      <div class="actions">
        <a @click="deleteCity(city.id)" href="#" :class="['delete', loading && 'disabled']"
          >Delete</a
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '../../components/AppHeader.vue'
import citiesColRef from '../../utils/firebase'
import { getDocs, doc, deleteDoc, orderBy, query } from 'firebase/firestore'

let loading = ref(false)
let loadingDelete = ref(false)

interface CityData {
  id: string
  name: string
  country: string
}

const cities = ref([] as CityData[])

// Retrieve the existing documents from the collection
const fetchDocuments = async () => {
  try {
    loading.value = true

    const q = query(citiesColRef, orderBy('createdAt', 'desc'))

    const querySnapshot = await getDocs(q)

    let citiesResults: CityData[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data()

      citiesResults = [...citiesResults, { id: doc.id, name: data.name, country: data.country }]
    })

    console.log('citiesResults', citiesResults)
    cities.value = citiesResults
  } catch (error) {
    console.error('Error fetching documents:', error)
  } finally {
    loading.value = false
  }
}

const deleteCity = async (cityId: string) => {
  try {
    loadingDelete.value = true

    let cityRef = doc(citiesColRef, cityId)
    await deleteDoc(cityRef)
  } catch (error) {
    console.error('Error deleting city:', error)
    // Error handling or fallback actions
  } finally {
    loadingDelete.value = false
    fetchDocuments()
  }
}

// Call the function to fetch and display the documents
fetchDocuments()
</script>
