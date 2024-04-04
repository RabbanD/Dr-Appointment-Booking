
// eslint-disable-next-line react/prop-types
const HospitalAbout = ({name, about, address}) => {
  return (
    <div>
        <div>
            <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2'>
            About of
            <span className='text-irisBlueColor font-bold text-[24px] leading-9'>
                {name}
            </span>
            </h3>
            <p className='text__para mb-5'>
                {about}
            </p>

            <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2'>
            Address
            <span className='text-irisBlueColor font-bold text-[24px] leading-9'>
                {address}
            </span>
            </h3>

            

        </div>
    </div>
  )
}

export default HospitalAbout;