import Image from "next/image";

export const NoCompanions = () => {
  return (
    <div className="pt-10 flex flex-col items-center justify-center space-y">
      <div className="relative w-60 h-60">
        <Image 
          fill
          className="grayscale"
          alt="empty"
          src="/empty.png"
        />
      </div>
      <p className="tex-tsm text-muted-foreground">
        No companions found.
      </p>
    </div>
  )
}