import {computed, makeAutoObservable} from 'mobx'
import {RootStore} from '../root.store'

export default class TransactionObservable {
    dateOnView: Date = new Date()

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this, {
            dateOnViewRangeInMs: computed,
            transactionsOnView: computed,
        })
    }

    get dateOnViewRangeInMs() {
        const start = new Date(this.dateOnView)
        start.setHours(0, 0, 0, 0)
        const end = new Date(this.dateOnView)
        end.setHours(23, 59, 59, 999)
        return {
            startInMs: start.getTime(),
            endInMs: end.getTime() + 1,
        }
    }

    get transactionsOnView() {
        console.log(
            'all transactions',
            this.rootStore.transactionStore.transactions,
        )
        const {startInMs, endInMs} = this.dateOnViewRangeInMs
        return this.rootStore.transactionStore.transactions.filter(
            transaction =>
                transaction.dateInMs >= startInMs &&
                transaction.dateInMs < endInMs,
        )
    }

    setDateOnView(date: Date) {
        this.dateOnView = date
    }

    viewPreviousDay() {
        this.dateOnView.setDate(this.dateOnView.getDate() - 1)
        this.dateOnView = new Date(this.dateOnView)
    }

    viewNextDay() {
        this.dateOnView.setDate(this.dateOnView.getDate() + 1)
        this.dateOnView = new Date(this.dateOnView)
    }
}
