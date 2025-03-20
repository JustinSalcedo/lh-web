import styled from 'styled-components'
import CheckItem from './CheckItem'
import {observer} from 'mobx-react-lite'
import useChecklistObservable from '../hooks/useChecklistObservable'

const ChecklistView = observer(() => {
    const checklistObservable = useChecklistObservable()

    return (
        <ChecklistViewContainer>
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
        </ChecklistViewContainer>
    )
})

export default ChecklistView

const ChecklistViewContainer = styled.div`
    /* display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; */
    padding: 1rem;
    display: block;
    height: 100%;
    overflow-y: scroll;
    /* flex: 1; */
    width: 100%;
    background-color: #181818;
    border-radius: 10px;
    margin-bottom: 20px;
`
