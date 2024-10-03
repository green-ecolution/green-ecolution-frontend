import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react';

export const Route = createLazyFileRoute('/_protected/foo')({
  component: Foo,
})

function Foo() {
  useEffect(() => {
    console.log('Foo mounted');
    return () => {
      console.log('Foo unmounted');
    }
  }, []);

  return (
    <div>
      <h1>Foo</h1>
    </div>
  );
}
