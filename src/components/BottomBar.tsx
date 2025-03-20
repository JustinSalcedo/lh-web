import styled from 'styled-components'
import {
    LabelRow,
    Row,
    StyledEmoji,
    StyledLabelSmall,
    StyledTextLarge,
    StyledTextSmall,
} from './commons'
import {observer} from 'mobx-react-lite'
import useBottomBarObservable from '../hooks/useBottomBarObservable'

// BottomBar component displays balance, score, multiplier, reward, and deadline time
const BottomBar = observer(() => {
    const bottomBarObservable = useBottomBarObservable()

    return (
        <Container>
            <ScoreCounterContainer>
                <Row>
                    <StyledTextLarge>
                        {bottomBarObservable.score}
                    </StyledTextLarge>
                    <StyledEmoji>🪙</StyledEmoji>
                </Row>
                {bottomBarObservable.isProcessed ? (
                    <StyledTextLarge>|</StyledTextLarge>
                ) : (
                    <>
                        <StyledTextLarge>x</StyledTextLarge>
                        <Row>
                            <StyledTextLarge>
                                {bottomBarObservable.multiplier}
                            </StyledTextLarge>
                            <StyledEmoji>🔥</StyledEmoji>
                        </Row>
                        <StyledTextLarge>=</StyledTextLarge>
                    </>
                )}
                <StyledTextLarge>${bottomBarObservable.reward}</StyledTextLarge>
            </ScoreCounterContainer>
            <BalanceDeadlineContainer>
                <LabelRow>
                    <StyledLabelSmall>Balance:</StyledLabelSmall>
                    <StyledTextSmall
                        color={
                            bottomBarObservable.balance < 0
                                ? 'crimson'
                                : undefined
                        }>
                        {`${
                            bottomBarObservable.balance < 0 ? '-$' : '$'
                        }${Math.abs(bottomBarObservable.balance)}`}
                    </StyledTextSmall>
                </LabelRow>
                <LabelRow>
                    <StyledLabelSmall>Hora límite:</StyledLabelSmall>
                    <StyledTextSmall>
                        {bottomBarObservable.deadlineTime}
                    </StyledTextSmall>
                </LabelRow>
            </BalanceDeadlineContainer>
        </Container>
    )
})

export default BottomBar

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    overflow-x: hidden;
    /* position: absolute;
    bottom: 0; */
    padding: 1rem;
    background-color: #222;
    /* background-color: rebeccapurple; */
`

const ScoreCounterContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
`

const BalanceDeadlineContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    /* background-color: blue; */
    width: 100%;
    /* gap: 0.75rem; */
`
