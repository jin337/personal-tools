import { createBrowserRouter } from 'react-router-dom'

import CssDocs from 'src/pages/CssDocs.jsx'
import Cssgradients from 'src/pages/CssGradients.jsx'
import Flexbox from 'src/pages/Flexbox.jsx'
import Triangle from 'src/pages/Triangle.jsx'
import Home from 'src/views/index.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/triangle',
        element: <Triangle />,
      },
      {
        path: '/flexbox',
        element: <Flexbox />,
      },
      {
        path: '/css-docs',
        element: <CssDocs />,
      },
      {
        path: '/css-gradients',
        element: <Cssgradients />,
      },
    ],
  },
])
