<script lang="ts">
import { defineComponent } from 'vue';

import PostsView from '@/views/PostsView.vue';

export default defineComponent({
    name: 'App',

    components: {
        PostsView,
    },
});
</script>

<template>
    <div class="app">
        <header class="header">
            <div class="container">
                <h1>My Blog</h1>
                <p>A simple Vue CRUD application</p>
            </div>
        </header>

        <PostsView />
    </div>
</template>
