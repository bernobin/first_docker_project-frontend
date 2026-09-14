<script lang="ts">
import { defineComponent, type PropType } from 'vue';

import { AlertType } from '@/types/ui';

import BaseAlert from '@/components/BaseAlert.vue';

export default defineComponent({
    name: 'BaseToast',

    components: {
        BaseAlert,
    },

    props: {
        type: {
            type: String as PropType<AlertType>,
            default: AlertType.INFO,
        },
    },

    emits: ['close'],
});
</script>

<template>
    <div class="toast">
        <BaseAlert :type="type">
            <div class="toast-content">
                <div class="toast-message">
                    <slot />
                </div>

                <button
                    type="button"
                    class="toast-close"
                    aria-label="Close"
                    @click="$emit('close')"
                >
                    ×
                </button>
            </div>
        </BaseAlert>
    </div>
</template>
