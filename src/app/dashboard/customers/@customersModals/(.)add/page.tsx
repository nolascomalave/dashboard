import { Modal } from '@/layouts/UI/Modal';
import CustomerForm from '@/layouts/CustomerForm';
// import { ClientFetch } from '@/util/Fetching';

export default async function Page() {
  return (
    <Modal title = {"New Customer"}>
        <CustomerForm
          isModal={true}
          className='px-4 py-2'
        />
    </Modal>
  );
}