import {runInAction} from 'mobx'
import {IRequiredTask, ITask, IVisibleTask} from '../types/ITask'

// count tasks and subtasks recursively
export const countTasks = (tasks: ITask[]): number => {
    let count = 0
    tasks.forEach(task => {
        if (task.subTasks.length) {
            count += countTasks(task.subTasks)
        } else count++
    })
    return count
}

// count completed tasks and subtasks recursively
export const countCompletedTasks = (tasks: ITask[]): number => {
    let count = 0
    tasks.forEach(task => {
        if (task.subTasks.length) {
            count += countCompletedTasks(task.subTasks)
        } else if (task.done) count++
    })
    return count
}

// count required tasks and subtasks recursively
export const countRequiredTasks = (tasks: IRequiredTask[]): number => {
    let count = 0
    tasks.forEach(task => {
        if (task.subTasks.length) {
            count += countRequiredTasks(task.subTasks)
        } else if (task.required) count++
    })
    return count
}

// count completed required tasks and subtasks recursively
export const countCompletedRequiredTasks = (tasks: IRequiredTask[]): number => {
    let count = 0
    tasks.forEach(task => {
        if (task.subTasks.length) {
            count += countCompletedRequiredTasks(task.subTasks)
        } else if (task.required && task.done) count++
    })
    return count
}

// set visible tasks by name recursively and mark them as visible and not visible
export const setAndCountVisibleTasks = <T extends IVisibleTask>(
    tasks: T[],
    searchTerm: string,
    hideTasksDone: boolean,
    hideNonRequiredTasks: boolean,
): number => {
    let count = 0
    tasks.forEach(task => {
        let subCount = 0
        if (task.subTasks.length) {
            subCount = setAndCountVisibleTasks(
                task.subTasks,
                searchTerm,
                hideTasksDone,
                hideNonRequiredTasks,
            )
        }

        const visible =
            ((!hideNonRequiredTasks ||
                (hideNonRequiredTasks && task.required)) &&
                (!hideTasksDone || (hideTasksDone && !task.done)) &&
                task.displayText
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())) ||
            !!subCount

        if (visible) count++
        runInAction(() => {
            task.setVisible(visible)
        })
    })
    return count
}
