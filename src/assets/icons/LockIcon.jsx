const LockIcon = (props) => {
  return (
    <svg
      {...props}
      viewBox='0 0 21 21'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g fill='none' fillRule='evenodd' transform='translate(4 1)'>
        <path
          d='m2.5 8.5-.00586729-1.99475098c-.00728549-4.00349935 1.32800361-6.00524902 4.00586729-6.00524902s4.0112203 2.00174967 4.0000699 6.00524902v1.99475098m-8.0000699 0h8.0225317c1.0543618 0 1.9181652.81587779 1.9945143 1.8507377l.0054778.1548972-.0169048 6c-.0031058 1.1023652-.8976224 1.9943651-1.999992 1.9943651h-8.005627c-1.1045695 0-2-.8954305-2-2v-6c0-1.1045695.8954305-2 2-2z'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <circle cx='6.5' cy='13.5' fill='currentColor' r='1.5' />
      </g>
    </svg>
  )
}

export default LockIcon
