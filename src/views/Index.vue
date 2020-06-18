<template>
    <b-container fluid class="p-0">
    <navbar />
    <index />
    </b-container>
</template>

<script>
import Navbar from '@/components/navbar/index.vue';
import Index from '@/components/index/index.vue';

export default {
  components: {
    Index,
    Navbar
  }
}
</script>
