import { useState } from "react";
import ToggleButton from "../components/ToggleButton"

function ImageRecommendation() {
  const [isToggled, setIsToggled] = useState(false);


  return (
    <>
      <div className="flex justify-between items-center p-10">
        <h2 className="text-4xl">Upload Your Image and See The Magic !!</h2>
        <ToggleButton isToggled={isToggled} setIsToggled={setIsToggled} />
      </div>
    </>
  )
}

export default ImageRecommendation
