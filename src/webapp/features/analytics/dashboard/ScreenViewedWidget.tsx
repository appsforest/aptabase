import { TopScreenViewedProps } from "./TopScreenViewedProps";

type Props = {
  appId: string;
};

export function ScreenViewedWidget(props: Props) {
  return <TopScreenViewedProps appId={props.appId} />;
}
