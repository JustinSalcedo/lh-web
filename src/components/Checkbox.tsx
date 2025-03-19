import styled from 'styled-components'

// Checkbox component
const Checkbox = styled.input.attrs({type: 'checkbox'})`
    appearance: none;
    width: 1.5rem;
    height: 1.5rem;
    border: 2px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:checked {
        background-color: #007bff;
        border-color: #007bff;
    }

    &:checked::before {
        content: '✓';
        display: block;
        color: white;
        font-size: 1.2rem;
        line-height: 1.25rem;
        text-align: center;
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
    }
`

export default Checkbox
