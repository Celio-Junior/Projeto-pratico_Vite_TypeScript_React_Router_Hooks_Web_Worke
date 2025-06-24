import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Link } from 'react-router';

type RouterLinkProps = ComponentPropsWithoutRef<'a'> & {
  children: ReactNode;
  href: string;
};

export function RouterLink({ href, children, ...rest }: RouterLinkProps) {
  return (
    <Link to={href} {...rest}>
      {children}
    </Link>
  );
}
