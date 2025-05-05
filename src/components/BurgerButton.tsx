import styled from 'styled-components'

// Burger icon
const BurgerIcon = styled.div`
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
        left: 0;
        transform: rotate(0deg);
        transition: 0.25s ease-in-out;

        &:nth-child(1) {
            top: 0px;
        }

        &:nth-child(2),
        &:nth-child(3) {
            top: 9px;
        }

        &:nth-child(4) {
            top: 18px;
        }
    }

    &.open {
        span {
            &:nth-child(1),
            &:nth-child(4) {
                top: 9px;
                width: 0%;
                left: 50%;
            }

            &:nth-child(2) {
                transform: rotate(45deg);
            }

            &:nth-child(3) {
                transform: rotate(-45deg);
            }
        }
    }
`

const BurgerButton = ({
    isOpen,
    onClick,
}: {
    isOpen: boolean
    onClick: () => void
}) => {
    return (
        <BurgerIcon className={isOpen ? 'open' : ''} onClick={onClick}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </BurgerIcon>
    )
}

export default BurgerButton
