import { useState } from "react";
import ToggleButton from "../components/ToggleButton"
import ImageUploadCard from "../components/ImageUploadCard";

function ImageRecommendation() {
	const [isToggled, setIsToggled] = useState(false);
	


	return (
		<>
			<div className="flex justify-between items-center p-10 mb-10">
				<h2 className="text-5xl text-[#97fffd] text- pl-40 berkshire-swash">Upload Your Image and See The Magic !!</h2>
				<ToggleButton isToggled={isToggled} setIsToggled={setIsToggled} />
			</div>
			<div className="border-l-[18px] border border-sky-500 rounded-3xl h-96 w-10/12 mx-auto p-10 backdrop-blur-sm bg-[rgba(255,255,255,0.05)] flex justify-between items-center">
				{
					!isToggled ? 

					<ImageUploadCard title="Upload Your Menu Here" description="Just upload your menu card here and get the recommended food from the menu as per your health and diet.." /> 
					:
					<ImageUploadCard title="Upload Your Food Item" description="Here you can upload your food item of any ingredient and get the recipe of that food with included ingredients..." />
				}
			</div>
		</>
	)
}

export default ImageRecommendation
