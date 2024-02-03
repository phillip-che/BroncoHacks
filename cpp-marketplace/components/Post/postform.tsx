'use client'
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';

// Interface for form input
interface FormInput {
	title: string;
	description: string;
	contactInfo: string;
	category: string;
	image?: string;
}
const categories = ['House', 'Kitchen', 'Technology', 'Funny', 'Bathroom', 'Laundry', 'Furniture', 'Misc'];
// Create styled components

const FormContainer = styled.form`
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;


const MyForm: React.FC = () => {
	const {
	  register,
	  handleSubmit,
	  formState: { errors },
	} = useForm<FormInput>(); // Specify the form input type
        
	const onSubmit: SubmitHandler<FormInput> = (data) => {
	  // Handle form submission logic here
	  console.log(data);
	};
        
	return (
	  <FormContainer onSubmit={handleSubmit(onSubmit)}>
	    <Label>
	      Title:
	      <Input {...register('title', { required: 'Title is required' })} type="text" />
	      {errors.title && <span>{errors.title.message}</span>}
	    </Label>
        
	    <Label>
	      Description:
	      <Input {...register('description', { required: 'Description is required' })} type="text" />
	      {errors.description && <span>{errors.description.message}</span>}
	    </Label>
        
	    <Label>
	      Contact Information:
	      <Input {...register('contactInfo', { required: 'Contact information is required' })} type="text" />
	      {errors.contactInfo && <span>{errors.contactInfo.message}</span>}
	    </Label>
        
	    <Label>
	      Category:
	      <Select {...register('category', { required: 'Category is required' })}>
	        <option value="" disabled>Select a category</option>
	        {categories.map((category) => (
		<option key={category} value={category}>
		  {category}
		</option>
	        ))}
	      </Select>
	      {errors.category && <span>{errors.category.message}</span>}
	    </Label>
        
	    <Label>
	      Image (optional):
	      <Input {...register('image')} type="text" />
	    </Label>
        
	    <Button type="submit">Submit</Button>
	  </FormContainer>
	);
        };
        
        export default MyForm;