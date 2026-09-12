export const ButtonType = {
    BUTTON: 'button',
    SUBMIT: 'submit',
    RESET: 'reset',
} as const;

export type ButtonType = (typeof ButtonType)[keyof typeof ButtonType];

export const ButtonVariant = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    DANGER: 'danger',
} as const;

export type ButtonVariant = (typeof ButtonVariant)[keyof typeof ButtonVariant];

export const AlertType = {
    ERROR: 'error',
    WARNING: 'warning',
    SUCCESS: 'success',
    INFO: 'info',
} as const;

export type AlertType = (typeof AlertType)[keyof typeof AlertType];
