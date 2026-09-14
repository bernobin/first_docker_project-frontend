<script lang="ts">
import { defineComponent } from 'vue';

import type { Post, PostInput } from '@/types/post';

import BaseButton from '@/components/BaseButton.vue';
import PostForm from '@/components/posts/PostForm.vue';
import PostList from '@/components/posts/PostList.vue';

import { usePosts } from '@/composables/usePosts';
import { AlertType, ButtonVariant } from '@/types/ui';
import BaseToast from '@/components/BaseToast.vue';

export default defineComponent({
    name: 'PostsView',

    components: {
        BaseButton,
        PostForm,
        PostList,
        BaseToast,
    },

    setup() {
        return usePosts();
    },

    data(): {
        editingPost: Post | null;
        AlertType: typeof AlertType;
        ButtonVariant: typeof ButtonVariant;
    } {
        return {
            editingPost: null,
            AlertType,
            ButtonVariant,
        };
    },

    mounted(): void {
        this.loadPosts();
    },

    methods: {
        async handleSubmit(data: PostInput): Promise<void> {
            console.log('submit', this.$refs.postForm);
            await this.savePost(this.editingPost?.id ?? null, data);

            this.editingPost = null;
            const postForm = this.$refs.postForm as InstanceType<typeof PostForm>;
            postForm.reset();
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
            ref="postForm"
            :post="editingPost"
            :saving="saving"
            @submit="handleSubmit"
            @cancel="handleCancel"
        />

        <BaseToast v-if="error" :type="AlertType.SUCCESS" @close="error = null">
            {{ error }}
        </BaseToast>

        <section class="posts-section">
            <div class="section-header">
                <h2>Posts</h2>

                <BaseButton
                    :variant="ButtonVariant.SECONDARY"
                    :loading="loading"
                    @click="loadPosts"
                >
                    Refresh
                </BaseButton>
            </div>

            <PostList :posts="posts" :loading="loading" @edit="handleEdit" @delete="handleDelete" />
        </section>
    </main>
</template>
