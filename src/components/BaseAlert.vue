<script lang="ts">
import { defineComponent, type PropType } from 'vue';

import { AlertType } from '@/types/ui';

export default defineComponent({
    name: 'BaseAlert',

    props: {
        type: {
            type: String as PropType<AlertType>,
            default: AlertType.INFO,
        },
    },

    data(): {
        AlertType: typeof AlertType;
    } {
        return {
            AlertType,
        };
    },
});
</script>

<template>
    <div class="alert" :class="`alert-${type}`" role="alert">
        <slot />
    </div>
</template>
