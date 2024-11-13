import { redirect } from 'next/navigation';

interface Props {
  params: {
    taskId: string;
  };
}

export default function Page({ params }: Props) {
  return redirect('/');
}
