import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;

  const posts = [
    {
      _createdAt: new Date(),
      views: 234,
      author: { _id: 1, name: "Marcus" },
      _id: 1,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque facilis nam mollitia libero, beatae aliquam praesentium laborum illo vel minima.",
      image:
        "https://img.freepik.com/free-vector/graident-ai-robot-vectorart_78370-4114.jpg?semt=ais_hybrid&w=740",
      category: "Robots",
      title: "We Robots",
    },
    {
      _createdAt: new Date(),
      views: 234,
      author: { _id: 2, name: "Rafael" },
      _id: 2,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque facilis nam mollitia libero, beatae aliquam praesentium laborum illo vel minima.",
      image:
        "https://www.ubuy.hu/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNTFEQmQ3TzZHRUwuX0FDX1NMMTUwMF8uanBn.jpg",
      category: "Robots",
      title: "We Robots",
    },
  ];

  return (
    <>
      <section className="pink_container">
        <span className="tag">Pitch, Vote, and Grow</span>
        <h1 className="heading">
          Pitch Your Startup, <br /> Connect with Entrepreneurs
        </h1>
        <p className="sub-heading max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search result for "${query}"` : "Recommended startups"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType, index: number) => (
              <StartupCard key={post._id} post={post} />
            ))
          ) : (
            <p>No startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}
