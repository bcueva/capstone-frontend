const CalculatorIcon = (props) => {
  return (
    <svg {...props} viewBox='0 0 21 21' xmlns='http://www.w3.org/2000/svg'>
      <g fill='none' fillRule='evenodd' transform='translate(5 4)'>
        <path
          d='m2.5.5h6c1.1045695 0 2 .8954305 2 2v9c0 1.1045695-.8954305 2-2 2h-6c-1.1045695 0-2-.8954305-2-2v-9c0-1.1045695.8954305-2 2-2z'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='m.5 5.5h10'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <g fill='currentColor'>
          <circle cx='2.5' cy='7.5' r='1' />
          <circle cx='4.5' cy='7.5' r='1' />
          <circle cx='6.5' cy='7.5' r='1' />
          <circle cx='8.5' cy='7.5' r='1' />
          <circle cx='2.5' cy='9.5' r='1' />
          <circle cx='4.5' cy='9.5' r='1' />
          <circle cx='6.5' cy='9.5' r='1' />
          <circle cx='8.5' cy='9.5' r='1' />
          <circle cx='2.5' cy='11.5' r='1' />
          <circle cx='4.5' cy='11.5' r='1' />
          <circle cx='6.5' cy='11.5' r='1' />
          <circle cx='8.5' cy='11.5' r='1' />
        </g>
      </g>
    </svg>
  )
}

export default CalculatorIcon
