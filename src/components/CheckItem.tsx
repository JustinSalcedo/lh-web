import styled from 'styled-components'
import Checkbox from './Checkbox'
import {useEffect, useState} from 'react'
import CyclicCounter from './CyclicCounter'
import Task from '../tasks/task'
import {observer} from 'mobx-react-lite'
import useChecklistObservable from '../hooks/useChecklistObservable'

// CheckItem component
const CheckItem = observer(({task}: {task: Task}) => {
    const checklistObserver = useChecklistObservable()
    const [collapsed, setCollapsed] = useState(true)

    // set collapsed to false if there is a search term and task is visible
    useEffect(() => {
        if (checklistObserver.searchTerm && task.visible) {
            setCollapsed(false)
        } else setCollapsed(true)
    }, [checklistObserver.searchTerm, task.visible])

    return (
        <>
            {(!task.expandedFormat || (!!task.expandedFormat && collapsed)) && (
                <CheckItemContainer>
                    {!!task.subTasks.length ? (
                        <CollapseButton
                            onClick={() => setCollapsed(!collapsed)}>
                            {collapsed ? '⮞' : '⮟'}
                        </CollapseButton>
                    ) : (
                        <Block />
                    )}
                    {!!task.reps ? (
                        <CyclicCounter
                            max={task.reps}
                            count={task.repsDone || 0}
                            setCount={() => task.checkTask()}
                        />
                    ) : (
                        <Checkbox
                            checked={task.done}
                            onChange={() => task.checkTask()}
                        />
                    )}
                    {(task.mandatory || !!task.parentTask?.mandatory) && (
                        <RedAsterisk>*</RedAsterisk>
                    )}
                    <span>{task.displayText}</span>
                    {/* subTasks count */}
                    {!!task.subTasks.length && (
                        <span>({task.subTasks.length})</span>
                    )}
                    {!!task.subTasks.length &&
                    collapsed &&
                    !!task.aggregatedScore ? (
                        <b>+{task.aggregatedScore}</b>
                    ) : !!task.repsDone && !!task.score ? (
                        <span>
                            ({task.score} x {task.repsDone}) ={' '}
                            <b>+{task.earnedScore}</b>
                        </span>
                    ) : (
                        !!task.score && <b>+{task.score}</b>
                    )}
                </CheckItemContainer>
            )}
            {!!task.expandedFormat && !collapsed && (
                <CheckItemContainer>
                    <PillowButton onClick={() => setCollapsed(!collapsed)}>
                        ⏺⏺⏺
                    </PillowButton>
                </CheckItemContainer>
            )}
            {!!task.visibleSubTasks.length && !collapsed && (
                <CheckItemGroup $expanded={!!task.expandedFormat && !collapsed}>
                    {task.visibleSubTasks.map((subTask, index) => (
                        <CheckItem key={index} task={subTask} />
                    ))}
                </CheckItemGroup>
            )}
        </>
    )
})

export default CheckItem

const CollapseButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    font-family: 'Nishiki-Teki';
    color: #fff;
    width: 1.25rem;
`

// 1.25rem-width block
const Block = styled.div`
    width: 1.25rem;
`

const PillowButton = styled.button`
    background-color: #333;
    border: none;
    cursor: pointer;
    font-size: 0.75rem;
    color: #fff;
    height: 1rem;
    border-radius: 0.5rem;
`

const RedAsterisk = styled.span`
    color: red;
`

const CheckItemContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    gap: 0.25rem;
`

const CheckItemGroup = styled.div<{$expanded?: boolean}>`
    display: flex;
    flex-direction: column;
    margin-left: ${({$expanded}) => ($expanded ? '0' : '2rem')};
    transition: all 0.2s ease-in-out;
`
