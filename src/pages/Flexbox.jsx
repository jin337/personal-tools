import { useEffect, useState } from 'react'
import Title from '../components/Title'

const flexProperties = [
  {
    id: 1,
    name: 'flex-direction',
    children: [
      { id: 2, pid: 1, name: 'row' },
      { id: 3, pid: 1, name: 'row-reverse' },
      { id: 4, pid: 1, name: 'column' },
      { id: 5, pid: 1, name: 'column-reverse' },
    ],
  },
  {
    id: 2,
    name: 'flex-wrap',
    children: [
      { id: 6, pid: 2, name: 'nowrap' },
      { id: 7, pid: 2, name: 'wrap' },
      { id: 8, pid: 2, name: 'wrap-reverse' },
    ],
  },
  {
    id: 3,
    name: 'justify-content',
    children: [
      { id: 9, pid: 3, name: 'flex-start' },
      { id: 10, pid: 3, name: 'flex-end' },
      { id: 11, pid: 3, name: 'center' },
      { id: 12, pid: 3, name: 'space-between' },
      { id: 13, pid: 3, name: 'space-around' },
      { id: 14, pid: 3, name: 'space-evenly' },
    ],
  },
  {
    id: 4,
    name: 'align-items',
    children: [
      { id: 15, pid: 4, name: 'flex-start' },
      { id: 16, pid: 4, name: 'flex-end' },
      { id: 17, pid: 4, name: 'center' },
      { id: 18, pid: 4, name: 'baseline' },
      { id: 19, pid: 4, name: 'stretch' },
    ],
  },
  {
    id: 5,
    name: 'align-content',
    children: [
      { id: 20, pid: 5, name: 'flex-start' },
      { id: 21, pid: 5, name: 'flex-end' },
      { id: 22, pid: 5, name: 'center' },
      { id: 23, pid: 5, name: 'space-between' },
      { id: 24, pid: 5, name: 'space-around' },
      { id: 25, pid: 5, name: 'space-evenly' },
      { id: 26, pid: 5, name: 'stretch' },
    ],
  },
]

const Flexbox = () => {
  const [formState, setFormState] = useState({
    'flex-direction': 'row',
    'flex-wrap': 'nowrap',
    'justify-content': 'flex-start',
    'align-items': 'stretch',
    'align-content': 'stretch',
    size: 4,
    width: 85,
  })
  const [showCode, setShowCode] = useState(null)

  useEffect(() => {
    const code = JSON.parse(JSON.stringify(formState))
    delete code.size
    delete code.width
    const cssRules = Object.entries(code)
      .map(([key, value]) => `${key}: ${value};`)
      .join('\n')
    setShowCode(cssRules)
  }, [formState])

  // 增加数量
  const addSize = () => {
    if (formState.size < 20) {
      setFormState((prevState) => ({
        ...prevState,
        size: formState.size + 1,
      }))
    } else {
      alert('大哥，再多就挤爆了！！！')
    }
  }
  // 减少数量
  const reduceSize = () => {
    if (formState.size > 1) {
      setFormState((prevState) => ({
        ...prevState,
        size: formState.size - 1,
      }))
    } else {
      alert('大哥，不能再少了！！！')
    }
  }

  // 宽度变化
  const handleChangeWidth = (event) => {
    setFormState((prevState) => ({
      ...prevState,
      width: event.target.value,
    }))
  }

  // 属性变化
  const handleSelect = (propertyName, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [propertyName]: value,
    }))
  }
  return (
    <>
      <Title>Flexbox演示</Title>
      <div className='m-auto w-[720px]'>
        <div className='flex w-full justify-between'>
          {flexProperties.map((item) => (
            <div key={item.id}>
              <div className='font-bold'>{item.name}</div>
              {item.children.map((e) => (
                <div
                  className={`mt-2 cursor-pointer rounded-lg border border-blue-600 px-4 py-1 text-sm text-blue-600 ${
                    e.name === formState[item.name] ? 'bg-blue-600 text-neutral-50' : ''
                  }`}
                  key={e.id}
                  onClick={() => handleSelect(item.name, e.name)}>
                  {e.name}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className='my-4 rounded-lg bg-[#eceff7] px-4 py-1'>
          <pre>{showCode}</pre>
        </div>
        <div className='w-full'>
          <div className='top flex justify-between'>
            <div>
              <span>项目数量： {formState.size}</span>
              <button className='mx-2 size-6 rounded border bg-neutral-50' onClick={addSize}>
                +
              </button>
              <button className='size-6 rounded border bg-neutral-50' onClick={reduceSize}>
                -
              </button>
            </div>
            <div className='flex'>
              <span className='mr-2'>项目宽度： {formState.width}px</span>
              <input type='range' name='width' max={200} min={50} value={formState.width} onChange={handleChangeWidth} />
            </div>
          </div>
          <div
            className='my-2 flex min-h-72 gap-1 rounded-lg bg-blue-600 p-4'
            style={{
              flexDirection: formState['flex-direction'],
              flexWrap: formState['flex-wrap'],
              justifyContent: formState['justify-content'],
              alignItems: formState['align-items'],
              alignContent: formState['align-content'],
            }}>
            {[...Array(formState.size)].map((_, index) => (
              <div key={index} className='rounded-lg bg-white p-2 text-center' style={{ width: formState.width + 'px' }}>
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
export default Flexbox
