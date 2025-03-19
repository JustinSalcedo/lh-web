import {observer} from 'mobx-react-lite'
import styled from 'styled-components'
import useChecklistObservable from '../hooks/useChecklistObservable'

// SearchBar component
const SearchBar = observer(() => {
    const checklistObservable = useChecklistObservable()

    return (
        <SearchBarContainer>
            <SearchBarInput
                type="text"
                placeholder="Buscar..."
                value={checklistObservable.searchTerm}
                onChange={e =>
                    checklistObservable.setSearchTerm(e.target.value)
                }
            />
            <SubmitButton onClick={() => checklistObservable.setSearchTerm('')}>
                {checklistObservable.searchTerm ? '❌' : '🔍'}
            </SubmitButton>
        </SearchBarContainer>
    )
})

export default SearchBar

const SearchBarContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: #222;
    border-radius: 0.5rem;
    padding-inline: 1rem;
`

const SearchBarInput = styled.input`
    width: 100%;
    border: none;
    outline: none;
    background-color: transparent;
    color: white;
    font-size: 1.25rem;
    font-weight: bold;
    text-align: center;
`

const SubmitButton = styled.button`
    background-color: #222;
    border: none;
    cursor: pointer;
`
