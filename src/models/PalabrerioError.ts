export class PalabrerioError {
  id: number
  typed: string
  expected: string
  prevChar: string
  currentWord: string
  charIndex: number
  wordIndex: number
  timestamp: number


  static errorId = 0

  constructor(typed: string, expected: string, prevChar: string, currentWord: string, charIndex: number, wordIndex: number) {
    this.id = ++PalabrerioError.errorId

    this.typed = typed
    this.expected = expected
    this.prevChar = prevChar
    this.currentWord = currentWord
    this.charIndex = charIndex
    this.wordIndex = wordIndex
    this.timestamp = Date.now()
  }
}