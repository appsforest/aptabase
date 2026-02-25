import { useApps } from "@features/apps";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { dateFilterValuesAtom } from "../../../atoms/date-atoms";
import { topScreenViewedProps } from "../query";
import { TopNChart } from "./TopNChart";
import { TopNTitle } from "./TopNTitle";

type Props = {
  appId: string;
};

type AggregateValueName = "events" | "sum" | "median" | "min" | "max";

export function TopScreenViewedProps(props: Props) {
  const { buildMode } = useApps();
  const [searchParams] = useSearchParams();
  const { startDateIso, endDateIso, granularity } = useAtomValue(dateFilterValuesAtom);

  const countryCode = searchParams.get("countryCode") || "";
  const appVersion = searchParams.get("appVersion") || "";
  const eventName = "Screen Viewed";
  const osName = searchParams.get("osName") || "";

  const [selectedNumericKey, setSelectedNumericKey] = useState<[AggregateValueName, string | undefined]>([
    "events",
    undefined,
  ]);

  const {
    isLoading,
    isError,
    data: rows,
    refetch,
  } = useQuery({
    queryKey: [
      "top-screen-viewed-props",
      buildMode,
      props.appId,
      startDateIso,
      endDateIso,
      countryCode,
      appVersion,
      osName,
    ],
    queryFn: () =>
      topScreenViewedProps({
        buildMode,
        appId: props.appId,
        startDate: startDateIso,
        endDate: endDateIso,
        granularity,
        countryCode,
        appVersion,
        osName,
      }),
    staleTime: 10000,
    enabled: !!startDateIso && !!endDateIso && !!granularity,
  });

  const stringKeys = [...new Set((rows || []).map((row) => row.stringKey).filter((x) => !!x))];
  const stringKeyIndex = stringKeys.findIndex(item => item === 'segments')

  let items = (rows || [])
    .filter(
      (x) =>
        x.stringKey === stringKeys[stringKeyIndex] &&
        (selectedNumericKey[0] === "events" || x.numericKey === selectedNumericKey[1])
    )
    .map((row) => ({
      name: row.stringValue,
      value: row[selectedNumericKey[0]],
      key: [row.stringValue, row.numericKey, row.stringKey].join("-"),
    }))
    .sort((a, b) => b.value - a.value);

  // Having the key set to "events" will cause it to inherit settings from the EventWidget
  // While setting to "props" will have the default settings
  const key = selectedNumericKey[0] === "events" ? "events" : "props";

  return (
    <TopNChart
      id={key}
      key={key}
      title={<TopNTitle>{eventName}</TopNTitle>}
      valueLabel="Events"
      defaultFormat="absolute"
      isLoading={isLoading}
      isError={isError}
      items={items}
      refetch={refetch}
    />
  );
}
