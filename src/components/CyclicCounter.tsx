import styled from 'styled-components'
import RadioButton from './RadioButton'

// Cyclic counter component: count every click and go back to zero after hitting max
const CyclicCounter = ({
    count,
    setCount,
    max,
}: {
    count: number
    setCount: (count: number) => void
    max: number
}) => {
    const handleClick = () => {
        setCount((count + 1) % (max + 1))
    }

    // render a checked radio button for each count
    const renderRadioButtons = () => {
        const radioButtons = []
        for (let i = 0; i < max; i++) {
            radioButtons.push(
                <RadioButton
                    type="radio"
                    // name="cyclic-counter"
                    checked={count > i}
                    readOnly
                    key={i}
                />,
            )
        }
        return radioButtons
    }

    return (
        <RadioButtonsContainer onClick={handleClick}>
            {renderRadioButtons()}
        </RadioButtonsContainer>
    )
}

export default CyclicCounter

const RadioButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
