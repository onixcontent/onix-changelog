import OficialReleases from "@/components/Releases/oficial";

export default function Page() {
  return (
    <main className="flex items-center justify-between p-5 sm:p-16 text-zinc-200 w-full">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col items-center justify-center mt-[4rem] w-full">
          <h2 className={"font-extrabold text-[2rem] sm:text-[3rem] text-center"}>Onix Atualizações</h2>
          <div className={"flex flex-col gap-4 p-2 sm:p-10"}>
            <OficialReleases/>
          </div>
        </div>
      </div>
    </main>
  )
}
