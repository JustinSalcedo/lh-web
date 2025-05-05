import styled from 'styled-components'

// Cross icon
const CrossIcon = styled.div`
    width: 1.5rem;
    height: 1.5rem;
    position: relative;
    transform: rotate(0deg);
    transition: 0.5s ease-in-out;
    cursor: pointer;

    span {
        display: block;
        position: absolute;
        height: 0.25rem;
        width: 100%;
        background: #fff;
        border-radius: 9px;
        opacity: 1;
        top: 9px;
        left: 0;
        transition: 0.25s ease-in-out;

        &:nth-child(1) {
            transform: rotate(45deg);
        }

        &:nth-child(2) {
            transform: rotate(-45deg);
        }
    }
`

const CloseButton = ({onClick}: {onClick: () => void}) => {
    return (
        <CrossIcon onClick={onClick}>
            <span></span>
            <span></span>
        </CrossIcon>
    )
}

export default CloseButton
