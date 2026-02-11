import { EmptyState } from "@components/EmptyState";
import { ErrorState } from "@components/ErrorState";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { WorldMapParts } from "../liveview/world/WorldMapParts";
import { TopNSkeleton } from "./TopNSkeleton";
import { TopNTitle } from "./TopNTitle";

type Item = {
  name: string;
  value: number;
  key?: string;
};

type Props = {
  id: string;
  title: string;
  items: Item[];
  isLoading?: boolean;
  isError?: boolean;
  refetch?: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<any, Error>>;
};

export function WorldMap(props: Props) {
  const activeCountries = props.items.map(item => item.name)

  if (props.isError) {
    return <ErrorState refetch={props.refetch} />
  }

  if (props.isLoading) {
    return <TopNSkeleton />

  }

  if (props.items.length === 0) {
    return <EmptyState />
  }

  return (
    <div>
      <div className="flex w-full flex-row justify-between items-end">
        <TopNTitle>{props.title}</TopNTitle>
      </div>

      <div className="grid text-sm mt-2 max-h-[22rem] overflow-y-auto">
        <svg
          id="worldmap"
          baseProfile="tiny"
          className="
            stroke-background
            fill-border
            [&_path[data-active=true]]:fill-primary-200
            dark:[&_path[data-active=true]]:fill-primary-800
          "
          version="1.2"
          strokeWidth="1"
          viewBox="0 0 2000 857"
          xmlns="http://www.w3.org/2000/svg"
        >
          <WorldMapParts activeCountries={activeCountries} />
        </svg>
      </div>
    </div>
  )
}
