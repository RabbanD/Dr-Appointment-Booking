import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import uploadImageToCloudinary from '../../utils/uploadCloudinary.js';
import { BASE_URL, token } from '../../config.js';
import {toast} from 'react-toastify'
import HashLoader from 'react-spinners/HashLoader.js';

function Profile({user}) {

    const [selectedFile, setSelectedFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
      name:'',
      email:'',
      password:'',
      photo:null,
      bloodType: '',
      gender:'',
      state:'',
      district:'',
      taluka:'',
      disease:'',
      rationcard:'',
      annualIncome:''
    });
    const navigate = useNavigate();

    useEffect(()=>{
        setFormData({name:user.name, email:user.email, photo:user.photo, gender:user.gender, bloodType:user.bloodType, location:user.location, disease:user.disease, rationcard:user.rationcard, annualIncome:user.annualIncome});
    },[user]);
  
    const handleInputChange = e =>{
      setFormData({...formData, [e.target.name]:e.target.value});
    };
  
    const handleFileInputChange = async event => {
      const file = event.target.files[0];
  
      const data = await uploadImageToCloudinary(file);
  
      setSelectedFile(data.url)
      setFormData({...formData, photo:data.url})
    
    }
    const submitHandler = async event => {
      
      event.preventDefault();
      setLoading(true)
  
      try {
        const res = await fetch(`${BASE_URL}/users/${user._id}`,{
          method:'put',
          headers:{
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        })
        const {message} = await res.json();
  
        if(!res.ok){
          throw new Error(message)
        }
        setLoading(false)
        toast.success(message)
        navigate('/users/profile/me')
  
      } catch (err) {
        toast.error(err.message)
        setLoading(false)
      }
    }
  return (

    <div className='mt-10'>
        <form onSubmit={submitHandler}>
              <div className='mb-5'>
              <input type="text" placeholder='Full Name' name='name' value={formData.name} onChange={handleInputChange} className='w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer'required/>
              </div>
              <div className='mb-5'>
              <input type="email" placeholder='Enter Your Email' name='email' value={formData.email} onChange={handleInputChange} className='w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer'aria-readonly readOnly/>
              </div>
              <div className='mb-5'>
              <input type="password" placeholder='Enter Your Password' name='password' value={formData.password} onChange={handleInputChange}className='w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer'/>
              </div>

              <div className='mb-5'>
              <input type="text" placeholder='Blood Type' name='bloodType' value={formData.bloodType} onChange={handleInputChange}className='w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer'required/>
              </div>

              <div className='mb-5 flex items-center justify-between'>
                
              </div>
                <label className='text-headingColor font-bold text-[16px] leading-7 px-4 py-3 focus:outline-none'>
                  Gender
                  <select name="gender" value={formData.gender} onChange={handleInputChange} className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none'>
                    <option value="select">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
                <label className='text-headingColor font-bold text-[16px] leading-7 px-4 py-3 focus:outline-none'>
                  State
                  <select name="state" value={formData.state} onChange={handleInputChange} className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none'>
                    <option value="">Select</option>
                    <option value="maharashtra">Maharashtra</option>
                    <option value="karnataka">Karnataka</option>
                  </select>
                </label>
                <label className='text-headingColor font-bold text-[16px] leading-7 px-4 py-3 focus:outline-none'>
                  District
                  <select name="district" value={formData.district} onChange={handleInputChange} className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none'>
                    <option value="">Select</option>
                    <option value="solapur">Solapur</option>
                    <option value="pune">Pune</option>
                  </select>
                </label>
                <label className='text-headingColor font-bold text-[16px] leading-7 px-4 py-3 focus:outline-none'>
                  Taluka
                  <select name="taluka" value={formData.taluka} onChange={handleInputChange} className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none'>
                    <option value="">Select</option>
                    <option value="akkalkot">Akkalkot</option>
                    <option value="madhshiras">Madhshiras</option>
                  </select>
                </label>
                <label className='text-headingColor font-bold text-[16px] leading-7 px-4 py-3 focus:outline-none'>
                  Disease
                  <select name="disease" value={formData.disease} onChange={handleInputChange} className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none'>
                  <option value="none">None</option>
                    <option value="covid">COVID-19</option>
                    <option value="tuberculosis">Tuberculosis</option>
                    <option value="poliomyelitis">Poliomyelitis</option>
                  </select>
                </label>
                <label className='text-headingColor font-bold text-[16px] leading-7 px-4 py-3 focus:outline-none'>
                  Annual Income
                  <select name="annualIncome" value={formData.annualIncome} onChange={handleInputChange} className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none'>
                  <option value="none">None</option>
                    <option value="1lakh">Below 1,00,000</option>
                    <option value="3to4">3,00,000 - 4,00,000</option>
                    <option value="4to7">4,00,000 - 7,00,000</option>
                  </select>
                </label>
                <label className='text-headingColor font-bold text-[16px] leading-7 px-4 py-3 focus:outline-none'>
                  Ration Card
                  <select name="rationcard" value={formData.rationcard} onChange={handleInputChange} className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none'>
                    <option value="select">Select</option>
                    <option value="orange">Orange</option>
                    <option value="yellow">Yellow</option>
                    <option value="white">White</option>
                  </select>
                </label>

              <div className='mb-5 flex items-center gap-3'>
                {formData.photo && ( 
                  <figure className='w-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center'>
                  <img 
                    src={formData.photo} 
                    alt="" className='w-full rounded-full' />
                </figure> )}
                <div className='relative w-[160px] h-[50px]'>
                  <input type="file" name="photo" id="customFile" onChange={handleFileInputChange} accept='.jpg, .png' className='absolute top-0 left-0 h-full opacity-0 cursor-pointer'/>
                  
                  <label htmlFor="customFile" className='absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer'>{selectedFile ? selectedFile.name : 'Upload Photo'}</label>
                </div>
              </div>
            
              <div className='mt-7'>
                <button 
                    disabled={loading && true} 
                    type='submit' 
                    className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'>
                      {loading ? (<HashLoader size={25} color='#ffffff'/>) : ('Update')}
                </button>
              </div>

            </form>
    </div>
  )
}

export default Profile