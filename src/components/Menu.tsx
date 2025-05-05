import styled from 'styled-components'
import MenuItem from './MenuItem'
import useViewsObservable from '../hooks/useViewsObservable'

// Styled menu container
const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #333;
    padding-inline: 0.5rem;
`

// Menu component that renders menu items
const Menu = () => {
    const viewsObservable = useViewsObservable()

    return (
        <MenuContainer>
            <MenuItem
                icon={'🧾'}
                text="Transacciones"
                onClick={() => viewsObservable.setCurrentView('transactions')}
            />
        </MenuContainer>
    )
}

export default Menu
