'use client'
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

function PostForm() {
  const [formData, setFormData] = useState({
    name_roue: '',
    localisation: '',
    db_name_client: '',
    gifts: Array(5).fill({ name: '', probability: '' }),
    points: Array(5).fill({ name: '', probability: '' }),
    social_media: Array(3).fill({ network: '', url: '' })
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e, index, arrayName) => {
    const { name, value } = e.target;
    const newArray = formData[arrayName].map((item, i) => {
      if (i === index) {
        return { ...item, [name]: value };
      }
      return item;
    });
    setFormData({ ...formData, [arrayName]: newArray });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSimpleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    // Basic validation for simplicity
    if (!formData.name_roue) newErrors.name_roue = 'Name of roue is required';
    if (!formData.localisation) newErrors.localisation = 'Localisation is required';
    if (!formData.db_name_client) newErrors.db_name_client = 'DB Name Client is required';

    formData.gifts.forEach((gift, index) => {
      if (!gift.name) newErrors[`gift_name_${index}`] = 'Gift name is required';
      if (!gift.probability) newErrors[`gift_probability_${index}`] = 'Gift probability is required';
    });

    formData.social_media.forEach((social, index) => {
      if (!social.network) newErrors[`social_network_${index}`] = 'Social network name is required';
      if (!social.url) newErrors[`social_url_${index}`] = 'Social network URL is required';
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;  // Stop the submission if the form is invalid

    try {
    const response = await axios.post('http://localhost:3000/api/posts', formData);
      console.log('Form submitted successfully', response.data);
      // Optionally reset the form or redirect the user
    } catch (error) {
      console.error('Error submitting form', error);
      // Handle errors here, such as displaying a message to the user
    }
  };

  return (
    <>
    <div className='mt-5'>
    <Link href="/" className='text-black bg-blue-400 px-4 py-1 m-2 rounded-xl mt-5'>Back</Link>
    <form onSubmit={handleSubmit} className='text-black mt-4'>
      <input
        type="text"
        name="name_roue"
        value={formData.name_roue}
        onChange={handleSimpleInputChange}
        placeholder="Name of Roue"
        required
      />
      {errors.name_roue && <p>{errors.name_roue}</p>}
      
      <input
        type="text"
        name="localisation"
        value={formData.localisation}
        onChange={handleSimpleInputChange}
        placeholder="Localisation"
        required
      />
      {errors.localisation && <p>{errors.localisation}</p>}

      <input
        type="text"
        name="db_name_client"
        value={formData.db_name_client}
        onChange={handleSimpleInputChange}
        placeholder="DB Name Client"
        required
      />
      {errors.db_name_client && <p>{errors.db_name_client}</p>}

      {formData.gifts.map((gift, index) => (
        <div key={index}>
          <input
            type="text"
            name="name"
            value={gift.name}
            onChange={(e) => handleInputChange(e, index, 'gifts')}
            placeholder="Gift Name"
            required
          />
          {errors[`gift_name_${index}`] && <p>{errors[`gift_name_${index}`]}</p>}
          <input
            type="text"
            name="probability"
            value={gift.probability}
            onChange={(e) => handleInputChange(e, index, 'gifts')}
            placeholder="Probability"
            required
          />
          {errors[`gift_probability_${index}`] && <p>{errors[`gift_probability_${index}`]}</p>}
        </div>
      ))}

        {formData.points.map((point, index) => (
        <div key={index}>
          <input
            type="text"
            name="name"
            value={point.name}
            onChange={(e) => handleInputChange(e, index, 'points')}
            placeholder="Point count"
            required
          />
          {errors[`point_count_${index}`] && <p>{errors[`point_count_${index}`]}</p>}
          <input
            type="text"
            name="probability"
            value={point.probability}
            onChange={(e) => handleInputChange(e, index, 'points')}
            placeholder="Probability"
            required
          />
          {errors[`point_probability_${index}`] && <p>{errors[`point_probability_${index}`]}</p>}
        </div>
      ))}

      {formData.social_media.map((social, index) => (
        <div key={index}>
          <input
            type="text"
            name="network"
            value={social.network}
            onChange={(e) => handleInputChange(e, index, 'social_media')}
            placeholder="Social Network Name"
            required
          />
          {errors[`social_network_${index}`] && <p>{errors[`social_network_${index}`]}</p>}
          <input
            type="text"
            name="url"
            value={social.url}
            onChange={(e) => handleInputChange(e, index, 'social_media')}
            placeholder="Social Network URL"
            required
          />
          {errors[`social_url_${index}`] && <p>{errors[`social_url_${index}`]}</p>}
        </div>
      ))}

      <button type="submit" className='text-white' >Submit</button>
    </form>
    </div>
    </>
  );
}

export default PostForm;
