<script lang="ts">
import { defineComponent, type PropType } from 'vue';

import { ButtonVariant, ButtonType } from '@/types/ui';

export default defineComponent({
    name: 'BaseButton',

    props: {
        variant: {
            type: String as PropType<ButtonVariant>,
            default: ButtonVariant.PRIMARY,
        },

        type: {
            type: String as PropType<ButtonType>,
            default: ButtonType.BUTTON,
        },

        disabled: {
            type: Boolean,
            default: false,
        },

        loading: {
            type: Boolean,
            default: false,
        },
    },
});
</script>

<template>
    <button
        :type="type"
        class="button"
        :class="`button-${variant}`"
        :disabled="disabled || loading"
    >
        <span v-if="loading" class="button-spinner"> ... </span>

        <slot v-else />
    </button>
</template>
