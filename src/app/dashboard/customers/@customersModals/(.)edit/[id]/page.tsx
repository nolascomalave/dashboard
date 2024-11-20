import { Modal } from '@/layouts/UI/Modal';
import CustomerForm from '@/layouts/CustomerForm';
import { getEntity } from '../../../actions';

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const { entity, closeInmediatly } = await getEntity(id);

  console.log(entity);

  return (
    <Modal
      title = {"Edit Customer"}
      closeInmediatly = { closeInmediatly }
    >
        <CustomerForm
          isModal={true}
          className='px-4 py-2'
          customer={entity}
        />
    </Modal>
  )
}