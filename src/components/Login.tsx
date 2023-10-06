import useAuthContext from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import { PrimaryButton } from './Buttons';

export default function Login() {
  const navigate = useNavigate();
  const { logIn } = useAuthContext();

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-200 dark:bg-gray-700">
      <PrimaryButton
        text="LOGIN"
        onClick={() => {
          logIn();
          navigate('/');
        }}
      />
    </div>
  );
}
