import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AlertCircle, FileUp } from 'lucide-react';
import Navbar from '../../Components/Patient/Navbar';
import { toast, Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

export default function PatientAddRecord() {
  const userId = useSelector((state) => state.auth.userId);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('title', data.title);
    formData.append('description', data.description);
    if (file) formData.append('file', file);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/uploadfile`, {
        method: 'POST',
        body: formData
      });
      const result = await response.json();

      if (response.ok) {
        toast.success('Document saved successfully!');
      } else {
        throw new Error(result.message || 'Failed to save document');
      }
    } catch (error) {
      toast.error('Error uploading file.');
      console.error('Error uploading file:', error);
    }
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <div className="min-h-screen bg-gradient-to-b from-[#073243] via-[#0a4c59] to-[#0d6270] flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md border-none text-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold tracking-tight text-center">Add Medical Record</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-white">Document Title</label>
              <input
                id="title"
                {...register('title', { required: "Document title is required" })}
                className={`bg-white/20 border border-white/30 text-white placeholder:text-white/50 rounded p-2 w-full ${errors.title ? 'border-red-500' : ''}`}
                placeholder="Enter document title"
              />
              {errors.title && <p className="text-red-300 text-sm flex items-center gap-1"><AlertCircle className="h-4 w-4" />{errors.title.message}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-white">Description</label>
              <textarea
                id="description"
                {...register('description', { required: "Description is required" })}
                className={`bg-white/20 border border-white/30 text-white placeholder:text-white/50 rounded p-2 w-full ${errors.description ? 'border-red-500' : ''}`}
                placeholder="Enter document description"
                rows="4"
              />
              {errors.description && <p className="text-red-300 text-sm flex items-center gap-1"><AlertCircle className="h-4 w-4" />{errors.description.message}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="file" className="text-white">Upload Document</label>
              <div className="flex items-center gap-2">
                <input id="file" type="file" onChange={handleFileChange} className="hidden" />
                <button type="button" className="w-full bg-white/20 border border-white/30 text-white hover:bg-white/30 flex items-center justify-center rounded p-2" onClick={() => document.getElementById('file').click()}>
                  <FileUp className="mr-2 h-4 w-4" />{file ? file.name : 'Choose file'}
                </button>
              </div>
            </div>
            <button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white rounded p-2">Add Record</button>
          </form>
        </div>
      </div>
    </>
  );
}
