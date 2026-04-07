import { useEffect, useState } from 'react'
import Title from 'src/components/Title'
import useCopyToClipboard from 'src/hooks/useCopyToClipboard'

const directionList = [
  {
    title: '上',
    name: 'direction',
    id: 'top',
    seat: 1,
  },
  {
    title: '右',
    name: 'direction',
    id: 'right',
    seat: 2,
  },
  {
    title: '下',
    name: 'direction',
    id: 'bottom',
    seat: 2,
  },
  {
    title: '左',
    name: 'direction',
    id: 'left',
    seat: 1,
  },
]
const directionRotateList = [
  {
    title: '右上',
    name: 'direction',
    id: 'rightTop',
    seat: 2,
  },
  {
    title: '右下',
    name: 'direction',
    id: 'rightBottom',
    seat: 2,
  },
  {
    title: '左下',
    name: 'direction',
    id: 'leftBottom',
    seat: 1,
  },
  {
    title: '左上',
    name: 'direction',
    id: 'leftTop',
    seat: 1,
  },
]

const Triangle = () => {
  const [formState, setFormState] = useState({
    size: 200,
    direction: 'top',
    color: '#2563eb',
    type: 'iso',
  })
  const [showCode, setShowCode] = useState(null)
  const [showStyle, setShowStyle] = useState(null)
  const handleCopy = useCopyToClipboard()

  // 转变属性
  useEffect(() => {
    let code = JSON.parse(JSON.stringify(formState))
    let directionCode = {
      width: 0,
      height: 0,
      'border-style': 'solid',
    }

    switch (code.direction) {
      case 'top':
        directionCode['border-width'] = `0 ${code.size / 2}px ${code.size}px ${code.size / 2}px`
        directionCode['border-color'] = `transparent transparent ${code.color} transparent`
        break
      case 'bottom':
        directionCode['border-width'] = `${code.size}px ${code.size / 2}px 0 ${code.size / 2}px`
        directionCode['border-color'] = `${code.color} transparent transparent transparent`
        break
      case 'left':
        directionCode['border-width'] = `${code.size / 2}px ${code.size}px ${code.size / 2}px 0`
        directionCode['border-color'] = `transparent ${code.color} transparent transparent`
        break
      case 'right':
        directionCode['border-width'] = `${code.size / 2}px 0 ${code.size / 2}px ${code.size}px`
        directionCode['border-color'] = `transparent transparent transparent ${code.color}`
        break
      case 'leftTop':
        directionCode['border-width'] = `${code.size}px ${code.size}px 0 0`
        directionCode['border-color'] = `${code.color} transparent transparent transparent`
        break
      case 'leftBottom':
        directionCode['border-width'] = `${code.size}px 0 0 ${code.size}px`
        directionCode['border-color'] = `transparent transparent transparent ${code.color}`
        break
      case 'rightTop':
        directionCode['border-width'] = `0 ${code.size}px ${code.size}px 0`
        directionCode['border-color'] = `transparent ${code.color} transparent transparent`
        break
      case 'rightBottom':
        directionCode['border-width'] = `0 0 ${code.size}px ${code.size}px`
        directionCode['border-color'] = `transparent transparent ${code.color} transparent`
        break
      default:
        break
    }

    const styleObj = Object.entries(directionCode).reduce((acc, [key, value]) => {
      const kebabKey = key.replace(/-(\w)/g, (_, char) => char.toUpperCase())
      acc[kebabKey] = value
      return acc
    }, {})
    setShowStyle(styleObj)

    const text = Object.entries(directionCode)
      .map(([key, value]) => `${key}: ${value};`)
      .join('\n')
    setShowCode(text)
  }, [formState])

  // 监控属性变化
  const handleChange = (key, value, numberType = false) => {
    setFormState((prevState) => ({
      ...prevState,
      [key]: numberType ? Number(value) : value,
    }))
  }

  return (
    <>
      <Title>Triangle三角形生成器</Title>
      <div className='triangle-wrap m-auto flex w-[720px] gap-10'>
        <div className='w-1/2'>
          <div className='my-2 font-bold'>方向</div>
          <div className='relative'>
            <div className='direction'>
              {directionList.map((item) => (
                <div key={item.id} className={item.id}>
                  {item.seat === 1 ? <label htmlFor={item.id}>{item.title}</label> : null}
                  <input
                    type='radio'
                    name={item.name}
                    id={item.id}
                    checked={formState.direction === item.id}
                    onChange={() => handleChange(item.name, item.id)}
                  />
                  {item.seat === 2 ? <label htmlFor={item.id}>{item.title}</label> : null}
                </div>
              ))}
              {directionRotateList.map((item) => (
                <div key={item.id} className={item.id}>
                  {item.seat === 1 ? <label htmlFor={item.id}>{item.title}</label> : null}
                  <input
                    type='radio'
                    name={item.name}
                    id={item.id}
                    checked={formState.direction === item.id}
                    onChange={() => handleChange(item.name, item.id)}
                  />
                  {item.seat === 2 ? <label htmlFor={item.id}>{item.title}</label> : null}
                </div>
              ))}
            </div>
            <div className='front'>
              {directionRotateList.map((item) => (
                <label
                  key={item.id}
                  htmlFor={item.id}
                  className={`${item.id} ${item.id === formState.direction ? 'active' : ''}`}></label>
              ))}
            </div>
            <div className='rotate'>
              {directionList.map((item) => (
                <label
                  key={item.id}
                  htmlFor={item.id}
                  className={`${item.id} ${item.id === formState.direction ? 'active' : ''}`}></label>
              ))}
            </div>
            <div className='absolute left-[112px] top-[72px] z-10 size-[85px] bg-white'></div>
          </div>

          <div className='mt-6 flex items-center gap-2'>
            <label className='font-bold' htmlFor='color'>
              颜色
            </label>
            <input
              type='color'
              id='color'
              value={formState.color}
              onChange={({ target }) => handleChange('color', target.value)}
            />
          </div>

          <div className='mt-6 flex items-center gap-2'>
            <label className='font-bold' htmlFor='size'>
              大小
            </label>
            <input
              className='border px-1'
              type='number'
              id='size'
              value={formState.size}
              onChange={({ target }) => handleChange('size', target.value, true)}
            />
          </div>
        </div>
        <div className='w-1/2'>
          <div className='my-2 font-bold'>展示</div>
          <div className='min-h-[300px] bg-triangle'>
            <div className='show' style={showStyle}></div>
          </div>

          <div className='my-2 font-bold'>CSS</div>
          <div className='relative rounded-lg bg-[#eceff7] px-4 py-1'>
            <pre className='whitespace-pre-wrap'>{showCode}</pre>
            <div className='iconfont absolute right-1 top-1 cursor-pointer select-none' onClick={() => handleCopy(showCode)}>
              &#xeac1;
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Triangle
