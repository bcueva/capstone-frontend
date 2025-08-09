const XIcon = (props) => {
  return (
    <svg {...props} viewBox='0 0 256 256'>
      <rect width='256' height='256' fill='none' />
      <line
        x1='200'
        y1='56'
        x2='56'
        y2='200'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='16'
      />
      <line
        x1='200'
        y1='200'
        x2='56'
        y2='56'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='16'
      />
    </svg>
  )
}

export default XIcon
