import { useRef, useState } from "react";


function ImageUploadCard({title, description, }) {
    const [imgFile, setImgFile] = useState(null);
	const [selectedImage, setSelectedImage] = useState(null)
	const inputRef = useRef(null)

	const handleImgFileChange = (e) => {
		let selectedFile = e.target.files[0];
		if (selectedFile) setImgFile(selectedFile)
		setSelectedImage(selectedFile ? URL.createObjectURL(selectedFile) : undefined)
	}

	const handleDragOver = (e) => {
		e.preventDefault()
	}

	const handleDrop = (e) => {
		e.preventDefault()

		const dropedFile = e.dataTransfer.files?.[0]
		if (dropedFile) setImgFile(dropedFile)
		setSelectedImage(dropedFile ? URL.createObjectURL(dropedFile) : undefined)
	}
  return (
    <>
      <div className="flex flex-col justify-between h-full w-1/2">
        <h2 className="text-5xl text-[#d8d6d6] amaranth border-b-2 border-sky-500 w-[485px]">{title}</h2>
        <p className="text-lg">{description}</p>
        <button className="bg-gradient-to-r from-[#77A1D3] from-0%, via-[#79CBCA] via-51%, to-[#77A1D3] to-100% h-12 w-11/12 text-slate-800 tracking-wider text-xl font-bold rounded">Submit</button>
    </div>
    <div className='h-full w-1/3'>
        <input id='image-upload' accept='image/*' className='hidden' type="file" ref={inputRef} onChange={handleImgFileChange} />
        {
            !imgFile ?
                <label htmlFor='image-upload' className="flex flex-col justify-center items-center border-2 border-dashed border-slate-300 rounded-lg h-full w-full cursor-pointer" onDragOver={handleDragOver} onDrop={handleDrop}>
                    <i className="fi fi-rs-cloud-upload text-6xl"></i>
                    <p className='text-lg text-center'>Drag and Drop or <br /> Click to Upload Image</p>
                </label> :
                <div className="h-full w-full flex flex-col justify-between items-center relative">
                    <img src={selectedImage} alt="" className='h-full w-full border' />
                    <p>{imgFile.name}</p>
                    <div className="h-8 w-8 rounded-full bg-white absolute -top-4 -right-4 border border-black text-black fredoka text-lg flex justify-center items-center cursor-pointer font-semibold" onClick={() => {
                        setImgFile(null);
                        inputRef.current.value = ""
                    }}>X</div>
                </div>
        }
    </div>
    </>
  )
}

export default ImageUploadCard
