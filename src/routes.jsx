import { createBrowserRouter } from 'react-router-dom'

import Home from './views/index.jsx'

import CssDocs from './pages/CssDocs.jsx'
import CssGradients from './pages/CssGradients.jsx'
import Flexbox from './pages/Flexbox.jsx'
import Triangle from './pages/Triangle.jsx'
import Waterfall from './pages/Waterfall.jsx'

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
