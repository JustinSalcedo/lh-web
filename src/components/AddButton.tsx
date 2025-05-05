// PlusIcon component
import styled from 'styled-components'

interface IconProps {
    size?: number
    color?: string
}

const StyledSvg = styled.svg<IconProps>`
    width: ${props => props.size || 24}px;
    height: ${props => props.size || 24}px;
`

export const PlusIcon = ({size = 24, color = 'currentColor'}: IconProps) => {
    return (
        <StyledSvg
            size={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5C13 4.44772 12.5523 4 12 4Z"
                fill={color}
            />
        </StyledSvg>
    )
}

// AddButton component
interface AddButtonProps {
    onClick?: () => void
    disabled?: boolean
    iconSize?: number
    iconColor?: string
    backgroundColor?: string
}

const StyledButton = styled.button<{backgroundColor?: string}>`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    border-radius: 4px;
    border: none;
    background-color: ${props => props.backgroundColor || '#007bff'};
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.8;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`

const AddButton = ({
    onClick,
    disabled = false,
    iconSize = 24,
    iconColor = 'white',
    backgroundColor,
}: AddButtonProps) => {
    return (
        <StyledButton
            onClick={onClick}
            disabled={disabled}
            backgroundColor={backgroundColor}>
            <PlusIcon size={iconSize} color={iconColor} />
        </StyledButton>
    )
}

export default AddButton
