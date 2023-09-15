import HomeGrid from "./_components/HomeGrid"
import HomeHeader from "./_components/HomeHeader"

function Home() {
  return (
    <main className="p-16">
      <HomeHeader />
      <div className="mt-32">
        <HomeGrid />
      </div>
    </main>
  )
}

export default Home
