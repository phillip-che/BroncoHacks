'use client'
import {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import { FormContainer, Label, Input, Select, Button, ButtonContainer, Textarea } from './styles'; // Import styled components
import { db, imgDb } from '../../database/firebase'
import { addDoc, collection } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { Timestamp } from 'firebase/firestore';

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
  const [img, setImg] = useState("");

  const auth = getAuth();
  const router = useRouter();

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
    if(!title || !description || !contact || !category) {
      alert("Required Fields Missing");
      return;
    }

    const savePost = async () => {
      await addDoc(collection(db, "posts"), {
        username: username,
        title: title,
        description: description,
        contact: contact,
        category: category,
        imgUrl: img,
        timestamp: Timestamp.now()
      });
      alert("Post Successful!");
      router.push('/home');
    };

    savePost();
  };

  const onUploadClick = (e: any) => {
    console.log(e.target.files[0]);
    const img = ref(imgDb, `Imgs/${uuidv4()}`);
    uploadBytes(img, e.target.files[0]).then(data => {
      console.log(data, "imgs");
      getDownloadURL(data.ref).then(val => {
        setImg(val);
      })
    })
  }

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
	<Input {...register('image',{required:'Image is required'})} type="file" accept=".jpg" onChange={onUploadClick}/>
	</Label>
    <ButtonContainer>
        <Button type="submit" onClick={onPostClick}>Post</Button>
    </ButtonContainer>
    </FormContainer>
  );
};

export default PostForm;