import {computed, makeAutoObservable} from 'mobx'
import {RootStore} from '../root.store'

export class BottomBarObservable {
    constructor(private rootStore: RootStore) {
        makeAutoObservable(this, {
            score: computed,
            multiplier: computed,
            reward: computed,
            balance: computed,
            deadlineTime: computed,
        })
    }

    get score() {
        return this.rootStore.checklistStore.todaysChecklist?.totalScore || 0
    }

    get multiplier() {
        return (
            this.rootStore.checklistStore.todaysChecklist?.user.multiplier || 1
        )
    }

    get reward() {
        return this.score * this.multiplier
    }

    get balance() {
        return this.rootStore.checklistStore.todaysChecklist?.user.balance || 0
    }

    get deadlineTime() {
        return new Date(
            this.rootStore.checklistStore.todaysChecklist?.endTimeInMs ||
                Date.now(),
        ).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        })
    }
}
