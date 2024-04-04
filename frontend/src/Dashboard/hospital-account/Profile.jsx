import { useEffect, useState } from "react"
import {AiOutlineDelete} from 'react-icons/ai';
import uploadImagetoCloudinary from './../../utils/uploadCloudinary'
import {BASE_URL, token} from './../../config.js'
import {toast} from 'react-toastify'


const Profile = ({ hospitalData }) => {

  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:'',
    phone:'',
    bio:'',
    state:'',
    district:'',
    taluka:'',
    address:'',
    treatments:[],
    ticketPrice:0,
    schemesAvailable:[],
    timeSlots:[],
    about:'',
    photo:null
  });

  useEffect(()=>{
    setFormData({
      name:hospitalData?.name,
      email:hospitalData?.email,
      
      phone:hospitalData?.phone,
      bio:hospitalData?.bio,
      state:hospitalData?.state,
      district:hospitalData?.district,
      taluka:hospitalData?.taluka,
      address:hospitalData?.address,
      treatments:hospitalData?.treatments,
      ticketPrice:hospitalData?.ticketPrice,
      schemesAvailable:hospitalData?.schemesAvailable,
      timeSlots:hospitalData?.timeSlots,
      about:hospitalData?.about,
      photo:hospitalData?.photo,
    })
  },[hospitalData]);

  const handleInputChange = e => {
    setFormData({...formData, [e.target.name]:e.target.value})
  };

  const handleFileInputChange = async event =>{
    const file = event.target.files[0]
    const data = await uploadImagetoCloudinary(file);
    setFormData({...formData, photo:data?.url})

  }

  const updateProfileHandler = async e => {
    e.preventDefault();

    try {
      
      const res = await fetch(`${BASE_URL}/hospitals/${hospitalData._id}`,{
        method:'PUT',
        headers:{
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(formData)
      }) 
      const result = await res.json()
      if(!res.ok){
        throw Error(result.message);
      }

      toast.success(result.message);

    } catch (err) {
      toast.error(err.message)
    }
  }

  //reusable function for adding item
  const addItem = (key, item) => {
    setFormData(prevFormData=>({...prevFormData, [key] : [...prevFormData[key], item]}))
  }

  //reusable function for input change
  const handleReusableInputChangeFunc = (key, index, event) => {
    const {name, value} = event.target

    setFormData(prevFormData => {
      const updateItems = [...prevFormData[key]]

      updateItems[index][name] = value

      return {
        ...prevFormData,
        [key]: updateItems,
      };
    });
  };

  //reusable function for delete item
  const deleteItem = (key, index)=>{
    setFormData(prevFormData => ({
      ...prevFormData, 
      [key] : prevFormData[key].filter((_,i)=>i!==index),
    }));
  };

  // Scheme functionality ==================================================
  const addScheme = e => {
    e.preventDefault()

    addItem('schemesAvailable', {
      name:'',
    });
  };
  
  const handleSchemeChange = (event, index) => {
    handleReusableInputChangeFunc('schemesAvailable', index, event)
  }

  const deleteScheme = (e, index)=>{
    e.preventDefault()
    deleteItem('schemesAvailable', index)
  }

  // Treatment Functionality =========================================
  const addTreatment = e => {
    e.preventDefault()

    addItem('treatments', {
        name:'',
    });
  };

  const handleTreatmentChange = (event, index) => {
    handleReusableInputChangeFunc('treatments', index, event)
  }

  const deleteTreatment = (e, index)=>{
    e.preventDefault()
    deleteItem('treatments', index)
  }

  // TimeSlot handling ===============================================
  const addTimeSlot = e => {
    e.preventDefault()

    addItem('timeSlots', {
      day:"Sunday", 
      startingTime:"10:00", 
      endingTime:"04:30"
    });
  };

  const handleTimeSlotChange = (event, index) => {
    handleReusableInputChangeFunc('timeSlots', index, event)
  }

  const deleteTimeSlot = (e, index)=>{
    e.preventDefault()
    deleteItem('timeSlots', index)
  }

  return (
    <div>
      <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
        Profile Information
      </h2>

      <form>
        <div className="mb-5">
          <p className="form_label">Hospital Name*</p>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleInputChange}
            placeholder="Name" 
            className="form_input" />
        </div>
        <div className="mb-5">
          <p className="form_label">Hospital Email*</p>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleInputChange}
            placeholder="Email" 
            className="form_input"
            readOnly
            aria-readonly
            disabled="true"/>
        </div>
        <div className="mb-5">
          <p className="form_label">Contact No.*</p>
          <input 
            type="number" 
            name="phone" 
            value={formData.phone} 
            onChange={handleInputChange}
            placeholder="Phone" 
            className="form_input"/>
        </div>
        <div className="mb-5">
          <p className="form_label">Bio*</p>
          <input 
            type="text" 
            name="bio" 
            value={formData.bio} 
            onChange={handleInputChange}
            placeholder="Bio" 
            className="form_input"
            maxLength={100}/>
        </div>

        <div className="mb-5">
          <div className="grid grid-cols-3 gap-5 mb-[30px]">
            <div>
              <p className="form_label">State*</p>
              <select name="state" value={formData.state} onChange={handleInputChange} 
              className="form_input py-3.5">
                <option value="" disabled>Select State</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
              </select>
            </div>
            <div>
              <p className="form_label">District*</p>
                <input 
                  type="text" 
                  name="district" 
                  value={formData.district} 
                  onChange={handleInputChange}
                  placeholder="District" 
                  className="form_input"
                />
            </div>
            <div>
              <p className="form_label">City/Taluka*</p>
                <input 
                  type="text" 
                  name="taluka" 
                  value={formData.taluka} 
                  onChange={handleInputChange}
                  placeholder="Taluka" 
                  className="form_input"
                />
            </div>

            <div>
              <p className="form_label">Fee Applicable ₹</p>
              <input type="number" placeholder="100" name="ticketPrice" value={formData.ticketPrice}
              className="form_input"
              onChange={handleInputChange}/>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <p className="form_label">Add Schemes Available*</p>
          {formData.schemesAvailable?.map((item,index)=> 
            (<div key={index}>
            <div>
              <div className="grid grid-cols-2 gap-5 mt-5">
                <div>
                  <p className="form_label">Scheme Name*</p>
                  <input type="text" name='name' value={item.name} 
                  className="form_input" 
                  onChange={e=> handleSchemeChange(e, index)}/>
                </div>
              </div>

              <button onClick={e=>deleteScheme(e,index)} className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer">
                <AiOutlineDelete/>
              </button>
            </div>
          </div>
        ))}

        <button onClick={addScheme} className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer">Add Scheme</button>
        </div>
        
        {/* Treatment Section */}

        <div className="mb-5">
          <p className="form_label">Add Treatment Available*</p>
          {formData.treatments?.map((item,index)=> (<div key={index}>
            <div>
              <div className="grid grid-cols-2 gap-5 mt-5">
                <div>
                  <p className="form_label">Treatment Name*</p>
                  <input type="text" name='name' value={item.name} 
                  className="form_input" 
                  onChange={e=> handleTreatmentChange(e, index)}/>
                </div>
              </div>

              <button onClick={e=>deleteTreatment(e,index)} className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer">
                <AiOutlineDelete/>
              </button>
            </div>
          </div>
        ))}

        <button onClick={addTreatment} className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer">Add Treatment</button>
        </div>

        {/* Time Slot Section */}
        <div className="mb-5">
          <p className="form_label">Time Slots*</p>
          {formData.timeSlots?.map((item,index)=> (<div key={index}>
            <div>
              <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5">
                <div>
                  <p className="form_label">Day*</p>
                    <select name="day" 
                            value={item.day} 
                            className="form_input py-3.5"
                            onChange={e=> handleTimeSlotChange(e, index)}>
                      <option value="">Select</option>
                      <option value="saturday">Saturday</option>
                      <option value="sunday">Sunday</option>
                      <option value="monday">Monday</option>
                      <option value="tuesday">Tuesday</option>
                      <option value="wednesday">Wednesday</option>
                      <option value="thursday">Thursday</option>
                      <option value="friday">Friday</option>
                    </select>
                </div>
                <div>
                  <p className="form_label">Starting Time*</p>
                  <input type="time" name='startingTime' value={item.startingTime} 
                  className="form_input"
                  onChange={e=> handleTimeSlotChange(e, index)} />
                </div>
                <div>
                  <p className="form_label">Ending Time*</p>
                  <input type="time" name='endingTime' value={item.endingTime} 
                  className="form_input"
                  onChange={e=> handleTimeSlotChange(e, index)} />
                </div>
                <div onClick={e=>deleteTimeSlot(e,index)} className="flex items-center">
                <button className="bg-red-600 p-2 rounded-full text-white text-[18px] cursor-pointer mt-6">
                  <AiOutlineDelete/>
                </button>
                </div>
              </div>
              
            </div>
          </div>
        ))}

        <button onClick={addTimeSlot} className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer">Add TimeSlot</button>
        </div>

        <div className="mb-5">
          <p className="form_label">Address*</p>
          <textarea name="address" 
                    rows={2} 
                    value={formData.address} 
                    placeholder="Address" 
                    onChange={handleInputChange} 
                    className="form_input">
          </textarea>
        </div>

        <div className="mb-5">
          <p className="form_label">About*</p>
          <textarea name="about" 
                    rows={5} 
                    value={formData.about} 
                    placeholder="Write about you" 
                    onChange={handleInputChange} 
                    className="form_input">
          </textarea>
        </div>

        <div className="mb-5 flex items-center gap-3">
        {formData.photo && ( 
                  <figure className='w-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center'>
                  <img 
                    src={formData.photo} 
                    alt="" className='w-full rounded-full' />
                </figure> )}
                <div className='relative w-[160px] h-[50px]'>
                  <input type="file" 
                  name="photo" 
                  id="customFile" 
                  onChange={handleFileInputChange} 
                  accept='.jpg, .png' 
                  className='absolute top-0 left-0 h-full opacity-0 cursor-pointer'/>
                  
                  <label htmlFor="customFile" 
                  className='absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer'>
                    Upload Photo
                  </label>
                </div>
        </div>

        <div className="mt-7">
          <button type="submit" onClick={updateProfileHandler} className="bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg">Update Profile</button>
        </div>
      </form>
    </div>
  )
}

export default Profile