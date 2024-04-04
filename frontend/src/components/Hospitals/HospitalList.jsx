import HospitalCard from './HospitalCard.jsx';
import {BASE_URL} from "../../config.js"
import useFetchData from '../../hooks/useFetchData.jsx';
import Loader from '../Loader/Loading.jsx'
import Error from '../Error/Error.jsx';

const HospitalList = () => {

  const {data:hospitals, loading, error} = useFetchData(`${BASE_URL}/hospitals`);
  return (
  
  <>
    {loading && <Loader/>}
    {error && <Error/>}

    { !loading && !error && <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
    {hospitals.map(hospital => (
      <HospitalCard key={hospital._id} hospital={hospital}/>
      ))}
      
    </div>}

  </>
  )
}

export default HospitalList
