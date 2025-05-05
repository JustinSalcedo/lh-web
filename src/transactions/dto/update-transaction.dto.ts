import {TransactionDto} from './transaction.dto'

export interface UpdateTransactionDto
    extends Partial<Omit<TransactionDto, '_id'>> {
    id: string
}
