"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { AlertCircle, FileUp, X } from "lucide-react"
import Navbar from "../../Components/Patient/Navbar"
import { toast, Toaster } from "react-hot-toast"
import { useSelector } from "react-redux"
import { pinata } from "./pinata" // Import Pinata

export default function PatientAddRecord() {
  const userId = useSelector((state) => state.auth.userId)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()
  const [file, setFile] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const removeFile = () => {
    setFile(null)
    // Reset the file input
    const fileInput = document.getElementById("file")
    if (fileInput) {
      fileInput.value = ""
    }
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true)

    try {
      let fileUrl = ""
      if (file) {
        const upload = await pinata.upload.file(file)
        console.log(upload)
        fileUrl = await pinata.gateways.convert(upload.IpfsHash)
        console.log(fileUrl)
      }

      const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/uploadfile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          title: data.title,
          description: data.description,
          fileUrl,
        }),
      })
      const result = await response.json()

      if (response.ok) {
        toast.success("Document saved successfully!")
        reset() // Reset form fields
        setFile(null) // Reset file state
      } else {
        throw new Error(result.message || "Failed to save document")
      }
    } catch (error) {
      toast.error("Error uploading file.")
      console.error("Error uploading file:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <div className="min-h-screen bg-gradient-to-b from-[#073243] via-[#0a4c59] to-[#0d6270] flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-8">Add Medical Record</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              label="Document Title"
              id="title"
              register={register}
              errors={errors}
              validationRules={{ required: "Document title is required" }}
              placeholder="Enter document title"
            />
            <FormField
              label="Description"
              id="description"
              register={register}
              errors={errors}
              validationRules={{ required: "Description is required" }}
              placeholder="Enter document description"
              isTextarea
            />
            <div className="space-y-2">
              <label htmlFor="file" className="text-white font-medium">
                Upload Document
              </label>
              <div className="flex items-center gap-2">
                <input id="file" type="file" onChange={handleFileChange} className="hidden" />
                <button
                  type="button"
                  className="w-full bg-white/20 border border-white/30 text-white hover:bg-white/30 flex items-center justify-center rounded-lg p-3 transition duration-300 ease-in-out"
                  onClick={() => document.getElementById("file").click()}
                >
                  <FileUp className="mr-2 h-5 w-5" />
                  {file ? file.name : "Choose file"}
                </button>
                {file && (
                  <button
                    type="button"
                    onClick={removeFile}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition duration-300 ease-in-out"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-teal-500 hover:bg-teal-600 text-white rounded-lg p-3 font-medium transition duration-300 ease-in-out ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Adding Record..." : "Add Record"}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

const FormField = ({ label, id, register, errors, validationRules, placeholder, isTextarea = false }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-white font-medium">
      {label}
    </label>
    {isTextarea ? (
      <textarea
        id={id}
        {...register(id, validationRules)}
        className={`bg-white/20 border border-white/30 text-white placeholder:text-white/50 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out ${errors[id] ? "border-red-500" : ""}`}
        placeholder={placeholder}
        rows="4"
      />
    ) : (
      <input
        id={id}
        {...register(id, validationRules)}
        className={`bg-white/20 border border-white/30 text-white placeholder:text-white/50 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out ${errors[id] ? "border-red-500" : ""}`}
        placeholder={placeholder}
      />
    )}
    {errors[id] && (
      <p className="text-red-300 text-sm flex items-center gap-1">
        <AlertCircle className="h-4 w-4" />
        {errors[id].message}
      </p>
    )}
  </div>
)