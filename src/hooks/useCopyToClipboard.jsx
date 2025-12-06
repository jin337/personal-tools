// useCopyToClipboard.js
import { useCallback } from 'react'

const useCopyToClipboard = () => {
  const handleCopy = useCallback((text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        const message = document.createElement('div')
        message.className =
          'copied-message absolute top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm py-2 px-4 rounded animate-fadeUp'
        message.innerText = '已复制'
        document.body.appendChild(message)

        setTimeout(() => {
          document.body.removeChild(message)
        }, 1000)
      })
      .catch((err) => {
        console.error('复制失败:', err)
      })
  }, [])

  return handleCopy
}

export default useCopyToClipboard
