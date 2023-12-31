import {css} from 'styled-components';

import {prepareStandardBreakpointTypo} from './helpers';

const typoS = prepareStandardBreakpointTypo({
    h1: {
        'font-size': '1.75rem',
        'font-weight': '600',
        'line-height': '2.125rem',
    },
    h2: {
        'font-size': '1.5rem',
        'font-weight': '600',
        'line-height': '1.875rem',
    },
    h3: {
        'font-size': '1.25rem',
        'font-weight': '600',
        'line-height': '1.625rem',
    },
    h4: {
        'font-size': '1.125rem',
        'font-weight': '600',
        'line-height': '1.5rem',
    },
    h5: {
        'font-size': '0.875rem',
        'font-weight': '600',
        'line-height': '1.375rem',
    },
});

console.log(typoS, '__typoS__');

const typoM = prepareStandardBreakpointTypo({
    h1: {
        'font-size': '2.5rem',
        'font-weight': '600',
        'line-height': '2.875rem',
    },
    h2: {
        'font-size': '1.75rem',
        'font-weight': '600',
        'line-height': '2.125rem',
    },
    h3: {
        'font-size': '1.25rem',
        'font-weight': '600',
        'line-height': '1.625rem',
    },
    h4: {
        'font-size': '1.125rem',
        'font-weight': '600',
        'line-height': '1.5rem',
    },
    h5: {
        'font-size': '1rem',
        'font-weight': '600',
        'line-height': '1.375rem',
    },
});

const typoL = prepareStandardBreakpointTypo({
    h1: {
        'font-size': '3rem',
        'font-weight': '600',
        'line-height': '3.375rem',
    },
    h2: {
        'font-size': '2rem',
        'font-weight': '600',
        'line-height': '2.375rem',
    },
    h3: {
        'font-size': '1.5rem',
        'font-weight': '600',
        'line-height': '1.875rem',
    },
    h4: {
        'font-size': '1.25rem',
        'font-weight': '600',
        'line-height': '1.625rem',
    },
    h5: {
        'font-size': '1.125rem',
        'font-weight': '600',
        'line-height': '1.5rem',
    },
});

export const standard = ({ deviceScale = 1 }) => css`
    :root {
        --plasma-typo-display-font-family: 'SB Sans Display', sans-serif;
        --plasma-typo-h1-font-family: var(--plasma-typo-display-font-family);
        --plasma-typo-h1-font-style: normal;
        --plasma-typo-h1-letter-spacing: normal;
        --plasma-typo-h2-font-family: var(--plasma-typo-display-font-family);
        --plasma-typo-h2-font-style: normal;
        --plasma-typo-h2-letter-spacing: normal;
        --plasma-typo-h3-font-family: var(--plasma-typo-display-font-family);
        --plasma-typo-h3-font-style: normal;
        --plasma-typo-h3-letter-spacing: normal;
        --plasma-typo-h4-font-family: var(--plasma-typo-display-font-family);
        --plasma-typo-h4-font-style: normal;
        --plasma-typo-h4-letter-spacing: normal;
        --plasma-typo-h5-font-family: var(--plasma-typo-display-font-family);
        --plasma-typo-h5-font-style: normal;
        --plasma-typo-h5-letter-spacing: normal;

        font-size: ${14 * deviceScale}px;

        @media (max-width: ${559 * deviceScale}px) {
            ${typoS}
        }

        @media (min-width: ${560 * deviceScale}px) and (max-width: ${959 * deviceScale}px) {
            ${typoM}
        }

        @media (min-width: ${960 * deviceScale}px) {
            ${typoL}
        }
    }
`;
