import styled from 'styled-components'
import React from 'react'

interface MenuItemProps {
    icon?: React.ReactNode
    text: string
    onClick: () => void
}

const StyledMenuItem = styled.div`
    display: flex;
    align-items: center;
    padding: 0.75rem;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: rgba(0, 0, 0, 0.04);
    }
`

const IconWrapper = styled.div`
    margin-right: 12px;
    display: flex;
    align-items: center;
`

const MenuText = styled.span`
    font-size: 1rem;
`

const MenuItem: React.FC<MenuItemProps> = ({icon, text, onClick}) => {
    return (
        <StyledMenuItem onClick={onClick}>
            {icon && <IconWrapper>{icon}</IconWrapper>}
            <MenuText>{text}</MenuText>
        </StyledMenuItem>
    )
}

export default MenuItem
