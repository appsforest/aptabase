import { MutableRefObject, useEffect, useRef, useState } from "react";

function useLazyLoad<T extends Element>(ref: MutableRefObject<T>, rootMargin: string = "0px"): boolean {
  const [isIntersecting, setIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isIntersecting) {
          setIntersecting(entry.isIntersecting);
          observer.unobserve(ref.current);
        }
      },
      {
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current instanceof Element) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return isIntersecting;
}

type Props = {
  className?: string;
  children: React.ReactNode;
};

export function LazyLoad(props: Props) {
  const className = props.className ?? 'flex flex-col'
  const ref: any = useRef<HTMLDivElement>();
  const show: boolean = useLazyLoad<HTMLDivElement>(ref);

  return (
    <div ref={ref} className={className}>
      {show && props.children}
    </div>
  );
}
