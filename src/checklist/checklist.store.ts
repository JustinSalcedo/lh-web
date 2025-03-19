import {makeAutoObservable, runInAction} from 'mobx'
import {RootStore} from '../root.store'
import ChecklistApi from './checklist.api'
import Checklist from './checklist'

export default class ChecklistStore {
    todaysChecklist: Checklist | null = null
    checklists: Checklist[] = []

    api: ChecklistApi

    synced = false

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this)
        this.api = new ChecklistApi()
    }

    // today's date time string in 'YYYY-MM-DD' format
    get todaysDateTimeStr() {
        const date = new Date()
        const offset = date.getTimezoneOffset()
        date.setTime(date.getTime() - offset * 60 * 1000)
        return date.toISOString().split('T')[0]
    }

    async sync() {
        try {
            const todaysChecklistData = await this.api.getTodaysChecklist()
            if (!todaysChecklistData)
                return runInAction(() => {
                    this.todaysChecklist = null
                    this.synced = true
                })

            runInAction(() => {
                this.todaysChecklist = new Checklist({
                    ...todaysChecklistData,
                    checklistStore: this,
                })
                this.synced = true
            })
        } catch (error) {
            console.error(error)
        }
    }
}
