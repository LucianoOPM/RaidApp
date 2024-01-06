import { useState, FC } from 'react'

interface HelpIconProps {
  onShow: (id: number) => void
  onHide: (id: number) => void
  id: number
}

const HelpIcon: FC<HelpIconProps> = ({ onShow, onHide, id }): JSX.Element => {
  const [stroke, setStroke] = useState('gray')

  const handleMouseEnter = (): void => {
    setStroke('black')
    onShow(id)
  }
  const handleMouseLeave = (): void => {
    setStroke('gray')
    onHide(id)
  }

  return (
    <i
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="hover:cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-alert-circle"
        width="25"
        height="25"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke={stroke}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
        <path d="M12 8v4" />
        <path d="M12 16h.01" />
      </svg>
    </i>
  )
}

export default HelpIcon
