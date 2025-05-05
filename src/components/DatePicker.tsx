import {useState} from 'react'
import styled from 'styled-components'

const DatePickerWrapper = styled.div<{$size: DatePickerSize}>`
    position: relative;
    width: ${({$size}) => ($size === 'large' ? '120px' : '100%')};
`

const DateInput = styled.input<{
    $size: DatePickerSize
    $format: DatePickerFormat
}>`
    width: 100%;
    padding: ${({$size}) => ($size === 'large' ? '0.25rem' : '0')};
    /* border: 1px solid #ccc; */
    border: none;
    background-color: unset;
    /* border-radius: 4px; */
    font-size: ${({$size}) => ($size === 'large' ? '1.5rem' : '1rem')};
    font-weight: ${({$size}) => ($size === 'large' ? 'bold' : 'normal')};
    color: white;
    text-align: ${({$format}) => ($format === 'short' ? 'center' : 'left')};
`

const Calendar = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    width: 250px;
    background: #333;
    /* border: 1px solid #ccc; */
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    margin-top: 5px;
    z-index: 1000;
`

const CalendarHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background: #444;
    border-bottom: 1px solid #666;
`

const Button = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    color: white;

    &:hover {
        background: #181818;
        border-radius: 4px;
    }
`

const DaysGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1px;
    padding: 10px;
`

const DayCell = styled.div<{
    $isToday?: boolean
    $isSelected?: boolean
    $isCurrentMonth?: boolean
}>`
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 4px;

    ${({$isToday}) =>
        $isToday &&
        `
    background: #181818;
  `}

    ${({$isSelected}) =>
        $isSelected &&
        `
    background: #007bff;
    color: white;
  `}
  
  ${({$isCurrentMonth}) =>
        !$isCurrentMonth &&
        `
    color: #777;
  `}
  
  &:hover {
        background: ${props => (props.$isSelected ? '#007bff' : '#f0f0f0')};
    }
`

const WeekdayHeader = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    padding: 10px;
    background: #444;

    div {
        text-align: center;
        font-weight: bold;
        font-size: 12px;
    }
`

type DatePickerSize = 'medium' | 'large'

type DatePickerFormat = 'short' | 'long'

const DatePicker = ({
    selectedDate,
    setSelectedDate,
    size = 'medium',
    format = 'short',
}: {
    selectedDate: Date
    setSelectedDate: (date: Date) => void
    size?: DatePickerSize
    format?: DatePickerFormat
}) => {
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
    const [isOpen, setIsOpen] = useState(false)

    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear()
        const month = date.getMonth()
        const daysInMonth = new Date(year, month + 1, 0).getDate()
        const firstDayOfMonth = new Date(year, month, 1).getDay()

        const days: Array<{date: Date; isCurrentMonth: boolean}> = []

        // Previous month days
        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            days.push({
                date: new Date(year, month, -i),
                isCurrentMonth: false,
            })
        }

        // Current month days
        for (let i = 1; i <= daysInMonth; i++) {
            days.push({
                date: new Date(year, month, i),
                isCurrentMonth: true,
            })
        }

        // Next month days
        const remainingDays = 42 - days.length
        for (let i = 1; i <= remainingDays; i++) {
            days.push({
                date: new Date(year, month + 1, i),
                isCurrentMonth: false,
            })
        }

        return days
    }

    const handleDateClick = (date: Date) => {
        setSelectedDate(date)
        setIsOpen(false)
    }

    const handlePrevMonth = () => {
        setCurrentMonth(
            new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
        )
    }

    const handleNextMonth = () => {
        setCurrentMonth(
            new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
        )
    }

    const formatDate = (date: Date): string => {
        return format === 'long'
            ? date.toLocaleDateString('es', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
              })
            : date.toLocaleDateString('es', {
                  month: 'short',
                  day: 'numeric',
              })
    }

    const isToday = (date: Date): boolean => {
        const today = new Date()
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        )
    }

    return (
        <DatePickerWrapper $size={size}>
            <DateInput
                $format={format}
                $size={size}
                value={formatDate(selectedDate)}
                onClick={() => setIsOpen(!isOpen)}
                readOnly
            />

            {isOpen && (
                <Calendar>
                    <CalendarHeader>
                        <Button onClick={handlePrevMonth}>&lt;</Button>
                        <div>
                            {currentMonth.toLocaleDateString('en-US', {
                                month: 'long',
                                year: 'numeric',
                            })}
                        </div>
                        <Button onClick={handleNextMonth}>&gt;</Button>
                    </CalendarHeader>

                    <WeekdayHeader>
                        {weekdays.map(day => (
                            <div key={day}>{day}</div>
                        ))}
                    </WeekdayHeader>

                    <DaysGrid>
                        {getDaysInMonth(currentMonth).map(
                            ({date, isCurrentMonth}, index) => (
                                <DayCell
                                    key={index}
                                    $isToday={isToday(date)}
                                    $isSelected={
                                        selectedDate.getDate() ===
                                            date.getDate() &&
                                        selectedDate.getMonth() ===
                                            date.getMonth() &&
                                        selectedDate.getFullYear() ===
                                            date.getFullYear()
                                    }
                                    $isCurrentMonth={isCurrentMonth}
                                    onClick={() => handleDateClick(date)}>
                                    {date.getDate()}
                                </DayCell>
                            ),
                        )}
                    </DaysGrid>
                </Calendar>
            )}
        </DatePickerWrapper>
    )
}

export default DatePicker
