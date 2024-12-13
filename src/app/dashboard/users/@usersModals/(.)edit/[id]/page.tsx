'use server';

import { Modal } from '@/layouts/UI/Modal';
import UserForm from '@/layouts/UserForm';
import { getUser } from '../../../actions';

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const { user, closeInmediatly } = await getUser(id);

  console.log(user);

  return (
    <Modal
      title = {"Edit User"}
      closeInmediatly = { closeInmediatly }
    >
        <UserForm
          isModal={true}
          className='px-4 py-2'
          user={user}
        />
    </Modal>
  )
}