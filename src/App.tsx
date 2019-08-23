import React, { StrictMode, FunctionComponent } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Component from '@Components/Component'

export const App: FunctionComponent = () => (
  <StrictMode>
    <BrowserRouter>
      <Route exact path='/' component={Component} />
    </BrowserRouter>
  </StrictMode>
)
