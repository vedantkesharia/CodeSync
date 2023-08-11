import Feed from '@components/Feed'

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Discover & Share
            <br className="max-md:hidden"/>
            <span className="pink_gradient text-center">Your Code With CodeSync</span>
        </h1>
        <p className="desc text-center">
            CodeSync is a platform where people can save, discover and even share their code with the world
        </p>
        <Feed/>
    </section>
  )
}

export default Home
