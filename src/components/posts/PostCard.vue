<script lang="ts">
import { defineComponent } from 'vue';

import type { Post } from '@/types/post';

import BaseButton from '@/components/BaseButton.vue';

export default defineComponent({
    name: 'PostCard',

    components: {
        BaseButton,
    },

    props: {
        post: {
            type: Object as () => Post,
            required: true,
        },
    },

    emits: {
        edit: () => true,
        delete: () => true,
    },
});
</script>

<template>
    <article class="post-card">
        <div class="post-content">
            <h3>
                {{ post.title }}
            </h3>

            <p>
                {{ post.content }}
            </p>
        </div>

        <div class="post-actions">
            <BaseButton variant="secondary" @click="$emit('edit')"> Edit </BaseButton>

            <BaseButton variant="danger" @click="$emit('delete')"> Delete </BaseButton>
        </div>
    </article>
</template>
