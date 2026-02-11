import PartsJson from "./worldmapparts.json";

const paths = PartsJson as { [key: string]: string };

type Props = {
  activeCountries?: string[]
};

export function WorldMapParts(props: Props) {
  return (
    <g>
      {Object.entries(paths).map(([id, d]) => (
        <path key={id} id={id} d={d} data-active={props.activeCountries?.includes(id)} />
      ))}
    </g>
  );
}
