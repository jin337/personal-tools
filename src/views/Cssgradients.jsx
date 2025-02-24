import html2canvas from 'html2canvas'
import { useEffect, useRef, useState } from 'react'

import Title from '../components/Title'

const angleList = ['0deg', '45deg', '90deg', '135deg', '180deg', '225deg', '270deg', '315deg']

const Cssgradients = () => {
  const CssgradientsRef = useRef()

  const [colorList, setColorList] = useState([
    ['#a1b2c3', '#4d5e6f', '#789abc'],
    ['#123456', '#fedcba'],
    ['#098765', '#543210', '#ffeedd'],
  ])
  const [selectColors, setSelectColors] = useState(0)
  const [selectAngle, setSelectAngle] = useState(0)
  const [background, setBackground] = useState()
  const [showAll, setShowAll] = useState(false)

  // 操作内容
  const handleList = [
    {
      name: '&#xeaf4;',
      tooltip: '旋转角度',
      onClick: () => {
        setSelectAngle((currentIndex) => {
          const maxIndex = angleList.length - 1
          return currentIndex + 1 > maxIndex ? 0 : currentIndex + 1
        })
      },
    },
    {
      name: '&#xeac1;',
      tooltip: '复制代码',
      onClick: () => {
        const cssStyle = {
          'background-color': colorList[selectColors][colorList[selectColors].length - 1],
          background: background,
        }
        let css = Object.entries(cssStyle)
          .map(([key, value]) => `${key}: ${value};`)
          .join('\n')
        handleCopy(css)
      },
    },
    {
      name: '&#xeb2c;',
      tooltip: '下载图片',
      onClick: () => {
        if (CssgradientsRef.current) {
          const mainElement = CssgradientsRef.current.querySelector('.gradients-main')
          if (mainElement) {
            mainElement.style.opacity = '0'

            html2canvas(CssgradientsRef.current).then((canvas) => {
              const img = canvas.toDataURL('image/png')
              const link = document.createElement('a')
              link.href = img
              link.download = 'gradients.png'
              link.click()

              mainElement.style.opacity = ''
            })
          }
        }
      },
    },
  ]

  useEffect(() => {
    let color = gradientColor(colorList[selectColors])
    setBackground(color)
  }, [selectColors, selectAngle])

  useEffect(() => {
    setColorList(generateColorArray(99))
    return () => {}
  }, [])

  // 生成背景
  const gradientColor = (colors) => `linear-gradient(${angleList[selectAngle]} ,${colors.join(',')})`

  // 生成颜色
  const getRandomHexColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }
  // 生成数组
  const generateColorArray = (numRows) => {
    const colorArray = []
    for (let i = 0; i < numRows; i++) {
      const numColors = Math.floor(Math.random() * 2) + 2 // Random number of colors (2 or 3)
      const colors = Array.from({ length: numColors }, getRandomHexColor)
      colorArray.push(colors)
    }
    return colorArray
  }

  // 颜色切换
  const nextColor = (type) => {
    setSelectColors((currentIndex) => {
      const maxIndex = colorList.length - 1

      if (type === 1) {
        return currentIndex + 1 > maxIndex ? 0 : currentIndex + 1
      } else if (type === -1) {
        return currentIndex - 1 < 0 ? maxIndex : currentIndex - 1
      }
      return currentIndex
    })
  }
  // 选中颜色
  const onSelect = (index) => {
    setSelectColors(index)
    setShowAll(false)
  }

  // 复制
  const handleCopy = (e) => {
    navigator.clipboard
      .writeText(e)
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
  }

  return (
    <div ref={CssgradientsRef} className='-m-4 h-[calc(100%+2rem)] w-[calc(100%+2rem)]' style={{ background }}>
      <div className='gradients-main'>
        <Title className='pt-2 text-white'>CSS渐变色</Title>
        <div className='flex justify-between bg-white py-1.5 pr-5 shadow'>
          <ul className='flex'>
            <li className='iconfont mx-2 cursor-pointer'>
              {showAll ? (
                <span className='transition-transform duration-300 ease-in-out' onClick={() => setShowAll(false)}>
                  &#xeaf2;
                </span>
              ) : (
                <span className='transition-transform duration-300 ease-in-out' onClick={() => setShowAll(true)}>
                  &#xeaf1;
                </span>
              )}
            </li>
            {colorList[selectColors].map((item, index) => (
              <li key={index} className='flex cursor-pointer items-center text-sm'>
                {index !== 0 && <span className='mx-1'>&#x279B;</span>}
                <div className='flex items-center px-1 hover:bg-neutral-300/50' onClick={() => handleCopy(item)}>
                  <div className='mr-1 size-4' style={{ backgroundColor: item }}></div>
                  <span>{item}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className='flex select-none gap-4'>
            {handleList.map((item, index) => (
              <div className='group relative' key={index}>
                <div className='iconfont cursor-pointer' onClick={item.onClick} dangerouslySetInnerHTML={{ __html: item.name }} />
                <span className='absolute left-1/2 top-[30px] w-max -translate-x-1/2 transform rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100'>
                  {item.tooltip}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className='absolute top-1/2 w-full select-none'>
          <div
            className='h-20 w-14 cursor-pointer bg-white/20 text-center text-4xl leading-[5rem] text-white'
            onClick={() => nextColor(-1)}>
            &#x2039;
          </div>
          <div className='absolute right-0 top-0 z-10'>
            <div
              className='h-20 w-14 cursor-pointer bg-white/20 text-center text-4xl leading-[5rem] text-white'
              onClick={() => nextColor(1)}>
              &#x203A;
            </div>
          </div>
        </div>
        <div
          className={`absolute z-50 h-[calc(100%-88px)] w-full overflow-y-scroll bg-white ${showAll ? 'visible' : 'invisible'}`}>
          <div className='flex flex-wrap justify-center gap-4 pb-4'>
            {colorList.map((item, index) => (
              <div
                key={index}
                className='h-20 w-[32%] cursor-pointer bg-slate-200'
                style={{ background: gradientColor(item) }}
                onClick={() => onSelect(index)}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Cssgradients
