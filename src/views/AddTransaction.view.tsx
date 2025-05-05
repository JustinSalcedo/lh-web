import React, {useMemo, useState} from 'react'
import styled from 'styled-components'
import {ITransaction} from '../types/ITransaction'
import CloseButton from '../components/CloseButton'
import DatePicker from '../components/DatePicker'
import useViewsObservable from '../hooks/useViewsObservable'
import useTransactionStore from '../hooks/useTransactionStore'

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    max-width: 500px;
    height: 100%;
    overflow-y: scroll;
    margin: 0 auto;
    padding: 2rem;
`

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`

const Label = styled.label`
    font-weight: 600;
`

const Input = styled.input`
    padding: 0.5rem;
    border: 1px solid #777;
    border-radius: 4px;
    font-size: 1rem;
    background-color: #333;
    color: white;

    &::placeholder {
        color: #aaa;
    }
`

const DatePickerWrap = styled.div`
    padding: 0.5rem;
    border: 1px solid #777;
    border-radius: 4px;
    font-size: 1rem;
    background-color: #333;
`

const Select = styled.select`
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
`

const Button = styled.button`
    padding: 0.75rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
    margin-top: 2rem;

    &:hover {
        background-color: #0056b3;
    }
`

enum TransactionTag {
    expense = 'Gasto',
    income = 'Ingreso',
}

type TransactionType = keyof typeof TransactionTag

const AddTransaction = () => {
    const viewsObservable = useViewsObservable()
    const transactionStore = useTransactionStore()
    const [transaction, setTransaction] = useState<ITransaction>({
        dateInMs: Date.now(),
        description: '',
        amount: 0,
    })
    const [type, setType] = useState<TransactionType>('expense')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        transactionStore
            .createTransaction({
                dateInMs: transaction.dateInMs,
                description: transaction.description,
                amount:
                    type === 'expense'
                        ? -Number(transaction.amount)
                        : Number(transaction.amount),
            })
            .finally(() => {
                viewsObservable.setCurrentView('transactions')
            })
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const {name, value} = e.target
        setTransaction(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        const numValue = Number(value) || 0

        if (numValue <= 0) {
            if (type === 'income') setType('expense')
            else setType('income')
        }

        setTransaction(prev => ({
            ...prev,
            [name]: Math.abs(numValue),
        }))
    }

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {value} = e.target
        setType(value as TransactionType)
    }

    const isTransactionValid = useMemo(() => {
        return transaction.amount !== 0 && transaction.description.length > 0
    }, [transaction])

    return (
        <FormContainer onSubmit={handleSubmit}>
            <CloseButtonContainer>
                <CloseButton
                    onClick={() =>
                        viewsObservable.setCurrentView('transactions')
                    }
                />
            </CloseButtonContainer>

            <FormGroup>
                <Label htmlFor="amount">Monto ($)</Label>
                <Input
                    type="number"
                    id="amount"
                    name="amount"
                    value={transaction.amount}
                    onChange={handleChange}
                    min="0"
                    step="1"
                    required
                    onBlur={handleAmount}
                />
            </FormGroup>

            <FormGroup>
                <Label htmlFor="description">Descripción</Label>
                <Input
                    type="text"
                    id="description"
                    name="description"
                    value={transaction.description}
                    onChange={handleChange}
                    placeholder='ej. "Cheetos de Jamaica"'
                    required
                />
            </FormGroup>

            <FormGroup>
                <Label htmlFor="dateInMs">Fecha</Label>
                <DatePickerWrap>
                    <DatePicker
                        selectedDate={new Date(transaction.dateInMs)}
                        setSelectedDate={date =>
                            setTransaction(prev => ({
                                ...prev,
                                dateInMs: date.getTime(),
                            }))
                        }
                        format="long"
                    />
                </DatePickerWrap>
            </FormGroup>

            <FormGroup>
                <Label htmlFor="type">Type</Label>
                <Select
                    id="type"
                    name="type"
                    value={type}
                    onChange={handleTypeChange}>
                    <option value="expense">{TransactionTag.expense}</option>
                    <option value="income">{TransactionTag.income}</option>
                </Select>
            </FormGroup>

            <Button type="submit" disabled={!isTransactionValid}>
                Registrar transacción
            </Button>
        </FormContainer>
    )
}

export default AddTransaction

const CloseButtonContainer = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
`
