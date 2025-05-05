import styled from 'styled-components'
import {EmojiButton, StyledLabelXSmall, StyledTextLarge} from './commons'
import {observer} from 'mobx-react-lite'
import useTopBarObservable from '../hooks/useTopBarObservable'
import BurgerButton from './BurgerButton'
import {useState} from 'react'
import Menu from './Menu'

const TopBar = observer(() => {
    const topBarObservable = useTopBarObservable()
    const [showMenu, setShowMenu] = useState(false)

    const toggleMenu = () => setShowMenu(showMenu => !showMenu)

    return (
        <Container>
            <DateContainer>
                <StyledLabelXSmall>
                    {topBarObservable.todaysDate}
                </StyledLabelXSmall>
            </DateContainer>
            <ProgressContainer>
                <UserEmojiContainer>
                    <EmojiButton>👤</EmojiButton>
                </UserEmojiContainer>
                <StyledTextLarge>{topBarObservable.progress}</StyledTextLarge>
                <BurgerButton isOpen={showMenu} onClick={toggleMenu} />
            </ProgressContainer>
            <MenuContainer hidden={!showMenu}>
                <Menu />
            </MenuContainer>
        </Container>
    )
})

export default TopBar

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    /* background-color: blue; */
    width: 100%;
    /* position: absolute;
    top: 0; */
    padding-inline: 1rem;
    padding-block: 0.5rem;
    background-color: #222;
    gap: 0.5rem;
`

const DateContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    gap: 0.5rem;
    width: 100%;
    padding-bottom: 0.25rem;
    border-bottom: 1px solid #777;
`

const ProgressContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
`

const MenuContainer = styled.div`
    position: absolute;
    top: 4.5rem;
    right: 1rem;
    z-index: 1;
    transition: 0.25s ease-in-out;
`

const UserEmojiContainer = styled.div`
    opacity: 0.5;
    width: 1.875rem;
    height: 1.875rem;

    &::after {
        content: '?';
        position: relative;
        text-align: center;
        top: -1.5rem;
        left: 0.75rem;
        font-weight: bold;
    }
`
