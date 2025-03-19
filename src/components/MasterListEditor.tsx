import {useEffect, useState} from 'react'
import styled from 'styled-components'
import {Row} from './commons'
import {parseItems} from '../utils/item'

// MasterListEditor component with a left text area to edit and a read-only right text area for preview
const MasterListEditor = () => {
    const [input, setInput] = useState<string>('')
    const [output, setOutput] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | number>(0)

    useEffect(() => {
        // render output after 500ms delay
        clearTimeout(timeoutId as NodeJS.Timeout)
        const timeout = setTimeout(() => {
            renderOutput()
        }, 500)
        setTimeoutId(timeout)

        return () => {
            clearTimeout(timeout)
        }
    }, [input])

    const renderOutput = () => {
        try {
            setOutput(JSON.stringify(parseItems(input), null, 2))
            setError(null)
        } catch (error) {
            setError((error as Error).message)
        }
    }

    const copyOutput = () => {
        navigator.clipboard.writeText(output).then(() => {
            alert('Copied to clipboard')
        })
    }

    return (
        <>
            <MasterListEditorContainer>
                <MasterListEditorLeft>
                    <textarea
                        rows={30}
                        value={input}
                        onChange={e => setInput(e.target.value)}></textarea>
                </MasterListEditorLeft>
                <MasterListEditorRight>
                    <textarea rows={30} value={output} readOnly></textarea>
                </MasterListEditorRight>
            </MasterListEditorContainer>
            {!!error && <div>{error}</div>}
            <ButtonRow>
                <MasterListEditorButton onClick={() => copyOutput()}>
                    Copy
                </MasterListEditorButton>
            </ButtonRow>
        </>
    )
}

export default MasterListEditor

const MasterListEditorContainer = styled.div`
    display: flex;
    height: 100%;
`

const MasterListEditorLeft = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    textarea {
        width: 100%;
        height: 100%;
        resize: none;
        background-color: #222;
        color: #eee;
        font-size: 1rem;
    }
`

const MasterListEditorRight = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    textarea {
        width: 100%;
        height: 100%;
        resize: none;
        background-color: #222;
        color: #eee;
    }
`

// align row contens to the right
const ButtonRow = styled(Row)`
    justify-content: flex-end;
    padding-inline: 10px;
`

// align button to the right
const MasterListEditorButton = styled.button`
    align-self: flex-end;
    font-size: 1.5rem;
`
