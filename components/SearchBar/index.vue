<template>
    <div class="bg-gray-200 py-6 px-20 flex justify-between items-center rounded-lg">
      <div class="flex flex-row align-items-center font-semibold">
        Search by release date:
        <input type="text" class="border border-1 border-gray-300 ml-5">
      </div>
      <button class="bg-blue-400 rounded-full py-1 px-3 text-white">Search</button>
    </div>
</template>

<script>
export default {
  name: 'SearchBar'
}
</script>
