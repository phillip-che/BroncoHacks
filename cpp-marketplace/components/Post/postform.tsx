'use client'
import {useEffect, useState} from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormContainer, Label, Input, InputWithRows, Select, Button, ButtonContainer, Textarea } from './styles'; // Import styled components
import db from '../../database/firebase'
import * as firestore from 'firebase/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Interface for form input
interface FormInput {
  title: string;
  description: string;
  contactInfo: string;
  category: string;
  image?: string;
}

const categories = ['House', 'Kitchen', 'Technology', 'Funny', 'Bathroom', 'Laundry', 'Furniture', 'Misc'];

const PostForm: React.FC = () => {

  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [category, setCategory] = useState("");
  // const [title, setTitle] = useState("");

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user && user.emailVerified && user.displayName) {
        setUsername(user.displayName);
      } else {
        setUsername("");
      }
    });
    
  }, [auth]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>(); // Specify the form input type

  const onPostClick = () => {
    // Handle form submission logic here

    console.log(username);
    console.log(title);
    console.log(description);
    console.log(contact);
    console.log(category);

    const savePost = async () => {
      await addDoc(collection(db, "posts"), {
        username: username,
        title: title,
        description: description,
        contact: contact,
        category: category,
      }).then(() => {
        alert("Post Successful!");
      });
    };

    savePost();
  };

  return (
    <FormContainer>
      <Label>
        Title:
        <Input {...register('title', )} type="text" placeholder='Enter your title here' onChange={(e) => setTitle(e.target.value)}/>
      </Label>

      <Label>
        Description:
        <Textarea {...register('description', )} rows={5} placeholder='Enter item description here' style={{verticalAlign: 'top', lineHeight: '1' }} onChange={(e) => setDescription(e.target.value)}/>
      </Label>

      <Label>
        Contact Information:
        <Input {...register('contactInfo', )} type="text" placeholder='Email or Phone Number' onChange={(e) => setContact(e.target.value)} />
      </Label>

      <Label>
        Category:
        <Select {...register('category', { required: 'Category is required' })} onChange={(e) => setCategory(e.target.value)}>
	<option value="" disabled>
	  Select a category
	</option>
	{categories.map((category) => (
	  <option key={category} value={category}>
	    {category}
	  </option>
	))}
        </Select>
      </Label>

	<Label>
	Image:
	<Input {...register('image',{required:'Image is required'})} type="file" accept=".jpg" />
	</Label>

    <ButtonContainer>
        <Button type="submit" onClick={onPostClick}>Post</Button>
    </ButtonContainer>
    </FormContainer>
  );
};

export default PostForm;