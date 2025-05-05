import {RootApi} from '../root.api'
import {ITransaction} from '../types/ITransaction'
import {getUserId} from '../utils/general'
import {TransactionDto} from './dto/transaction.dto'
import {UpdateTransactionDto} from './dto/update-transaction.dto'

const USER_ID = getUserId()

export default class TransactionApi extends RootApi {
    constructor() {
        super({}, {auth: false})
        this.baseURL = this.baseURL + '/transactions'
    }

    async getTransactions() {
        try {
            const response = await this.GET(`/${USER_ID}`)

            const {status} = response
            const data = await response.json()

            if (status !== 200) throw new Error(data.message || 'Unknown error')
            return data as TransactionDto[]
        } catch (error) {
            console.error(error)
            return []
        }
    }

    async createTransaction(transaction: ITransaction) {
        try {
            const response = await this.POST(`/${USER_ID}`, {
                body: JSON.stringify(transaction),
            })

            const {status} = response
            const data = await response.json()

            if (status !== 201) throw new Error(data.message || 'Unknown error')
            return data as TransactionDto
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async updateTransaction({id, ...transaction}: UpdateTransactionDto) {
        try {
            const response = await this.PUT(`/${USER_ID}/${id}`, {
                body: JSON.stringify(transaction),
            })

            const {status} = response
            const data = await response.json()

            if (status !== 200) throw new Error(data.message || 'Unknown error')
            return data as TransactionDto
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async deleteTransaction(id: string) {
        try {
            const response = await this.DELETE(`/${USER_ID}/${id}`)

            const {status} = response
            const data = await response.json()

            if (status !== 200) throw new Error(data.message || 'Unknown error')
            return data as TransactionDto
        } catch (error) {
            console.error(error)
            return null
        }
    }
}
