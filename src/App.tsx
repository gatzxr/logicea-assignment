import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from 'components/Layout';
import { EditJoke, Jokes, Login, NotFound } from 'components/Pages';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/jokes" />} />
      <Route path="/jokes" element={<Layout />}>
        <Route index element={<Jokes />} />
        <Route path="new" element={<EditJoke isNew />} />
        <Route path=":id" element={<EditJoke isNew={false} />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
