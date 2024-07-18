import { Modal } from '@/layouts/UI/Modal';
import UserForm from '@/layouts/UserForm';
import { ClientFetch } from '@/util/Fetching';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const ftc = new ClientFetch();

  const res = await ftc.get({
      url: `${process.env.API}/system-subscription-users/${id}`,
      headers: {
          authorization: `Bearer ${session?.backendTokens.accessToken}`
      },
  });

  console.log(`${process.env.API}/system-subscription-users/${id}`);
  console.log(await res.json());

  return (
    <Modal title = {"Edit User"}>
        <UserForm
          isModal={true}
          className='px-4 py-2'
        />
    </Modal>
  )
}