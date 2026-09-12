<script lang="ts">
import { defineComponent } from 'vue';

import type { Post, PostInput } from '@/types/post';

import BaseAlert from '@/components/BaseAlert.vue';
import BaseButton from '@/components/BaseButton.vue';
import PostForm from '@/components/posts/PostForm.vue';
import PostList from '@/components/posts/PostList.vue';

import { usePosts } from '@/composables/usePosts';

export default defineComponent({
    name: 'PostsView',

    components: {
        BaseAlert,
        BaseButton,
        PostForm,
        PostList,
    },

    setup() {
        return usePosts();
    },

    data(): {
        editingPost: Post | null;
    } {
        return {
            editingPost: null,
        };
    },

    mounted(): void {
        this.loadPosts();
    },

    methods: {
        async handleSubmit(data: PostInput): Promise<void> {
            await this.savePost(this.editingPost?.id ?? null, data);

            this.editingPost = null;
        },

        handleEdit(post: Post): void {
            this.editingPost = post;

            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        },

        handleCancel(): void {
            this.editingPost = null;
        },

        async handleDelete(id: number): Promise<void> {
            if (!confirm('Are you sure you want to delete this post?')) {
                return;
            }

            await this.removePost(id);

            if (this.editingPost?.id === id) {
                this.editingPost = null;
            }
        },
    },
});
</script>

<template>
    <main class="container">
        <PostForm
            :post="editingPost"
            :saving="saving"
            @submit="handleSubmit"
            @cancel="handleCancel"
        />

        <BaseAlert v-if="error" type="error">
            {{ error }}
        </BaseAlert>

        <section class="posts-section">
            <div class="section-header">
                <h2>Posts</h2>

                <BaseButton variant="secondary" :loading="loading" @click="loadPosts">
                    Refresh
                </BaseButton>
            </div>

            <PostList :posts="posts" :loading="loading" @edit="handleEdit" @delete="handleDelete" />
        </section>
    </main>
</template>
