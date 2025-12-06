import { createBrowserRouter } from 'react-router-dom'

import Home from 'src/views/index.jsx'

import CssDocs from 'src/pages/CssDocs.jsx'
import CssGradients from 'src/pages/CssGradients.jsx'
import Flexbox from 'src/pages/Flexbox.jsx'
import Triangle from 'src/pages/Triangle.jsx'
import Waterfall from 'src/pages/Waterfall.jsx'

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
        element: <CssGradients />,
      },
      {
        path: '/waterfall',
        element: <Waterfall />,
      },
    ],
  },
])
