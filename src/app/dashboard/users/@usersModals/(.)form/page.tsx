import { Modal } from '@/layouts/UI/Modal';
import UserForm from '@/layouts/UserForm';

export default function Page() {
  return (
    <Modal title = {"New User"}>
        <UserForm
          clasName='px-4 py-2'
        />
    </Modal>
  )
}