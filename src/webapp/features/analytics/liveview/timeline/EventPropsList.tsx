type Props = {
  stringProps?: string;
  numericProps?: string;
};

export function EventPropsList(props: Props) {
  const stringProps = JSON.parse(props.stringProps ?? "{}");
  const numericProps = JSON.parse(props.numericProps ?? "{}");

  const allProps = {
    ...stringProps,
    ...numericProps,
  }

  const eventProps = Object.fromEntries(
    Object.entries(allProps).filter(
      ([key]) => !['locale', 'userId', 'proActive'].includes(key)
    )
  ) as Omit<typeof allProps, 'locale' | 'userId' | 'proActive'>;

  return (
    <div className="text-sm flex mt-1 ml-10 gap-2 flex-wrap">
      {Object.keys(eventProps).map((key) => (
        <div key={key} className="bg-muted text-muted-foreground border px-1 rounded">
          {key}: <span className="text-foreground">{eventProps[key]}</span>
        </div>
      ))}
    </div>
  );
}
