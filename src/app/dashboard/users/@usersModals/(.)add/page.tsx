import { Modal } from '@/layouts/UI/Modal';
import UserForm from '@/layouts/UserForm';
// import { ClientFetch } from '@/util/Fetching';

export default async function Page() {

  /* const ftc = new ClientFetch();

  const res = await ftc.post({
      url: `${process.env.API}/system-subscription-users/`,
      data: data,
      headers: {
          authorization: `Bearer ${session?.backendTokens.accessToken}`
      },
  }); */

  return (
    <Modal title = {"New User"}>
        <UserForm
          isModal={true}
          className='px-4 py-2'
        />
    </Modal>
  );
}