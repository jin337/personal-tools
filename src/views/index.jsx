import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const menu = [
  {
    name: 'Flexbox',
    link: '/flexbox',
  },
  {
    name: '三角形生成器',
    link: '/triangle',
  },
  {
    name: 'CSS速查表',
    link: '/css-docs',
  },
  {
    name: 'CSS渐变色',
    link: '/css-gradients',
  },
]

const Home = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [active, setActive] = useState()

  useEffect(() => {
    setActive(location.pathname)
  }, [location])

  const selectHandler = (link) => {
    setActive(link)
    navigate(link)
  }

  return (
    <div className='box-border flex h-screen p-4'>
      <div className='flex h-full w-[200px] flex-col py-7'>
        {menu.map((item) => (
          <div
            key={item.name}
            onClick={() => selectHandler(item.link)}
            className={`mb-1 cursor-pointer rounded-s-lg px-4 py-2.5 hover:bg-white ${item.link === active ? 'bg-white' : ''}`}>
            {item.name}
          </div>
        ))}
      </div>
      <div className='relative w-[calc(100%-200px)] min-w-[750px] overflow-y-auto bg-white p-4 font-Courier'>
        <Outlet />
      </div>
    </div>
  )
}
export default Home
