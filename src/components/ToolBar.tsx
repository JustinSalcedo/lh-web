import styled from 'styled-components'
import SearchBar from './SearchBar'
import Toggle from './Toggle'
import {observer} from 'mobx-react-lite'
import useChecklistObservable from '../hooks/useChecklistObservable'

// ToolBar component includes SearchBar
const ToolBar = observer(() => {
    const checklistObservable = useChecklistObservable()

    return (
        <ToolBarContainer>
            <SearchBar />
            <Toggle
                isOn={checklistObservable.showCompletedTasks}
                handleToggle={() =>
                    checklistObservable.toggleShowCompletedTasks()
                }
            />
            <EmojiButton
                onClick={() =>
                    checklistObservable.toggleShowNonRequiredTasks()
                }>
                {checklistObservable.showNonRequiredTasks ? '⭕' : '✳️'}
            </EmojiButton>
        </ToolBarContainer>
    )
})

export default ToolBar

const ToolBarContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-block: 1rem;
    padding-inline: 1rem;
    gap: 1rem;
`

const EmojiButton = styled.button`
    font-size: 1.5rem;
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
`
