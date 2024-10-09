'use server';

import { getUser } from '../actions';

export default async function ProfileInfo({ id }: { id: string }) {
    const { user } = await getUser(id);

    await new Promise(res => setTimeout(() => res(true), 10000));

    return (
        <div className='info'>
            <div className='entity-card'>
                <div
                    className = 'rounded-full text-primary_color duration-100 bg-primary_layout'
                    style = {{
                        width: '3rem',
                        height: '3rem'
                    }}
                >

                </div>
            </div>
        </div>
    );
};