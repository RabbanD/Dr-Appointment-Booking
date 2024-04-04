import Loader from '../../components/Loader/Loading.jsx'
import Error from '../../components/Error/Error.jsx'
import useGetProfile from '../../hooks/useFetchData'
import { BASE_URL } from '../../config.js'
import Tabs from './Tabs.jsx'
import { useState } from 'react'
import starIcon from '../../assets/images/Star.png'
import HospitalAbout from '../../pages/Hospitals/HospitalAbout.jsx'
import Profile from './Profile.jsx'
import Appointments from './Appointments.jsx'

const Dashboard = () => {
  
  const {data, loading, error} = useGetProfile(`${BASE_URL}/hospitals/profile/me`)

  const [tab, setTab] = useState('overview')

  return(
    <section>
      <div className='max-w-[1170px] px-5 mx-auto'>
        {loading && !error && <Loader/>}
        {error && !loading && <Error/>}

        {
          !loading && !error && (
            <div className='grid lg:grid-cols-3 gap-[30px] lg:-[50px]'>
              <Tabs tab={tab} setTab={setTab} />
              <div className='lg:col-span-2'>
                {data.isApproved === 'pending' && (
                <div className='flex p-4 mb-4 text-yellow-800 bg-yellow-50 rounded-lg'>
                    <svg 
                      aria-hidden="true"
                      className='flex-shrink-0 w-5 h-5'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'>
                        <path
                          fillRule='evenodd'
                          d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 
                            2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                          clipRule='evenodd'></path>
                    </svg>

                    <span className='sr-only'>Info</span>
                    <div className='ml-3 text-sm font-medium'>
                      To get approval please complete your profile. We&apos;ll review manually and approve within 3 days.
                    </div>
                </div>
                )}

                <div className='mt-8'>
                  {tab==='overview' && <div>
                    <div className='flex items-center gap-4 mb-10'>
                      <figure className='max-w-[200px] max-h-[200px]'>
                        <img src={data?.photo} alt="" className='w-full'/>
                      </figure>

                      <div>
                        
                        <h3 className='text-[22px] leading-9 font-bold text-headingColor mt-3'>
                          {data.name}
                        </h3>

                        <div className='flex items-center gap-[6px]'>
                          <span className='flex items-center gap-[6px] text-headingColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold'>
                            <img src={starIcon} alt="" />{data.averageRating}
                          </span>
                          <span className='text-textColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold'>
                            ({data.totalRating})
                          </span>
                        </div>

                        <p className='text__para font-[15px] lg:max-w-[390px] leading-6'>
                          {data?.bio}
                        </p>
                      </div>
                    </div>
                    <HospitalAbout 
                      name={data.name} 
                      about={data.about} 
                      address={data.address}
                      />
                  </div>}
                  {tab==='appointments' && <Appointments appointments={data.appointments} />}
                  {tab==='settings' && <Profile hospitalData={data}/>}
                </div>

              </div>
            </div>
          )
        }
      </div>
    </section>
  )
}
export default Dashboard;