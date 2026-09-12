<script lang="ts">
import { defineComponent } from 'vue';

import BaseButton from '@/components/BaseButton.vue';
import { ButtonType, ButtonVariant, ThemeMode } from '@/types/ui';
import { themeStore } from '@/stores/themeStore';

export default defineComponent({
    name: 'BaseThemeToggle',

    components: {
        BaseButton,
    },

    data(): {
        ButtonType: typeof ButtonType;
        ButtonVariant: typeof ButtonVariant;
        ThemeMode: typeof ThemeMode;
    } {
        return {
            ButtonType,
            ButtonVariant,
            ThemeMode,
        };
    },

    computed: {
        isDark(): boolean {
            return themeStore.mode === ThemeMode.DARK;
        },

        label(): string {
            return this.isDark ? 'Switch to light mode' : 'Switch to dark mode';
        },
    },

    methods: {
        toggleTheme(): void {
            themeStore.toggle();
        },
    },
});
</script>

<template>
    <BaseButton
        :type="ButtonType.BUTTON"
        :variant="ButtonVariant.SECONDARY"
        :aria-label="label"
        :title="label"
        @click="toggleTheme"
    >
        <span aria-hidden="true">
            {{ isDark ? '☀️' : '🌙' }}
        </span>

        {{ isDark ? 'Light' : 'Dark' }}
    </BaseButton>
</template>
