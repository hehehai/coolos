import HomeGrid from "@/app/_components/HomeGrid"
import HomeHeader from "@/app/_components/HomeHeader"

function Home() {
  return (
    <main className="p-16">
      <HomeHeader className="mx-auto max-w-7xl" showDashboard />
      <div className="mt-32">
        <HomeGrid />
      </div>
    </main>
  )
}

export default Home
