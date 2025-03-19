import {ExpandedFormat} from '../types'
import {IItem} from '../types/IItem'

export function parseItems(input: string): IItem[] {
    // Split input into lines and filter out empty lines
    const lines = input.split('\n').filter(line => line.trim())
    return parseItemList(lines)
}

export function parseItemList(lines: string[]): IItem[] {
    const items: IItem[] = []
    let stack: {item: IItem; level: number}[] = []

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        const indentLevel = line.search(/\S/)
        const currentItem = parseSingleItem(line.trim())

        if (indentLevel === 0) {
            // Top-level item
            items.push(currentItem)
            stack = [{item: currentItem, level: indentLevel}]
        } else {
            // Find the appropriate parent for this sub-item
            while (
                stack.length > 0 &&
                stack[stack.length - 1].level >= indentLevel
            ) {
                stack.pop()
            }

            if (stack.length > 0) {
                // Add as sub-item to the last item with lower indent
                stack[stack.length - 1].item.subItems.push(currentItem)
            }

            stack.push({item: currentItem, level: indentLevel})
        }
    }

    return items
}

function parseSingleItem(line: string): IItem {
    const item: IItem = {
        mandatory: false,
        subItems: [],
        name: '',
        instances: [],
    }

    // Check if item is mandatory
    if (line.includes('*')) {
        item.mandatory = true
        line = line.replace('*', '')
    }

    // Remove the leading "- "
    line = line.replace(/^- /, '')

    // Define regex patterns for different parts
    const instancesPattern = /\{([^}]+)\}/
    const expandedFormatPattern = /\[([^\]]+)\]$/
    const scorePattern = /:\s*(\d+)(?:\((\d+)\))?/

    // Extract and remove expanded format if present
    const expandedMatch = line.match(expandedFormatPattern)
    if (expandedMatch) {
        item.expandedFormat = expandedMatch[1] as ExpandedFormat
        line = line.replace(expandedFormatPattern, '').trim()
    }

    // Extract and remove score/reps if present
    const scoreMatch = line.match(scorePattern)
    if (scoreMatch) {
        item.score = parseInt(scoreMatch[1])
        if (scoreMatch[2]) {
            item.reps = parseInt(scoreMatch[2])
        }
        line = line.replace(scorePattern, '').trim()
    }

    // Extract and remove instances if present
    const instancesMatch = line.match(instancesPattern)
    if (instancesMatch) {
        item.instances = instancesMatch[1].split(',').map(i => i.trim())
        line = line.replace(instancesPattern, '').trim()
    }

    // Whatever remains is the name
    item.name = line.trim()

    return item
}

function stringifyItem(item: IItem, indentLevel: number = 0): string {
    const indent = '    '.repeat(indentLevel)
    let result = `${indent}- `

    if (item.mandatory) {
        result += '*'
    }

    result += item.name

    if (item.instances && item.instances.length > 0) {
        result += `{${item.instances.join(', ')}}` // Changed parentheses to curly braces
    }

    // Only add colon if there's a score
    if (item.score !== undefined) {
        result += ': ' + item.score
        if (item.reps !== undefined) {
            result += `(${item.reps})`
        }
    }

    // Add expanded format without colon if there's no score
    if (item.expandedFormat) {
        if (item.score === undefined) {
            result += ': ' // Add single colon for cases like "Task3: [expanded]"
        }
        result += `[${item.expandedFormat}]`
    }

    if (item.subItems.length > 0) {
        result +=
            '\n' +
            item.subItems
                .map(subItem => stringifyItem(subItem, indentLevel + 1))
                .join('\n')
    }

    return result
}

function validateParsing(input: string): boolean {
    // Normalize input by removing empty lines and standardizing whitespace
    const normalizedInput = input
        .split('\n')
        .map(line => line.trim())
        .filter(line => line)
        .join('\n')

    // Parse and then stringify the input
    const parsed = parseItems(input)
    const reconstructed = parsed.map(item => stringifyItem(item)).join('\n')

    // Normalize reconstructed output
    const normalizedReconstructed = reconstructed
        .split('\n')
        .map(line => line.trim())
        .filter(line => line)
        .join('\n')

    // Compare normalized strings
    const isValid = normalizedInput === normalizedReconstructed

    // Return validation result
    return isValid
}

// Helper function to show detailed differences when validation fails
function debugParsing(input: string): void {
    const parsed = parseItems(input)
    const reconstructed = parsed.map(item => stringifyItem(item)).join('\n')

    console.log('Original:')
    console.log(input)
    console.log('\nParsed:')
    console.log(JSON.stringify(parsed, null, 2))
    console.log('\nReconstructed:')
    console.log(reconstructed)

    if (!validateParsing(input)) {
        console.log('\nValidation failed! Differences found.')
        console.log('Original (normalized):')
        console.log(
            input
                .split('\n')
                .map(line => line.trim())
                .filter(line => line)
                .join('\n'),
        )
        console.log('Reconstructed (normalized):')
        console.log(
            reconstructed
                .split('\n')
                .map(line => line.trim())
                .filter(line => line)
                .join('\n'),
        )
    } else {
        console.log('\nValidation passed!')
    }
}

// // Example usage:
// const testInput = `
// - *Task1{instance1, instance2}: 10(3)[expanded]
// - Task2: 20
// - Task3: [expanded]
//     - *SubTask1: 30
//     - SubTask2: 40(2)
// `

// // Run validation
// console.log('Is valid:', validateParsing(testInput))

// // For detailed debugging
// debugParsing(testInput)

// const testInputDeepNesting = `
// - Task1: 10
//     - SubTask1: 20
//         - SubSubTask1: 30
//             - DeeplyNestedTask1: 40
//     - SubTask2: 50
//         - SubSubTask2: 60
// - Task2: 70
//     - SubTask3: 80
// `

// debugParsing(testInputDeepNesting)

// // You can also create unit tests
// function runTests() {
//     const testCases = [
//         {
//             input: '- *Task1(a, b): 10(3)[expanded]',
//             shouldPass: true,
//         },
//         {
//             input: '- Task2: 20',
//             shouldPass: true,
//         },
//         {
//             input: '- Task3: [expanded]',
//             shouldPass: true,
//         },
//         {
//             input: '- Task4(a, b)',
//             shouldPass: true,
//         },
//         {
//             input: '- InvalidFormat::: 123',
//             shouldPass: false,
//         },
//     ]

//     testCases.forEach((testCase, index) => {
//         const result = validateParsing(testCase.input)
//         console.log(
//             `Test ${index + 1}:`,
//             result === testCase.shouldPass ? 'PASSED' : 'FAILED',
//             `\nInput: ${testCase.input}`,
//             `\nExpected: ${testCase.shouldPass}`,
//             `\nGot: ${result}\n`,
//         )

//         if (result !== testCase.shouldPass) {
//             debugParsing(testCase.input)
//         }
//     })
// }
