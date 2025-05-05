import {makeAutoObservable, runInAction} from 'mobx'
import Transaction from './transaction'
import TransactionApi from './transactions.api'
import {ITransaction} from '../types/ITransaction'
import {RootStore} from '../root.store'

export class TransactionStore {
    transactions: Transaction[] = []

    api: TransactionApi

    synced = false

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this)
        this.api = new TransactionApi()
    }

    async sync() {
        try {
            const transactionsData = await this.api.getTransactions()
            if (!transactionsData)
                return runInAction(() => {
                    this.transactions = []
                    this.synced = true
                })

            runInAction(() => {
                this.transactions = transactionsData.map(
                    transactionData => new Transaction(transactionData),
                )
                this.synced = true
            })
        } catch (error) {
            console.error(error)
        }
    }

    async createTransaction(transactionData: ITransaction) {
        try {
            const record = await this.api.createTransaction(transactionData)
            if (!record) throw new Error('Could not create transaction')
            const transaction = new Transaction(record)
            runInAction(() => {
                this.transactions.push(transaction)
                if (
                    this.rootStore.checklistStore.todaysChecklist?.user.balance
                ) {
                    this.rootStore.checklistStore.todaysChecklist.user.addToBalance(
                        transaction.amount,
                    )
                }
            })
        } catch (error) {
            console.error(error)
        }
    }
}
