const TagIcon = (props) => {
  return (
    <svg {...props} viewBox='0 0 21 21' xmlns='http://www.w3.org/2000/svg'>
      <g fill='none' fillRule='evenodd' transform='translate(3 3)'>
        <path
          d='m8.91421356.5h3.58578644c1.1045695 0 2 .8954305 2 2v3.58578644c0 .26521649-.1053568.5195704-.2928932.70710678l-6.79289324 6.79289318c-.78104858.7810486-2.04737854.7810486-2.82842712 0l-3.17157288-3.1715728c-.78104858-.78104862-.78104858-2.04737858 0-2.82842716l6.79289322-6.79289322c.18753638-.18753638.44189029-.29289322.70710678-.29289322z'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <circle cx='12' cy='3' fill='currentColor' r='1' />
      </g>
    </svg>
  )
}

export default TagIcon
