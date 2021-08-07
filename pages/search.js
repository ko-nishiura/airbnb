import { format } from "date-fns";
import { useRouter } from "next/dist/client/router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";
import Scroll from "../components/Scroll";

function Search({ searchResults }) {
  const router = useRouter();

  const { location, startDate, endDate, noOdGuests } = router.query;

  const formattedStratDate = format(new Date(startDate), "dd MMMM yy");
  const formattedEndsDate = format(new Date(endDate), "dd MMMM yy");
  const range = `${formattedStratDate} - ${formattedEndsDate}`;

  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${noOdGuests} guest`} />

      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ Stays - {range} - for {noOdGuests} number of guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>
          <div className="hidden xl:inline-flex mb-5 space-x-3 flex-nowrap text-gray-800">
            <p className="button">Cancellation Flexiblirity</p>
            <p className="button">Tyle of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Bed</p>
            <p className="button">More filter</p>
          </div>
          <div>
            {searchResults.map(
              ({ img, location, title, description, price, star, total }) => (
                <InfoCard
                  key={img}
                  img={img}
                  location={location}
                  title={title}
                  description={description}
                  price={price}
                  star={star}
                  total={total}
                />
              )
            )}
          </div>
        </section>
        <section className="hidden md:inline-flex md:w-[300px] max-h-full xl:inline-flex xl:min-w-[500px]">
          <Map searchResults={searchResults} />
        </section>
      </main>

      <Footer />
      <Scroll />
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const searchResults = await fetch("https://links.papareact.com/isz").then(
    (res) => res.json()
  );

  return {
    props: { searchResults },
  };
}
