<script lang="ts">
import { defineComponent } from 'vue';

import type { Post } from '@/types/post';

import PostCard from './PostCard.vue';

export default defineComponent({
    name: 'PostList',

    components: {
        PostCard,
    },

    props: {
        posts: {
            type: Array as () => Post[],
            required: true,
        },

        loading: {
            type: Boolean,
            default: false,
        },
    },

    emits: {
        edit: (post: Post) => {
            return (
                typeof post.id === 'number' &&
                typeof post.title === 'string' &&
                post.content === 'string'
            );
        },
        delete: (id: number) => {
            return typeof id === 'number';
        },
    },
});
</script>

<template>
    <div class="post-list">
        <div v-if="loading" class="empty-state">Loading posts...</div>

        <div v-else-if="posts.length === 0" class="empty-state">
            <p>No posts yet.</p>
            <p>Create your first post above.</p>
        </div>

        <div v-else class="posts">
            <PostCard
                v-for="post in posts"
                :key="post.id"
                :post="post"
                @edit="$emit('edit', post)"
                @delete="$emit('delete', post.id)"
            />
        </div>
    </div>
</template>
