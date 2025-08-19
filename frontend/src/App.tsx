import React from 'react'
import {Button} from './components/ui/Button'
import './App.css'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'

const App = () => {
  return (
    <div>
      <Button startIcon={<PlusIcon size="lg"/>} variant="primary" text="Hello" size="sm"/>
      <Button startIcon={<ShareIcon size="md"/>} variant="secondary" text="Mello" size="md"/>
    </div>
  )
}

export default App;