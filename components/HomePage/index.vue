<template>
  <div>
    <div class='w-full h-10 bg-green-500'></div>

    <div class='w-2/3 mx-auto'>
      <div class='py-20'>
        <SearchBar />
      </div>

      <MovieList />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>
