// components/Post/styles.ts
//MUI stylign not css
// components/Post/styles.ts
import { styled, alpha } from '@mui/system';

interface InputProps {
    rows?: number;
}

export const FormContainer = styled('form')({
  paddingTop: 200,
  maxWidth: 400,
  margin: 'auto',
  marginTop: 75,
  padding: 20,
  border: '1px solid #ddd',
  borderRadius: 5,
  backgroundColor: '#acb1b9',
  color: 'black',
  fontWeight: 500,
  marginBottom: 30,
});

export const Label = styled('label')({
  display: 'block',
  marginBottom: 10,
});

export const Input = styled('input')<InputProps>((props) =>({
  width: '100%',
  padding: 8,
  marginTop: 4,
  marginBottom: 10,
  boxSizing: 'border-box',
  ...(props.rows && { height: `calc(${props.rows} * 1.5em)` }),
  '&::placeholder': {
    color: 'gray', // Adjust the color to your preference
  },
  '& textarea': {
    verticalAlign: 'top',
    height: `calc(${props.rows} * 1.5em)`, // Adjust height for textareas
  },
}));



export const InputWithRows = styled('input')<{ rows?: number }>((props) => ({
    height: `calc(${props.rows ?? 1} * 1.5em)`,
  }));

export const Textarea = styled('textarea')<InputProps>((props) => ({
    width: '100%',
    padding: 8,
    marginTop: 4,
    marginBottom: 10,
    boxSizing: 'border-box',
    ...(props.rows && { height: `calc(${props.rows} * 1.5em)` }),
    '&::placeholder': {
      color: 'gray', // Adjust the color to your preference
    },
    verticalAlign: 'top',
  }));

export const Select = styled('select')({
  width: '100%',
  padding: 8,
  marginTop: 4,
  marginBottom: 10,
  boxSizing: 'border-box',
});

export const ButtonContainer = styled('div')({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  });

export const Button = styled('button')({
  backgroundColor: '#78866b',
  color: 'white',
  padding: 15,
  border: 'none',
  borderRadius: 4,
  cursor: 'pointer',
  fontSize: 20,
  margin: 'auto',
  marginTop: 5,
  width: '50%',
});