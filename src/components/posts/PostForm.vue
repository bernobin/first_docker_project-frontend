<script lang="ts">
import { defineComponent } from 'vue';

import type { Post, PostInput } from '@/types/post';

import BaseButton from '@/components/BaseButton.vue';
import { ButtonVariant } from '@/types/ui';

export default defineComponent({
    name: 'PostForm',

    components: {
        BaseButton,
    },

    props: {
        post: {
            type: Object as () => Post | null,
            default: null,
        },

        saving: {
            type: Boolean,
            default: false,
        },
    },

    emits: {
        submit: (data: PostInput) => {
            return typeof data.title === 'string' && typeof data.content === 'string';
        },

        cancel: () => true,
    },

    data(): {
        title: string;
        content: string;
        error: string;
        ButtonVariant: typeof ButtonVariant;
    } {
        return {
            title: '',
            content: '',
            error: '',
            ButtonVariant,
        };
    },

    computed: {
        isEditing(): boolean {
            return this.post !== null;
        },
    },

    watch: {
        post: {
            immediate: true,

            handler(post: Post | null): void {
                this.title = post?.title ?? '';
                this.content = post?.content ?? '';
                this.error = '';
            },
        },
    },

    methods: {
        submit(): void {
            this.error = '';

            if (!this.title.trim() || !this.content.trim()) {
                this.error = 'Please enter both a title and content.';
                return;
            }

            this.$emit('submit', {
                title: this.title.trim(),
                content: this.content.trim(),
            });
        },

        cancel(): void {
            this.error = '';
            this.$emit('cancel');
        },

        reset(): void {
            console.log('reset');
            this.title = '';
            this.content = '';
            this.error = '';
        },
    },
});
</script>

<template>
    <section class="card">
        <div class="section-header">
            <h2>
                {{ isEditing ? 'Edit Post' : 'New Post' }}
            </h2>

            <BaseButton
                v-if="isEditing"
                :variant="ButtonVariant.SECONDARY"
                :disabled="saving"
                @click="cancel"
            >
                Cancel
            </BaseButton>
        </div>

        <form @submit.prevent="submit">
            <div class="form-group">
                <label for="post-title"> Title </label>

                <input
                    id="post-title"
                    v-model="title"
                    type="text"
                    placeholder="Enter a title..."
                    :disabled="saving"
                />
            </div>

            <div class="form-group">
                <label for="post-content"> Content </label>

                <textarea
                    id="post-content"
                    v-model="content"
                    rows="5"
                    placeholder="Write something..."
                    :disabled="saving"
                ></textarea>
            </div>

            <div v-if="error" class="error">
                {{ error }}
            </div>

            <BaseButton type="submit" :variant="ButtonVariant.PRIMARY" :loading="saving">
                {{ isEditing ? 'Update Post' : 'Create Post' }}
            </BaseButton>
        </form>
    </section>
</template>
