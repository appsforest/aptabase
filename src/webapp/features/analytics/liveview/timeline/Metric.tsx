import { ReactNode } from "react"

interface Props {
  name: string
  value: string | number | ReactNode
  icon?: ReactNode
}

export const Metric = (props: Props) => {

  return (
    <div className="bg-card p-4 inline-flex flex-col items-center text-center rounded-sm p-2 min-w-[7rem]">
      <p className="text-xl font-semibold">{props.value}</p>

      <div className="flex items-center gap-1">
        {props.icon}

        <p className="text-sm text-muted-foreground">
          {props.name}
        </p>
      </div>
    </div>
  )
}
