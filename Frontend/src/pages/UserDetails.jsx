import smartWatch from '../assets/smartWatch.jpg'
import { Parallax } from 'react-parallax'
import Button from '../components/Button'
import { useState } from 'react';
import calculateBmi from '../hooks/calculateBmiHook';
import { useDispatch } from "react-redux"
import { updateData } from '../store/features/authSlice';


function UserDetails() {
	const [gender, setgender] = useState("");
	const [heightInFeet, setHeightInFeet] = useState("");
	const [heightInInch, setHeightInInch] = useState("");
	const [heightInCms, setHeightInCms] = useState("");
	const [weight, setWeight] = useState("");
	const [heightMeasurementType, setHeightMeasurementType] = useState("Feet")
	const [weightMeasurementType, setWeightMeasurementType] = useState("KG")
	const [loading, setLoading] = useState(false);
	const [bmi, setBmi] = useState(null);
	const [description, setDescription] = useState("");
	const dispatch = useDispatch();

	const handleChange = (event) => {
		event.preventDefault();
		if(event.target.name === "gender"){
			setgender(event.target.value);
		}
		else if(event.target.name === "height"){
            setHeightMeasurementType(event.target.value);
			setHeightInCms("");
			setHeightInFeet("");
			setHeightInInch("");
        }
		else if(event.target.name === "weight"){
			setWeightMeasurementType(event.target.value)
			setWeight("");
		}
	};

	const handleHeightChange = (e) => {
		e.preventDefault();
		if(heightMeasurementType === "Feet"){
			e.target.name === "feet" ? setHeightInFeet(e.target.value) : setHeightInInch(e.target.value)  
        }
		else if(heightMeasurementType === "CMS"){
            setHeightInCms(e.target.value)
        }
	}

	const handleWeightChange = (e) => {
		e.preventDefault();
		setWeight(parseInt(e.target.value))
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		setLoading(true);
		setBmi(null)
		
		let ht = null;
		let wt = null;

		if(!gender){
            alert("Select Gender!!!")
			setLoading(false)
			return
        }

		if(heightMeasurementType === "Feet"){
			if(!heightInFeet || !heightInInch){
				alert("Enter Height Feild!!!")
				setLoading(false)
				return
			}
			ht = heightInFeet + "." + heightInInch + " foot";
		} else{
			if(!heightInCms){
				alert("Enter Height Feild!!!")
				setLoading(false)
				return
			}
			ht = heightInCms + " cm"
		}

		if(!weight){
			alert("Enter Weight Feild!!!")
		}

		if(weightMeasurementType === "KG"){
			wt = weight + " kg";
		}else {
			wt = weight + " lb";
		}

		let data = await calculateBmi({ht, wt, gender})
		let Data = data.split("\n");
		scrollBy({
			top: 300,
            behavior: "smooth"
		})
		setBmi(Data[0]);
		setDescription(Data[2])
		setLoading(false);
		dispatch(updateData({
			height: ht,
			weight: wt,
			BMI: bmi,
			Gender: gender
		}))
	}

	return (
		<div>

			{/* parallex effect */}
			<Parallax blur={{ min: -10, max: 15 }} bgImage={smartWatch} strength={600}>
				<div className="h-[500px] bg-center bg-cover relative flex items-center" >
					<div className='ml-4'>
						<h2 className='font-bold text-6xl fade-right'>Get your <span className='text-orange-400'>Fitness</span> <br /><span className='text-8xl'>Recomendations</span></h2>
					</div>
				</div>
			</Parallax>


			<div className='w-full flex justify-between bg-gradient-to-r from-[#060618] to-[#003c89] h-[600px]'>
				<div className='flex flex-col w-1/3 space-y-10 ml-40 py-20'>
					<div className='h-auto w-auto space-x-5'>

						<Button id="gender" name="Male" icon="fi fi-br-male" handleChange={handleChange} info={gender} className="px-4 py-2 text-xl font-medium" />

						<Button id="gender" name="Female" icon="fi fi-br-female" handleChange={handleChange} info={gender} className="px-4 py-2 text-xl font-medium" />

						<Button id="gender" name="Other" icon="fi fi-rs-transgender" handleChange={handleChange} info={gender} className="px-4 py-2 text-xl font-medium" />

					</div>
					<div className='flex justify-between bg-[rgba(96,99,255,0.23)] rounded-lg p-3'>
						<h2 className='text-2xl'>Height</h2>
						<div className="flex items-end space-x-8 text-slate-300 ">
							{
								heightMeasurementType === "Feet" ?
								<div className='space-x-4'>
									<input type="number" name="feet" className='bg-transparent border-b border-white w-10 h-9 focus:outline-none text-center text-2xl' value={heightInFeet} onChange={handleHeightChange}  />
									<span className='relative right-5 bottom-2 text-xl'>"</span>
									<input type="number" name="inch" className='bg-transparent border-b border-white w-10 h-9 focus:outline-none text-center text-2xl' value={heightInInch} onChange={handleHeightChange} />
									<span className='relative right-5 bottom-2 text-xl'>'</span>
								</div> :
								<input type="text" className='bg-transparent border-b border-white w-12 h-9 focus:outline-none text-center text-2xl' value={heightInCms} onChange={handleHeightChange} />
							}
							<div className=" space-x-3">
								<Button id="height" name="Feet" handleChange={handleChange} info={heightMeasurementType} className="px-2 py-1 text-sm" />

								<Button id="height" name="CMS" handleChange={handleChange} info={heightMeasurementType} className="px-2 py-1 text-sm" />
							</div>
						</div>
					</div>
					<div className='flex justify-between bg-[rgba(96,99,255,0.23)] rounded-lg p-3 '>
						<h2 className='text-2xl'>Weight</h2>
						<div className="flex items-end space-x-8 text-slate-300 ">
							<input type="number" className='bg-transparent border-b border-white w-12 h-9 focus:outline-none text-center text-2xl' value={weight} onChange={handleWeightChange} />
							<div className=" space-x-3">
								<Button id="weight" name="KG" handleChange={handleChange} info={weightMeasurementType} className="px-2 py-1 text-sm" />

								<Button id="weight" name="LBS" handleChange={handleChange} info={weightMeasurementType} className="px-2 py-1 text-sm" />
							</div>
						</div>
					</div>
					<button onClick={handleSubmit} type='submit' className='h-10 w-40 bg-gradient-to-r from-violet-600 to-violet-300 self-center rounded'>{loading ? "Loading...": "Calculate BMI"}</button>
				</div>
				{
					bmi && (
						<div className="flex flex-col justify-center items-center w-1/2 fade-right py-20">
							<h2 className='text-4xl'>Your BMI Score<br /> <span className='text-8xl font-semibold text-orange-400'>{bmi}</span></h2>
							<div className='flex items-center h-40 mb-10'>
								<span className='text-[150px] font-thin text-blue-400'>{"{"}</span>
								<p className='text-xl pt-7'>According to your BMI score,<br /> you are <br /><span className='font-bold text-4xl text-orange-400'>{description}</span></p>
							</div>
							<button className='bg-gradient-to-r from-blue-400 to-blue-600 rounded px-3 py-2 text-white'>Your BMI Explaination</button>
							<div className="flex justify-between mt-5 gap-5">
								<button className='bg-gradient-to-r from-pink-400 to-pink-700 rounded px-3 py-2 text-white'>Get Diet Recommendation</button>
								<button className='bg-gradient-to-r from-yellow-400 to-orange-700 rounded px-3 py-2'>Get Exercise Recommendation</button>
							</div>
						</div>
					)
				}
			</div>

		</div>
	)
}

export default UserDetails
