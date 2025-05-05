import {observer} from 'mobx-react-lite'
import styled from 'styled-components'
import DatePicker from './DatePicker'

interface DateSeekerProps {
    date: Date
    onDateChange: (date: Date) => void
    onPreviousDay: () => void
    onNextDay: () => void
    size?: DateSeekerSize
}

type DateSeekerSize = 'medium' | 'large'

// DateSeeker component to navigate between dates
const DateSeeker = observer(
    ({
        date,
        onDateChange,
        onPreviousDay,
        onNextDay,
        size = 'medium',
    }: DateSeekerProps) => {
        return (
            <DateSeekerContainer>
                <DateSeekerButtonLeft onClick={onPreviousDay}>
                    <b>{'<'}</b>
                </DateSeekerButtonLeft>
                <DatePicker
                    selectedDate={date}
                    setSelectedDate={onDateChange}
                    size={size}
                />
                <DateSeekerButtonRight onClick={onNextDay}>
                    <b>{'>'}</b>
                </DateSeekerButtonRight>
            </DateSeekerContainer>
        )
    },
)

export default DateSeeker

const DateSeekerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const DateSeekerButton = styled.button`
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 0.25rem 0.5rem;
    font-size: 1.5rem;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #45a049;
    }
`

const DateSeekerButtonLeft = styled(DateSeekerButton)`
    border-radius: 5px 0 0 5px;
`

const DateSeekerButtonRight = styled(DateSeekerButton)`
    border-radius: 0 5px 5px 0;
`
