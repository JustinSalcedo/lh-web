import styled from 'styled-components'

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    /* gap: 0.25rem; */
`

export const LabelRow = styled(Row)`
    gap: 0.5rem;
`

export const StyledTextLarge = styled.p`
    font-size: 1.75rem;
    font-weight: bold;
    color: white;
    margin: 0;
    padding: 0;
    text-align: center;
`

export const StyledTextSmall = styled.p`
    font-size: 1em;
    font-weight: bold;
    color: ${({color}) => color || 'white'};
    margin: 0;
    padding: 0;
    text-align: center;
`

export const StyledLabelSmall = styled.p`
    font-size: 1em;
    font-weight: normal;
    color: white;
    margin: 0;
    padding: 0;
    text-align: center;
`

export const StyledEmoji = styled.p`
    font-size: 1rem;
    color: white;
    margin: 0;
    padding: 0;
    text-align: center;
`

export const StyledEmojiLarge = styled.p`
    font-size: 1.5rem;
    color: white;
    margin: 0;
    padding: 0;
    text-align: center;
`
