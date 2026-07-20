import getBooks from "./actions/getBooks";
import getCurrentUser from "./actions/getCurrentUser";
import BookCard from "./components/books/BookCard";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";

interface HomeProps {
  searchParams: IListingParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const books = await getBooks(searchParams);
  const currentUser = await getCurrentUser();

  if (books.length === 0) {
    return (
      <ClientOnly>
        <main className="min-h-[65vh] bg-[#faf9fc]">
          <Container>
            <div className="flex min-h-[55vh] items-center justify-center py-16">
              <EmptyState showReset />
            </div>
          </Container>
        </main>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <main className="min-h-screen bg-[#faf9fc]">
        <Container>
          <section className="pb-20 pt-10 sm:pt-12">
            <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-purple-600">
                  Browse the collection
                </p>

                <h1 className="text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
                  Discover your next great read
                </h1>

                <p className="mt-3 max-w-2xl text-base leading-7 text-neutral-600">
                  Explore books shared by readers and find something worth
                  picking up today.
                </p>
              </div>

              <p className="shrink-0 text-sm font-medium text-neutral-500">
                {books.length} {books.length === 1 ? "book" : "books"} available
              </p>
            </div>

                <div
                  className="
                    pt-6
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-5
                    gap-x-6
                    gap-y-10
                  "
                >
              {books.map((book) => (
                <BookCard
                  key={book.id}
                  data={book}
                  currentUser={currentUser}
                />
              ))}
            </div>
          </section>
        </Container>
      </main>
    </ClientOnly>
  );
};

export default Home;