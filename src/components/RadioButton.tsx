import styled from 'styled-components'

// purple RadioButton component
const RadioButton = styled.input`
    appearance: none;
    width: 1.5rem;
    height: 1.5rem;
    border: 0.15rem solid #d1d1d1;
    border-radius: 50%;
    outline: none;
    cursor: pointer;
    background-color: #fff;
    transition: background-color 0.2s ease-in-out;
    &:checked {
        background-color: #8a2be2;
        border: 0.15rem solid #8a2be2;
    }
    &:checked::after {
        content: '';
        display: block;
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 50%;
        background-color: #fff;
        margin: 0.25rem;
    }
`

export default RadioButton
