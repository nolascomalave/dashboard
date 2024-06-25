'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import styles from './InputSearch.module.scss';
import clsx from 'clsx';
import { Search } from 'lucide-react';

export default function InputSearch({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', '1');

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div
        className={clsx({
            "w-full relative flex flex-1 flex-shrink-0": true,
            [styles.InputSearch]: true
        })}
        style={{
            maxWidth: '800px'
        }}
    >
      {/* <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className={clsx({
            [styles.InputSearch]: true,
            'w-full': true
        })}
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      /> */}

        <label htmlFor="voice-search" className="sr-only">Search</label>
        <div className="relative w-full">
            <input
                type="text" id="voice-search"
                className={"border border-gray-300 text-sm rounded-lg block w-full p-2 pe-10"}
                placeholder={placeholder}
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get('query')?.toString()}
                required
            />
            <Search
                width={20}
                height={20}
                className='w-9 h-9 text-inherit absolute inset-y-0 end-0 flex items-center pe-3 opacity-60'
            />
        </div>
    </div>
  );
}