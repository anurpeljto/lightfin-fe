'use client';
import { useRouter } from 'next/navigation';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ArrowBack() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center text-sm text-black hover:underline cursor-pointer"
    >
      <FontAwesomeIcon icon={faLongArrowAltLeft} className="text-4xl" />
    </button>
  );
}
