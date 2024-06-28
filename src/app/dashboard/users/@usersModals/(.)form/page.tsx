import { Modal } from '@/UI/Modal';
import UserForm from '@/layouts/UserForm';

export default function Page() {
  return (
    <Modal>
        <UserForm
          clasName='px-4 py-2'
        />
    </Modal>
  )
}