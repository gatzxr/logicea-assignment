import { useNavigate } from 'react-router-dom';

import useAuthContext from 'contexts/AuthContext';

import { PrimaryButton } from '../Buttons';
import withAuth from '../withAuth';

function Login() {
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

export default withAuth(Login);
