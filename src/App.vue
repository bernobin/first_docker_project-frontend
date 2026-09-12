<script lang="ts">
import { defineComponent } from 'vue';

import PostsView from '@/views/PostsView.vue';
import BaseThemeToggle from '@/components/BaseThemeToggle.vue';

export default defineComponent({
    name: 'App',

    components: {
        PostsView,
        BaseThemeToggle,
    },
});
</script>

<template>
    <div class="app">
        <header class="header">
            <div class="container header-content">
                <div>
                    <h1>My Blog</h1>
                    <p>A simple Vue CRUD application</p>
                </div>

                <BaseThemeToggle />
            </div>
        </header>

        <PostsView />
    </div>
</template>
