import User from '../models/UserSchema.js'
import Hospital from '../models/HospitalSchema.js'
import Booking from '../models/BookingSchema.js'
import Stripe from 'stripe'

export const getCheckoutSession = async (req,res) => {
    try {
        
        //get currently booked hospital
        const hospital = await Hospital.findById(req.params.hospitalId)
        const user = await User.findById(req.userId)

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

        //create stripe chekout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            mode:"payment",
            success_url:`${process.env.CLIENT_SITE_URL}/checkout-success`,
            cancel_url:`${req.protocol}://${req.get('host')}/hospitals/${hospital.id}`,
            customer_email:user.email,
            client_reference_id:req.params.hospitalId,
            line_items:[
                {
                    price_data:{
                        currency:"usd",
                        unit_amount:hospital.ticketPrice * 100,
                        product_data:{
                            name:hospital.name,
                            description:hospital.bio,
                            images:[hospital.photo]
                        }
                    },
                    quantity:1,
                }
            ]
        })

        //create new booking
        const booking = new Booking({
            hospital:hospital._id,
            user:user._id,
            ticketPrice:hospital.ticketPrice,
            session:session.id,
        })

        await booking.save()
        res.status(200).json({success:true, message:'Successfully paid', session})
    } catch (err) {
        res
        .status(500)
        .json({success:false, message:'Error creating checkout session'});

    }
}