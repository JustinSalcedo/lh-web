import styled from 'styled-components'
import CheckItem from './CheckItem'
import {observer} from 'mobx-react-lite'
import useChecklistObservable from '../hooks/useChecklistObservable'

const ChecklistBoard = observer(() => {
    const checklistObservable = useChecklistObservable()

    return (
        <ChecklistBoardContainer>
            <div>
                {checklistObservable.isProcessed && <h3>Lista procesada.</h3>}
                {checklistObservable.loading ? (
                    <b>Cargando tareas...</b>
                ) : (
                    checklistObservable.visibleTasks.map((task, index) => (
                        <CheckItem key={index} task={task} />
                    ))
                )}
            </div>
        </ChecklistBoardContainer>
    )
})

export default ChecklistBoard

const ChecklistBoardContainer = styled.div`
    padding: 1rem;
    display: block;
    height: 100%;
    overflow-y: scroll;
    width: 100%;
    background-color: #181818;
    border-radius: 10px;
    margin-bottom: 20px;
`
