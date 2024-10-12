import getBooks from "./actions/getBooks";
import getCurrentUser from "./actions/getCurrentUser";
import BookCard from "./components/books/BookCard";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";

interface HomeProps {
  searchParams: IListingParams
}
const Home = async({searchParams}: HomeProps) => {
  const books = await getBooks(searchParams); 
  const currentUser = await getCurrentUser(); 

  const isEmpty = true;
  
  if (books.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset /> 
      </ClientOnly>
    )
  }
  
  return (
    <ClientOnly>
      <Container>
        <div className="pt-16 mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
        lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {books.map((book) => {
            return (
              <BookCard key={book.id} data={book} currentUser={currentUser} />
            )
          })}
        </div>
      </Container>
    </ClientOnly>

  );
}

export default Home; 