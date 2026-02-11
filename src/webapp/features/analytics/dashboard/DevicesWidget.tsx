import { topDeviceModels } from "../query";
import { TopNChart } from "./TopNChart";
import { TopNDataContainer } from "./TopNDataContainer";

type Props = {
  appId: string;
};

export function DeviceModelsWidget(props: Props) {
  return (
    <TopNDataContainer appId={props.appId} queryName="top-devicemodels" query={topDeviceModels}>
      {(data) => (
        <TopNChart
          {...data}
          id="device-models"
          key="device-models"
          title="Device Models"
          // searchParamKey="appVersion"
          defaultFormat="absolute"
          valueLabel="Sessions"
        />
      )}
    </TopNDataContainer>
  );
}
