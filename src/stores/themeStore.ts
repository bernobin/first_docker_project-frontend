import { reactive } from 'vue';

import { ThemeMode, type ThemeMode as ThemeModeType } from '@/types/ui';

const STORAGE_KEY = 'theme';

function getStoredTheme(): ThemeModeType | null {
    const storedTheme = localStorage.getItem(STORAGE_KEY);

    if (storedTheme === ThemeMode.LIGHT || storedTheme === ThemeMode.DARK) {
        return storedTheme;
    }

    return null;
}

function getSystemTheme(): ThemeModeType {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? ThemeMode.DARK
        : ThemeMode.LIGHT;
}

function applyTheme(mode: ThemeModeType): void {
    document.documentElement.dataset.theme = mode;
    document.documentElement.style.colorScheme = mode;
}

export const themeStore = reactive({
    mode: ThemeMode.LIGHT as ThemeModeType,

    initialize(): void {
        const storedTheme = getStoredTheme();

        this.mode = storedTheme ?? getSystemTheme();

        applyTheme(this.mode);
    },

    setMode(mode: ThemeModeType): void {
        this.mode = mode;

        applyTheme(mode);

        localStorage.setItem(STORAGE_KEY, mode);
    },

    toggle(): void {
        this.setMode(this.mode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT);
    },
});
