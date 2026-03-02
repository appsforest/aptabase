type Props = {
  children: React.ReactNode;
};

export function KeyMetricsContainer(props: Props) {
  return (
    <div className="mb-10 grid grid-cols-2 gap-4 md:flex md:h-22 md:justify-start md:gap-8">
      {props.children}
    </div>
  );
}
