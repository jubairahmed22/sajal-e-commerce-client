import React, { useContext, useState } from 'react'

import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthProvider';
import { addHome } from '../../api/services';
import AddServiceForm from '../../Components/Form/AddServiceForm';
import { imageUpload } from '../../api/imageUpload';


const AddProjects = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [preview, setPreviews] = useState([]);
    const [uploadButtonText, setUploadButtonText] = useState('Upload Images');
    const [arrivalDate, setArrivalDate] = useState(new Date());
    const [departureDate, setDepartureDate] = useState(
      new Date(arrivalDate.getTime() + 24 * 60 * 60 * 1000)
    );
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const projectName = event.target.projectName.value;
      const title = event.target.title.value;
      const liveLink = event.target.liveLink.value;
      const githubFrontendLink = event.target.githubFrontendLink.value;
      const githubBackendLink = event.target.githubBackendLink.value;
      const adminEmail = event.target.adminEmail.value;
      const adminPass = event.target.adminPass.value;
      const superAdminEmail = event.target.superAdminEmail.value;
      const superAdminPass = event.target.superAdminPass.value;
      const from = arrivalDate;
      const to = departureDate;
      const technology = event.target.technology.value;
      const description = event.target.description.value;
      const images = event.target.images.files;
      setLoading(true);
  
      try {
        const imageUploadPromises = Array.from(images).map((image) => imageUpload(image));
        const imageResponses = await Promise.all(imageUploadPromises);
        const imageLinks = imageResponses.reduce((acc, res, index) => {
          acc[`img${index + 1}`] = res.data.display_url;
          return acc;
        }, {});
  
        const homeData = {
          projectName,
          title,
          from,
          to,
          technology,
          description,
          liveLink,
          githubBackendLink,
          githubFrontendLink,
          adminEmail,
          adminPass,
          superAdminEmail,
          superAdminPass,
          images: imageLinks,
          host: {
            name: user?.displayName,
            image: user?.photoURL,
            email: user?.email,
          },
        };
  
        await addHome(homeData);
        setLoading(false);
        toast.success('Home Added!');
        navigate('/dashboard/manage-homes');
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
  
    const handleImageChange = (event) => {
      const files = event.target.files;
      const filePreviews = Array.from(files).map((file) => ({
        url: window.URL.createObjectURL(file),
        name: file.name,
      }));
      setPreviews(filePreviews);
      setUploadButtonText(`${files.length} Images Selected`);
    };
  return (
    <>
      <h1 className='text-3xl font-bold text-gray-800 py-8 text-center'>
        Add Projects
      </h1>
      <AddServiceForm
        handleSubmit={handleSubmit}
        arrivalDate={arrivalDate}
        setArrivalDate={setArrivalDate}
        departureDate={departureDate}
        setDepartureDate={setDepartureDate}
        loading={loading}
        handleImageChange={handleImageChange}
        preview={preview}
        uploadButtonText={uploadButtonText}
      />
    </>
  )
}

export default AddProjects
