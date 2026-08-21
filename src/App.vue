<script setup>
async function sayHello() {
  const response = await fetch('/api/hello', {
    method: 'POST',
  });

  const data = await response.json();

  console.log(data);
}
</script>

<template>
  <main>
    <h1>Hello Docker</h1>

    <button @click="sayHello">Hello</button>
  </main>
</template>
