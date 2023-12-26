import styled from 'styled-components';

export const SectionContainer = styled.section<{
    height: number,
    rows: number, columns: number, rowGap: number, columnGap: number,
}>`
    position: relative;
    // border: 1px solid purple;
    ${({height}) => `min-height: ${height}px`};

    // Дубль из Grid компонента src/app/grid/components/Grid/styles.ts
    // max-width: 1440px;
    // margin: 0 auto;

    display: grid;
    ${({rows}) => `grid-template-rows: repeat(${rows}, 1fr)`};
    ${({columns}) => `grid-template-columns: minmax(10px, 1fr) repeat(${columns}, 58.15px)`} minmax(10px, 1fr);
    ${({rowGap}) => `grid-row-gap: ${rowGap}px`};
    ${({columnGap}) => `grid-column-gap: ${columnGap}px`};
`;
