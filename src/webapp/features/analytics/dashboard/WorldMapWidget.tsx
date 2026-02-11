import { topCountries } from "../query";
import { TopNDataContainer } from "./TopNDataContainer";
import { WorldMap } from "./WorldMap";

type Props = {
  appId: string;
};

export function WorldMapWidget(props: Props) {
  return (
    <TopNDataContainer appId={props.appId} queryName="top-countries" query={topCountries}>
      {(data) => (
        <WorldMap {...data} id="world-map" title="World Map" />
      )}
    </TopNDataContainer>
  );
}
