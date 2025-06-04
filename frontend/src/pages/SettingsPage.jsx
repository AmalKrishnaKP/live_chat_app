import React from 'react'
import { useThemeStore } from '../store/useThemStore'

export default function SettingsPage() {
  const {theme,setTheme}=useThemeStore()
  return (
    <div>
      <ul><li className="2">1</li>
      <li className="2">2</li>
      <li className="2">3</li>
      <li className="2">4</li>
      <li className="2">5</li>
      <li className="2">6</li>
      <li className="2">7</li>
      <li className="2">8</li>
      <li className="2">9</li>
      <li className="2">10</li></ul>
    </div>
  )
}
