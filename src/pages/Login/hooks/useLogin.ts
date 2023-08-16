import { useState } from 'react';

export const useLogin = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [dirty, setDirty] = useState<boolean>(false);

  const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    setDirty(true);
  }

  const isUsernameValid = formData.username.length;
  const isPasswordValid = formData.password.match(PASSWORD_REGEX);
  const isFormValid = isUsernameValid && isPasswordValid;

  return {
    validators: {
      isUsernameValid,
      isPasswordValid,
      isFormValid
    },
    handleInputChange,
    formData,
    dirty
  }
}