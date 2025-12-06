import {} from 'react'

import pic1 from 'src/assets/imgs/waterfall/1.jpg'
import pic10 from 'src/assets/imgs/waterfall/10.jpg'
import pic11 from 'src/assets/imgs/waterfall/11.jpg'
import pic12 from 'src/assets/imgs/waterfall/12.jpg'
import pic13 from 'src/assets/imgs/waterfall/13.jpg'
import pic14 from 'src/assets/imgs/waterfall/14.jpg'
import pic15 from 'src/assets/imgs/waterfall/15.jpg'
import pic16 from 'src/assets/imgs/waterfall/16.jpg'
import pic17 from 'src/assets/imgs/waterfall/17.jpg'
import pic18 from 'src/assets/imgs/waterfall/18.jpg'
import pic19 from 'src/assets/imgs/waterfall/19.jpg'
import pic2 from 'src/assets/imgs/waterfall/2.jpg'
import pic20 from 'src/assets/imgs/waterfall/20.jpg'
import pic21 from 'src/assets/imgs/waterfall/21.jpg'
import pic22 from 'src/assets/imgs/waterfall/22.jpg'
import pic3 from 'src/assets/imgs/waterfall/3.jpg'
import pic4 from 'src/assets/imgs/waterfall/4.jpg'
import pic5 from 'src/assets/imgs/waterfall/5.jpg'
import pic6 from 'src/assets/imgs/waterfall/6.jpg'
import pic7 from 'src/assets/imgs/waterfall/7.jpg'
import pic8 from 'src/assets/imgs/waterfall/8.jpg'
import pic9 from 'src/assets/imgs/waterfall/9.jpg'

const imgList = [
  { src: pic1 },
  { src: pic2 },
  { src: pic3 },
  { src: pic4 },
  { src: pic5 },
  { src: pic6 },
  { src: pic7 },
  { src: pic8 },
  { src: pic9 },
  { src: pic10 },
  { src: pic11 },
  { src: pic12 },
  { src: pic13 },
  { src: pic14 },
  { src: pic15 },
  { src: pic16 },
  { src: pic17 },
  { src: pic18 },
  { src: pic19 },
  { src: pic20 },
  { src: pic21 },
  { src: pic22 },
]
const Waterfall = () => {
  return (
    <div className='waterfall'>
      {imgList.map((item, index) => (
        <img src={item.src} key={index} />
      ))}
    </div>
  )
}
export default Waterfall
