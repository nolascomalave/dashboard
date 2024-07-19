import { Modal } from '@/layouts/UI/Modal';
import UserForm from '@/layouts/UserForm';
import { ClientFetch } from '@/util/Fetching';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation';
import { FullUser } from '@/assets/types/users';

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const session = await getServerSession(authOptions),
    ftc = new ClientFetch();
  let user: undefined | FullUser = undefined,
    closeInmediatly: null | {
      fn?: 'success' | 'error' | 'info' | 'warning';
      message: string;
      options?: undefined | {[key: string]: any};
    } = null;

  try {
    const res = await ftc.get({
      url: `${process.env.API}/system-subscription-users/${id}`,
      headers: {
          authorization: `Bearer ${session?.backendTokens.accessToken}`
      },
    });

    if(res.status === 400 || res.status === 500) {
      throw res.status;
    } else if(res.status === 401) {
      return redirect('/login');
    } else if(res.status === 404) {
      closeInmediatly = {
        fn: 'warning',
        message: 'User not found!',
        options: {
          position: 'bottom-left',
          closeButton: true,
          duration: 5000
        }
      };
    }

    user = await res.json();
  } catch(e: any) {
    closeInmediatly = {
      fn: 'error',
      message: 'An unexpected error has occurred.',
      options: {
        position: 'bottom-left',
        closeButton: true,
        duration: Infinity
      }
    };
  }

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