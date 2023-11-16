import DataCards from "./_components/DataCards"

const PanelPalettesPage = () => {
  return (
    <div className="h-full w-full bg-slate-50 p-4">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold">Palettes</div>
      </div>

      <div className="mt-4 rounded-lg bg-white p-4">
        <DataCards></DataCards>
      </div>
    </div>
  )
}

export default PanelPalettesPage
