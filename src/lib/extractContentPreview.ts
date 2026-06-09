/**
 * Extracts plain text preview from Lexical editor content
 */
export function extractContentPreview(content: any, maxLength: number = 150): string {
  if (!content?.root?.children) return ''

  let text = ''

  const extractText = (nodes: any[]): string => {
    let result = ''
    for (const node of nodes) {
      if (node.type === 'text') {
        result += node.text || ''
      } else if (node.children) {
        result += extractText(node.children)
      }
      if (result.length >= maxLength) break
    }
    return result
  }

  text = extractText(content.root.children)
  return text.slice(0, maxLength).trim() + (text.length > maxLength ? '...' : '')
}
