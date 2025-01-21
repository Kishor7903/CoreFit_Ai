import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import useDietandExerciseRecomendation from "../hooks/useDietandExerciseRecomendation";

function Details() {
	const {state, userData} = useSelector(state => state.auth)
	const [text, setText] = useState("");

	const handleHeaderContent = (state) => {
		switch(state){
            case "detail":
                return "Here's Your BMI Explaination";
            case "diet":
                return "Here's Your Diet Plan";
            case "weight":
                return "exercise";
            default:
                return "Here's Your Exercise Plan";
        }
	}

	const getData = async () => {
		let data = await useDietandExerciseRecomendation(userData, state);

		let temp = data.split("");
		let Data = "";
		for(let i=0; i<temp.length; i++){
			if(temp[i] !== "*" && temp[i] !== "#" && temp[i] !== "%"){
				Data += temp[i];
			}
		}

		const textArr = Data.split("\n");
        let newData = textArr.map((e, index) => {
            const formatedText = e.replace(
                /(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|BMI Classification|BMI Interpretation|Tailored Exercise and Diet Plan|Exercise Plan|Additional Tips|Benefits of Exercise|BMI Assessment|Personalized Fitness Plan|Diet Section|Precautions|Exercise Section|)/g,
                "<strong>$1</strong>"
            );
    
            return (
                <p
                    key={index}
                    dangerouslySetInnerHTML={{ __html: formatedText }}
                    className="mt-8"
                />
            );
        });

		setText(newData)
	}

	useEffect(() => {
		getData()
	}, [state])

	return (
		<div className="min-h-screen w-full py-5 px-28">
			<h2 className="text-5xl mb-12 border-b-2 pb-2 text-cyan-200 text-center fredoka font-semibold tracking-wide">{handleHeaderContent(state)}</h2>
			<div className="bg-white rounded-xl h-full w-full border min-h-32 p-14 text-black text-lg">{text}</div>
		</div>
	)
}

export default Details
