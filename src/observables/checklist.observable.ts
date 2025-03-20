import {computed, makeAutoObservable, runInAction} from 'mobx'
import {RootStore} from '../root.store'
import {setAndCountVisibleTasks} from '../utils/task'

export class ChecklistObservable {
    searchTerm: string = ''
    showCompletedTasks: boolean = true
    showNonRequiredTasks: boolean = true
    isActive: boolean = true
    checkIsActiveIntervalId: NodeJS.Timer | number = 0

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this, {
            checkIsActiveIntervalId: false,
            allTasks: computed,
            visibleTasks: computed,
            loading: computed,
            isProcessed: computed,
        })

        this.runCheckIsActiveInterval()
    }

    runCheckIsActiveInterval() {
        this.checkIsActiveIntervalId = setInterval(() => {
            runInAction(() => {
                if (!this.rootStore.checklistStore.todaysChecklist) return
                this.isActive =
                    this.rootStore.checklistStore.todaysChecklist.endTimeInMs >
                    Date.now()
                if (!this.isActive) {
                    clearInterval(this.checkIsActiveIntervalId)
                }
            })
        }, 1000)
    }

    get allTasks() {
        return this.rootStore.checklistStore.todaysChecklist?.tasks || []
    }

    get visibleTasks() {
        setAndCountVisibleTasks(
            this.allTasks,
            this.searchTerm,
            !this.showCompletedTasks,
            !this.showNonRequiredTasks,
        )

        return this.allTasks.filter(task => task.visible)
    }

    get loading() {
        return !this.rootStore.checklistStore.synced
    }

    get isProcessed() {
        return (
            !this.loading &&
            !!this.rootStore.checklistStore.todaysChecklist?.processed
        )
    }

    setSearchTerm(term: string) {
        this.searchTerm = term
    }

    toggleShowCompletedTasks() {
        this.showCompletedTasks = !this.showCompletedTasks
    }

    toggleShowNonRequiredTasks() {
        this.showNonRequiredTasks = !this.showNonRequiredTasks
    }
}
